import { LitElement, html, customElement, css, property, query } from 'lit-element';
import { defaultCSS, elevationCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-top-app-bar': TopAppBarElement;
  }
}

@customElement('mwc-top-app-bar')
export class TopAppBarElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  fixed = false;

  @property({ type: Boolean, reflect: true })
  prominent = false;

  @property({ type: Boolean, reflect: true })
  short = false;

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: Boolean, reflect: true, attribute: 'center-title' })
  centerTitle = false;

  @query('[name="navigationIcon"]')
  private navIconSlot: HTMLSlotElement;

  private scrollTarget_: HTMLElement | Window;

  get scrollTarget() {
    return this.scrollTarget_ || window as Window;
  }

  set scrollTarget(value) {
    const old = this.scrollTarget;
    this.scrollTarget_ = value;
    // this.requestUpdate('scrollTarget', old);
  }

  firstUpdated() {
    this.navIconSlot.addEventListener('click', e => this.notifyNavigationIconClicked_())

    // this.mdcRoot.addEventListener('keydown', (e) => this.mdcFoundation.handleKeydown(e));
    // this.mdcRoot.addEventListener('transitionend', (e) => this.mdcFoundation.handleTransitionEnd(e));
  }

  private notifyNavigationIconClicked_() {
    this.dispatchEvent(new CustomEvent('MDCTopAppBar:nav', {
      bubbles: true,
      composed: true,
    }))
  }

  static get styles() {
    return [
      defaultCSS,
      elevationCSS,
      css`
:host {
  background-color: var(--mdc-theme-primary, #6200ee);
  color: white;
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  z-index: 4;
  contain: content;
}

slot.icons::slotted(*) {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  --mdc-ripple-fg-opacity: 0.08;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  color: var(--mdc-theme-on-primary, #fff);
  background-color: transparent;
  fill: currentColor;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

div {
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
}

section {
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  padding: 8px 12px;
  z-index: 1;
}
section:not([role]) {
  justify-content: flex-start;
  order: -1;
}
section[role="toolbar"] {
  justify-content: flex-end;
  order: 1;
}

slot[name="title"]::slotted(*) {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  text-transform: inherit;
  padding-left: 20px;
  padding-right: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
  text-decoration: inherit;
  overflow: hidden;
}

:host([short][collapsed]) {
  border-radius: 0 0 24px 0;
}

:host([short]) {
  top: 0;
  right: auto;
  left: 0;
  width: 100%;
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

:host([short]) div {
  height: 56px;
}
:host([short]) section {
  padding: 4px;
}
:host([short]) slot[name="title"]::slotted(*) {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
}

:host([short][collapsed]) {
  box-shadow: var(--elevation-04);
  width: 56px;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
:host([short][collapsed]) slot[name="title"]::slotted(*) {
  display: none;
}
:host([short][collapsed]) .mdc-top-app-bar__action-item {
  transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

:host([short][collapsed][has-action-item]) {
  width: 112px;
}
:host([short][collapsed][has-action-item]) section[role="toolbar"] {
  padding-left: 0;
  padding-right: 12px;
}

:host([dense]) div {
  height: 48px;
}
:host([dense]) section {
  padding: 0 4px;
}
:host([dense]) slot[name="title"]::slotted(*) {
  padding-left: 12px;
  padding-right: 0;
}

:host([prominent]) div {
  height: 128px;
}
:host([prominent]) slot[name="title"]::slotted(*) {
  align-self: flex-end;
  padding-bottom: 2px;
}
:host([prominent]) slot.icons::slotted(*) {
  align-self: flex-start;
}

:host([fixed]) {
  transition: box-shadow 200ms linear;
}

:host([fixed][scrolled]) {
  /* TODO: define elevation to use as a property
    (what would be overridden if desired) then set
    elevated state using that. i.e.
    :host {
      --top-app-bar-elevation: var(--elevation-04)
    }

    :host([elevated-state]) {
      box-shadow: var(--top-app-bar-elevation);
    }
  */
  box-shadow: var(--elevation-04);
  transition: box-shadow 200ms linear;
}

:host([dense][prominent]) div {
  height: 96px;
}
:host([dense][prominent]) section {
  padding: 0 12px;
}
:host([dense]][prominent]) slot[name="title"]::slotted(*) {
  padding-left: 20px;
  padding-right: 0;
  padding-bottom: 9px;
}

:host([fixed][adjust]) {
  padding-top: 64px;
}

:host([dense][fixed][adjust]) {
  padding-top: 48px;
}

:host([short][fixed][adjust]) {
  padding-top: 56px;
}

:host([prominent][fixed][adjust]) {
  padding-top: 128px;
}

:host([dense][prominent][fixed][adjust]) {
  padding-top: 96px;
}

@media (max-width: 599px) {
  div {
    height: 56px;
  }

  section {
    padding: 4px;
  }

  :host([short]) {
    transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  :host([short][collapsed]) {
    transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  :host([short][collapsed]) section[role="toolbar"] {
    padding-left: 0;
    padding-right: 12px;
  }

  :host([prominent]) slot[name="title"]::slotted(*) {
    padding-bottom: 6px;
  }

  :host([fixed][adjust]) {
    padding-top: 56px;
  }
}

:host([center-title]) section {
  flex-basis: 0%;
}

:host([center-title]) section:not([role]) {
  justify-content: center;
}

:host([center-title]) slot[name="title"]::slotted(*) {
  padding-left: 0;
}`
    ]
  }

  render() {
    return html`
<header>
  <div>
    <section ?align-center=${this.centerTitle}>
      <slot class="icons" name="navigationIcon" ?hidden=${this.centerTitle}></slot>
      <slot name="title"></slot>
    </section>
    <section role="toolbar">
      <slot class="icons" name="actionItems"></slot>
    </section>
  </div>
</header>`
  }
}
