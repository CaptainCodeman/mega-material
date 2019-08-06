import { matches, getNormalizedEventCoords, Point } from './utils';
import { LitElement, customElement, property, css, html } from 'lit-element';
import { defaultCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mega-ripple': RippleElement;
  }
}

const
  DEACTIVATION_TIMEOUT_MS = 225, // Corresponds to $mega-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS = 150, // Corresponds to $mega-ripple-fade-out-duration (i.e. deactivation animation duration)
  INITIAL_ORIGIN_SCALE = 0.6,
  PADDING = 10,
  TAP_DELAY_MS = 300 // Delay between touch and simulated mouse events on touch devices

/**
 * Options passed in when attaching a ripple to an object.
 */
export interface RippleAttachOpts {
  isUnbounded?: boolean;
}

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * unbounded Whether or not the ripple bleeds out of the bounds of the element.
 * disabled Whether or not the ripple is attached to a disabled component.
 */
export interface RippleCapableSurface {
  readonly root_: Element;
  unbounded?: boolean;
  disabled?: boolean;
}

interface ActivationStateType {
  isActivated?: boolean;
  hasDeactivationUXRun?: boolean;
  wasActivatedByPointer?: boolean;
  wasElementMadeActive?: boolean;
  activationEvent?: Event;
  isProgrammatic?: boolean;
}

interface FgTranslationCoordinates {
  startPoint: Point;
  endPoint: Point;
}

interface Coordinates {
  left: number;
  top: number;
}

type ActivationEventType = 'touchstart' | 'pointerdown' | 'mousedown' | 'keydown';
type DeactivationEventType = 'touchend' | 'pointerup' | 'mouseup' | 'contextmenu';

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES: ActivationEventType[] = [
  'touchstart', 'pointerdown', 'mousedown', 'keydown',
];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES: DeactivationEventType[] = [
  'touchend', 'pointerup', 'mouseup', 'contextmenu',
];

// simultaneous nested activations
let activatedTargets: Array<EventTarget | null> = [];

@customElement('mega-ripple')
export class RippleElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  primary = false;

  @property({ type: Boolean, reflect: true })
  accent = false;

  @property({ type: Boolean, reflect: true })
  unbounded = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private activationAnimationHasEnded_ = false;
  private activationState_: ActivationStateType;
  private activationTimer_ = 0;
  private fgDeactivationRemovalTimer_ = 0;
  private fgScale_ = '0';
  private frame_ = { width: 0, height: 0 };
  private initialSize_ = 0;
  private layoutFrame_ = 0;
  private maxRadius_ = 0;
  private unboundedCoords_: Coordinates = { left: 0, top: 0 };

  private readonly activationTimerCallback_: () => void;
  private readonly activateHandler_: EventHandlerNonNull;
  private readonly deactivateHandler_: EventHandlerNonNull;
  private readonly focusHandler_: EventHandlerNonNull;
  private readonly blurHandler_: EventHandlerNonNull;
  private readonly resizeHandler_: EventHandlerNonNull;

  private previousActivationEvent_?: Event;

  constructor() {
    super()
    this.activationState_ = this.defaultActivationState_();

    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
    this.activateHandler_ = (e) => this.activate_(e);
    this.deactivateHandler_ = () => this.deactivate_();
    this.focusHandler_ = () => this.handleFocus_();
    this.blurHandler_ = () => this.handleBlur_();
    this.resizeHandler_ = () => this.layout_();
  }

  connectedCallback() {
    super.connectedCallback()
    this.registerRootHandlers_(true)

    requestAnimationFrame(() => {
      if (this.unbounded) {
        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
        this.layoutInternal_();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.deregisterRootHandlers_()
    this.deregisterDeactivationHandlers_()
  }

  private registerRootHandlers_(supportsPressRipple: boolean) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach((evtType) => {
        this.addEventListener(evtType, this.activateHandler_);
      });
      if (this.unbounded) {
        // TODO: use resize observer (wrapper element)
        window.addEventListener('resize', this.resizeHandler_);
      }
    }

    this.addEventListener('focus', this.focusHandler_);
    this.addEventListener('blur', this.blurHandler_);
  }

  private activate_(evt: Event) {
    if (this.disabled) {
      return;
    }

    const activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (
      evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown'
    );

    const hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(
      (target) => false) // this.containsEventTarget(target));
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive
        && evt !== undefined
        && ((evt as KeyboardEvent).key === ' ' || (evt as KeyboardEvent).keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  private registerDeactivationHandlers_(evt: Event) {
    if (evt.type === 'keydown') {
      this.addEventListener('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach((evtType) => {
        document.addEventListener(evtType, this.deactivateHandler_);
      });
    }
  }

  private deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((evtType) => {
      this.removeEventListener(evtType, this.activateHandler_);
    });
    this.removeEventListener('focus', this.focusHandler_);
    this.removeEventListener('blur', this.blurHandler_);

    if (this.unbounded) {
      window.removeEventListener('resize', this.resizeHandler_);
    }
  }

  private deregisterDeactivationHandlers_() {
    this.removeEventListener('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach((evtType) => {
      document.removeEventListener(evtType, this.deactivateHandler_);
    });
  }

  private checkElementMadeActive_(evt?: Event) {
    return (evt !== undefined && evt.type === 'keydown') ? matches(this, ':active') : true;
  }

  private animateActivation_() {
    this.layoutInternal_();

    let translateStart = '';
    let translateEnd = '';

    if (!this.unbounded) {
      const { startPoint, endPoint } = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.updateCssVariable_('--mega-ripple-fg-translate-start', translateStart);
    this.updateCssVariable_('--mega-ripple-fg-translate-end', translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.removeClass_('foreground-deactivation');

    // Force layout in order to re-trigger the animation.
    this.getBoundingClientRect();
    this.addClass_('foreground-activation');
    this.activationTimer_ = window.setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }

  private getFgTranslationCoordinates_(): FgTranslationCoordinates {
    const { activationEvent, wasActivatedByPointer } = this.activationState_;

    let startPoint: Point;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
        activationEvent,
        ({ x: window.pageXOffset, y: window.pageYOffset }),
        this.getBoundingClientRect(),
      );
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2,
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - (this.initialSize_ / 2),
      y: startPoint.y - (this.initialSize_ / 2),
    };

    const endPoint = {
      x: (this.frame_.width / 2) - (this.initialSize_ / 2),
      y: (this.frame_.height / 2) - (this.initialSize_ / 2),
    };

    return { startPoint, endPoint };
  }

  private runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const { hasDeactivationUXRun, isActivated } = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.addClass_('foreground-deactivation');
      this.fgDeactivationRemovalTimer_ = window.setTimeout(() => this.removeClass_('foreground-deactivation'), FG_DEACTIVATION_MS);
    }
  }

  private rmBoundedActivationClasses_() {
    this.removeClass_('foreground-activation');
    this.activationAnimationHasEnded_ = false;
    this.getBoundingClientRect();
  }

  private resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(() => this.previousActivationEvent_ = undefined, TAP_DELAY_MS);
  }

  private deactivate_(): void {
    const activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    const state: ActivationStateType = { ...activationState };

    if (activationState.isProgrammatic) {
      requestAnimationFrame(() => this.animateDeactivation_(state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(state);
        this.resetActivationState_();
      });
    }
  }

  private animateDeactivation_({ wasActivatedByPointer, wasElementMadeActive }: ActivationStateType) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  private layoutInternal_() {
    this.frame_ = this.getBoundingClientRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + PADDING;
    };

    this.maxRadius_ = this.unbounded ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    this.fgScale_ = `${this.maxRadius_ / this.initialSize_}`;

    this.updateLayoutCssVars_();
  }

  private updateLayoutCssVars_() {
    this.updateCssVariable_('--mega-ripple-fg-size', `${this.initialSize_}px`);
    this.updateCssVariable_('--mega-ripple-fg-scale', this.fgScale_);

    if (this.unbounded) {
      this.unboundedCoords_ = {
        left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
        top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
      };

      this.updateCssVariable_('--mega-ripple-left', `${this.unboundedCoords_.left}px`);
      this.updateCssVariable_('--mega-ripple-top', `${this.unboundedCoords_.top}px`);
    }
  }

  private addClass_(className: string) {
    this.setAttribute(className, '')
  }

  private removeClass_(className: string) {
    this.removeAttribute(className)
  }

  private layout_() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  private handleFocus_() {
    requestAnimationFrame(() => this.addClass_('background-focused'));
  }

  private handleBlur_() {
    requestAnimationFrame(() => this.removeClass_('background-focused'));
  }

  private updateCssVariable_(varName: string, value: any) {
    this.style.setProperty(varName, value)
  }

  private defaultActivationState_(): ActivationStateType {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
    };
  }

  static get styles() {
    return [
      defaultCSS,
      css`
@keyframes fg-radius-in {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1);
  }
  to {
    transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1));
  }
}
@keyframes fg-opacity-in {
  from {
    animation-timing-function: linear;
    opacity: 0;
  }
  to {
    opacity: var(--mega-ripple-fg-opacity, 0);
  }
}
@keyframes fg-opacity-out {
  from {
    animation-timing-function: linear;
    opacity: var(--mega-ripple-fg-opacity, 0);
  }
  to {
    opacity: 0;
  }
}`,
      css`
/* TODO: set variables in root to allow overriding per item ? */
:host {
  --mega-ripple-fg-size: 0;
  --mega-ripple-left: 0;
  --mega-ripple-top: 0;
  --mega-ripple-fg-scale: 1;
  --mega-ripple-fg-translate-end: 0;
  --mega-ripple-fg-translate-start: 0;
  --mega-ripple-fg-opacity: 0.12;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  position: relative;
  outline: none;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  contain: content;
  user-select: none;
  width: 100%;
  height: 100%;
}
div::before,
div::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  background-color: var(--mega-ripple-bg-color, #000);
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
}
div::before {
  transition: opacity 15ms linear,
              background-color 15ms linear;
  z-index: 1;
  transform: scale(var(--mega-ripple-fg-scale, 1));
}
div::after {
  top: 0;
  left: 0;
  transform: scale(0);
  transform-origin: center center;
  transition: opacity 150ms linear;
  width: var(--mega-ripple-fg-size, 100%);
  height: var(--mega-ripple-fg-size, 100%);
}
:host([foreground-activation]) div::after {
  animation: fg-radius-in 225ms forwards,
             fg-opacity-in 75ms forwards;
}
:host([foreground-deactivation]) div::after {
  animation: fg-opacity-out 150ms;
  transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1));
}
:host(:hover) div::before {
  opacity: 0.04;
}
:host(:focus) div::before,
:host([background-focused]) div::before,
:host(:active) div::after {
  transition-duration: 75ms;
  opacity: 0.12;
}
:host([unbounded]) div {
  overflow: visible;
}
:host([unbounded]) div::before,
:host([unbounded]) div::after {
  top: var(--mega-ripple-top, 0);
  left: var(--mega-ripple-left, 0);
  width: var(--mega-ripple-fg-size, 100%);
  height: var(--mega-ripple-fg-size, 100%);
}
:host([primary]) div::before,
:host([primary]) div::after {
  background-color: var(--mega-theme-primary, #6200ee);
}
:host([accent]) div::before,
:host([accent]) div::after {
  background-color:var(--mega-theme-accent, #018786);
}

:host([activated]) div::before,
:host([activated]) div::after {
  background-color: var(--mega-theme-primary, #6200ee);
  opacity: 0.12;
}

`
    ]
  }

  render() {
    return html`<div><slot></slot></div>`
  }
}
