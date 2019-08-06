import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './icon'
import './ripple'
import { defaultCSS } from './styles';
import { nothing } from 'lit-html';
import { passiveOrFalse } from './utils';

declare global {
  interface HTMLElementTagNameMap {
    'mega-slider': SliderElement;
  }
}

type UpEventType = 'mouseup' | 'pointerup' | 'touchend';
type DownEventType = 'mousedown' | 'pointerdown' | 'touchstart';
type MoveEventType = 'mousemove' | 'pointermove' | 'touchmove';

type MoveEventMap = {
  readonly [K in DownEventType]: MoveEventType;
};

type MouseLikeEvent = MouseEvent | PointerEvent | TouchEvent;

const PAGE_FACTOR = 4,
      DOWN_EVENTS: DownEventType[] = ['mousedown', 'pointerdown', 'touchstart'],
      UP_EVENTS: UpEventType[] = ['mouseup', 'pointerup', 'touchend'],
      MOVE_EVENT_MAP: MoveEventMap = {
        mousedown: 'mousemove',
        pointerdown: 'pointermove',
        touchstart: 'touchmove',
      },
      KEY_IDS = {
        ARROW_DOWN: 'ArrowDown',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight',
        ARROW_UP: 'ArrowUp',
        END: 'End',
        HOME: 'Home',
        PAGE_DOWN: 'PageDown',
        PAGE_UP: 'PageUp',
      };

@customElement('mega-slider')
export class SliderElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  discrete = false;

  @property({ type: Boolean, reflect: true })
  markers = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true })
  min = 0;

  @property({ type: Number, reflect: true })
  max = 1;

  @property({ type: Number, reflect: true })
  step = 0;

  @property({ type: Boolean, reflect: true, attribute: 'in-transit' })
  inTransit = false;

  @query('.thumb-container')
  thumbContainer: HTMLDivElement

  @query('.track')
  track: HTMLDivElement

  private rect_: ClientRect | DOMRect
  private handlingThumbTargetEvt_: boolean = false
  private preventFocusState_: boolean = false

  constructor() {
    super()

    this.interactionStartHandler_ = this.interactionStartHandler_.bind(this)
    this.thumbContainerPointerHandler_ = this.interactionStartHandler_.bind(this)
    this.keydownHandler_ = this.keydownHandler_.bind(this)
    this.focusHandler_ = this.focusHandler_.bind(this)
    this.blurHandler_ = this.blurHandler_.bind(this)
    this.resizeHandler_ = this.resizeHandler_.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()

    this.updateComplete.then(() => {
      DOWN_EVENTS.forEach(name => {
        this.addEventListener(name, this.interactionStartHandler_, passiveOrFalse)
        this.thumbContainer.addEventListener(name, this.thumbContainerPointerHandler_)
      })
    })

    this.addEventListener('keydown', this.keydownHandler_);
    this.addEventListener('focus', this.focusHandler_);
    this.addEventListener('blur', this.blurHandler_);
    window.addEventListener('resize', this.resizeHandler_, passiveOrFalse);

    this.layout_()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    DOWN_EVENTS.forEach(name => {
      this.removeEventListener(name, this.interactionStartHandler_)
      this.thumbContainer.removeEventListener(name, this.thumbContainerPointerHandler_)
    })

    this.removeEventListener('keydown', this.keydownHandler_);
    this.removeEventListener('focus', this.focusHandler_);
    this.removeEventListener('blur', this.blurHandler_);
    window.removeEventListener('resize', this.resizeHandler_);
  }

  private interactionStartHandler_(e: MouseLikeEvent) {
    this.handleDown_(e)
  }

  private thumbContainerPointerHandler_(e: Event) {
    this.handlingThumbTargetEvt_ = true
  }

  private handleDown_(e: MouseLikeEvent) {
    if (this.disabled) {
      return;
    }

    this.preventFocusState_ = true;
    this.inTransit = !this.handlingThumbTargetEvt_;
    this.handlingThumbTargetEvt_ = false;
    this.active = true;

    const moveHandler = (moveEvent: MouseLikeEvent) => {
      this.handleMove_(moveEvent);
    };

    const moveEventType = MOVE_EVENT_MAP[e.type as DownEventType];

    // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)
    const upHandler = () => {
      this.handleUp_();
      document.body.removeEventListener(moveEventType, moveHandler);
      UP_EVENTS.forEach((evtName) => document.body.removeEventListener(evtName, upHandler));
    };

    document.body.addEventListener(moveEventType, moveHandler)
    UP_EVENTS.forEach(name => document.body.addEventListener(name, upHandler));
    this.setValueFromEvt_(e);
  }

  private handleMove_(evt: MouseLikeEvent) {
    evt.preventDefault();
    this.setValueFromEvt_(evt);
  }

  private handleUp_() {
    this.active = false;
    this.notifyChange();
  }

  private keydownHandler_(e: KeyboardEvent) {
    const keyId = this.getKeyId_(e);
    const value = this.getValueForKeyId_(keyId);
    if (isNaN(value)) {
      return;
    }

    // Prevent page from scrolling due to key presses that would normally scroll the page
    e.preventDefault();
    // this.addClass(cssClasses.FOCUS);
    this.setValue_(value, true);
    this.notifyChange();
  }

  private focusHandler_(e: Event) {
    if (this.preventFocusState_) {
      return;
    }
    // this.adapter_.addClass(cssClasses.FOCUS);
  }

  private blurHandler_(e: Event) {
    this.preventFocusState_ = false;
    // this.adapter_.removeClass(cssClasses.FOCUS);
  }

  private resizeHandler_(e: Event) {
    this.layout_()
  }

  private getKeyId_(kbdEvt: KeyboardEvent): string {
    if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
      return KEY_IDS.ARROW_LEFT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
      return KEY_IDS.ARROW_RIGHT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
      return KEY_IDS.ARROW_UP;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
      return KEY_IDS.ARROW_DOWN;
    }
    if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
      return KEY_IDS.HOME;
    }
    if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
      return KEY_IDS.END;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
      return KEY_IDS.PAGE_UP;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
      return KEY_IDS.PAGE_DOWN;
    }
    return '';
  }

  /**
   * Computes the value given a keyboard key ID
   */
  private getValueForKeyId_(keyId: string): number {
    let delta = this.step || (this.max - this.min) / 100;

    switch (keyId) {
      case KEY_IDS.ARROW_LEFT:
      case KEY_IDS.ARROW_DOWN:
        return this.value - delta;
      case KEY_IDS.ARROW_RIGHT:
      case KEY_IDS.ARROW_UP:
        return this.value + delta;
      case KEY_IDS.HOME:
        return this.min;
      case KEY_IDS.END:
        return this.max;
      case KEY_IDS.PAGE_UP:
        return this.value + delta * PAGE_FACTOR;
      case KEY_IDS.PAGE_DOWN:
        return this.value - delta * PAGE_FACTOR;
      default:
        return NaN;
    }
  }

  private getPageX_(evt: MouseLikeEvent): number {
    if ((evt as TouchEvent).targetTouches && (evt as TouchEvent).targetTouches.length > 0) {
      return (evt as TouchEvent).targetTouches[0].pageX;
    }
    return (evt as MouseEvent).pageX;
  }

  private setValueFromEvt_(evt: MouseLikeEvent) {
    const pageX = this.getPageX_(evt);
    const value = this.computeValueFromPageX_(pageX);
    this.setValue_(value, true);
  }

  private computeValueFromPageX_(pageX: number): number {
    const xPos = pageX - this.rect_.left;
    let pctComplete = xPos / this.rect_.width;
    // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].
    return this.min + pctComplete * (this.max - this.min);
  }

  private setValue_(value: number, shouldFireInput: boolean, force = false) {
    if (value === this.value && !force) {
      return;
    }

    const valueSetToBoundary = value === this.min || value === this.max;
    if (this.step && !valueSetToBoundary) {
      value = this.quantize_(value);
    }
    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }
    this.value = value;
    this.updateUIForCurrentValue_();

    if (shouldFireInput) {
      this.notifyInput();
      if (this.discrete) {
        this.setMarkerValue_(value);
      }
    }
  }

  setMarkerValue_(value: number) {

  }

  private layout_() {
    this.rect_ = this.getBoundingClientRect()
    this.updateUIForCurrentValue_();
  }

  private quantize_(value: number): number {
    const numSteps = Math.round(value / this.step);
    return numSteps * this.step;
  }

  private updateUIForCurrentValue_() {
    const pctComplete = (this.value - this.min) / (this.max - this.min);
    let translatePx = pctComplete * this.rect_.width;

    if (this.inTransit) {
      const onTransitionEnd = () => {
        this.inTransit = false;
        this.thumbContainer.removeEventListener('transitionend', onTransitionEnd)
      };
      this.thumbContainer.addEventListener('transitionend', onTransitionEnd);
    }

    requestAnimationFrame(() => {
      this.thumbContainer.style.transform = `translateX(${translatePx}px) translateX(-50%)`;
      this.track.style.transform = `scaleX(${pctComplete})`;
    });
  }

  notifyChange() {

  }

  notifyInput() {

  }

  static get styles() {
    return [
      defaultCSS,
      css`
@keyframes mega-slider-emphasize {
  0% {
    animation-timing-function: ease-out;
  }
  50% {
    animation-timing-function: ease-in;
    transform: scale(0.85);
  }
  100% {
    transform: scale(0.571);
  }
}
:host {
  display: block;
  position: relative;
  width: 100%;
  height: 48px;
  cursor: pointer;
  touch-action: pan-x;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
:host(:not([disabled])) .track {
  background-color: var(--mega-theme-secondary, #018786);
}
:host(:not([disabled])) .track-container {
  background-color: rgba(1, 135, 134, 0.26);
}
:host(:not([disabled])) .track-marker::after,
:host(:not([disabled])) .track-marker-container::after {
  background-color: var(--mega-theme-secondary, #018786);
}
:host(:not([disabled])) .thumb {
  fill: var(--mega-theme-secondary, #018786);
  stroke: var(--mega-theme-secondary, #018786);
}
:host(:not([disabled])) .focus-ring {
  background-color: var(--mega-theme-secondary, #018786);
}
:host(:not([disabled])) .pin {
  color: var(--mega-theme-text-primary-on-dark, white);
  background-color: var(--mega-theme-secondary, #018786);
}
:host([disabled]) {
  cursor: auto;
}
:host([disabled]) .track {
  background-color: #9a9a9a;
}
:host([disabled]) .track-container {
  background-color: rgba(154, 154, 154, 0.26);
}
:host([disabled]) .track-marker::after,
:host([disabled]) .track-marker-container::after {
  background-color: #9a9a9a;
}
:host([disabled]) .thumb {
  fill: #9a9a9a;
  stroke: #9a9a9a;
  stroke: var(--mega-slider-bg-color-behind-component, white);
}

:host:focus {
  outline: none;
}
.track-container {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  overflow: hidden;
}

.track {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: left top;
  will-change: transform;
}

.track-marker-container {
  display: flex;
  margin-right: 0;
  margin-left: -1px;
  visibility: hidden;
}

.track-marker-container::after {
  display: block;
  width: 2px;
  height: 2px;
  content: "";
}
.track-marker {
  flex: 1;
}
.track-marker::after {
  display: block;
  width: 2px;
  height: 2px;
  content: "";
}
.track-marker:first-child::after {
  width: 3px;
}
.thumb-container {
  position: absolute;
  top: 15px;
  left: 0;
  width: 21px;
  height: 100%;
  user-select: none;
  will-change: transform;
}
.thumb {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0.571);
  transition: transform 100ms ease-out,
              fill 100ms ease-out,
              stroke 100ms ease-out;
  stroke-width: 3.5;
}
.focus-ring {
  width: 21px;
  height: 21px;
  transition: transform 266.67ms ease-out,
              opacity 266.67ms ease-out,
              background-color 266.67ms ease-out;
  border-radius: 50%;
  opacity: 0;
}

.pin {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin-top: -2px;
  margin-left: -2px;
  transform: rotate(-45deg) scale(0) translate(0, 0);
  transition: transform 100ms ease-out;
  border-radius: 50% 50% 50% 0%;
  z-index: 1;
}

.pin-value-marker {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  text-decoration: inherit;
  text-transform: inherit;
  transform: rotate(45deg);
}

:host([active]) .thumb {
  transform: scale3d(1, 1, 1);
}

:host([focus]) .thumb {
  animation: mega-slider-emphasize 266.67ms linear;
}
:host([focus]) .focus-ring {
  transform: scale3d(1.55, 1.55, 1.55);
  opacity: 0.25;
}

:host([in-transit]) .thumb {
  transition-delay: 140ms;
}

:host([in-transit]) .thumb-container,
:host([in-transit]) .track,
:host([focus]:not([active])) .thumb-container,
:host([focus]:not([active])) .track {
  transition: transform 80ms ease;
}

:host([discrete][active]) .thumb {
  transform: scale(calc(12 / 21));
}
:host([discrete][active]) .pin {
  transform: rotate(-45deg) scale(1) translate(19px, -20px);
}
:host([discrete][focus]) .thumb {
  animation: none;
}
:host([markers]) .track-marker-container {
  visibility: visible;
}
`
    ]
  }

  render() {
    const markerCount = this.discrete && this.markers && this.step !== 0
      ? (this.max - this.min) / this.step
      : 1
    const markers = Array(markerCount).fill(html`<div class="track-marker"></div>`)
    const lastStepRatio = (this.max - markerCount * this.step) / this.step + 1;
    // this.setLastTrackMarkersStyleProperty('flex-grow', String(lastStepRatio));

    return html`
<div class="track-container">
  <div class="track"></div>
  ${this.discrete && this.markers ? html`
  <div class="track-marker-container">
    ${markers.map(x => x)}
  </div>` : nothing}
</div>
</div>
<div class="thumb-container">
  <div class="pin">
    <span class="pin-value-marker">${this.value}</span>
  </div>
  <svg class="thumb" width="21" height="21">
    <circle cx="10.5" cy="10.5" r="7.875"></circle>
  </svg>
  <div class="focus-ring"></div>
</div>
`
  }
}
