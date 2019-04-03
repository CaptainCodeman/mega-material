import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './icon-button'
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-snackbar': SnackbarElement;
  }
}

@customElement('mwc-snackbar')
export class SnackbarElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  dismissable = false;

  @property({ type: Boolean, reflect: true })
  opened = false;

  @property({ type: Boolean, reflect: true })
  opening = false;

  @property({ type: Boolean, reflect: true })
  closing = false;

  @property({ type: Boolean, reflect: true })
  stacked = false;

  @property({ type: Boolean, reflect: true })
  leading = false;

  @query('.surface')
  private surface: HTMLDivElement
  private timer_: number

  firstUpdated() {
    this.surface.addEventListener('transitionend', e => this.closing = false)
  }

  async open() {
    this.opening = true
    await this.updateComplete
    this.surface.getBoundingClientRect()
    this.opening = false
    this.opened = true
    this.timer_ = window.setTimeout(() => this.close(), 5000)
  }

  async close() {
    if (this.opened) {
      this.closing = true
      this.opened = false
    }
  }

  // TODO: transition end - removed opened if closing

  dismiss() {
    if (this.timer_) {
      window.clearTimeout(this.timer_)
      this.timer_ = 0
    }
    this.close()
  }

  static get styles() {
    return [
      hiddenStyle,
      css`
:host {
  z-index: 8;
  margin: 8px;
  display: none;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  pointer-events: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.surface {
  min-width: 344px;
  max-width: 672px;
  background-color: #333333;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
              0px 6px 10px 0px rgba(0, 0, 0, 0.14),
              0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;}

.label {
  color: rgba(255, 255, 255, 0.87);
}

@media (max-width: 480px), (max-width: 344px) {
  .surface {
    min-width: 100%;
  }
}

:host([opening]),
:host([opened]),
:host([closing]) {
  display: flex;
}

:host([leading]) {
  justify-content: flex-start;
}

:host([stacked]) .surface {
  flex-direction: column;
  align-items: flex-start;
}
:host([stacked]) .actions {
  align-self: flex-end;
  margin-bottom: 8px;
}

.surface {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  transform: scale(0.8);
  opacity: 0;
}

:host([opened]) .surface {
  transition: opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),
              transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

:host([closing]) .surface {
  transform: scale(1);
  transition: opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1);
}

.label {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  text-decoration: inherit;
  text-transform: inherit;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 16px;
}

.label::before {
  display: inline;
  content: attr(data-mdc-snackbar-label-text);
}

.actions {
  margin-left: 0;
  margin-right: 8px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

/* .mdc-snackbar__action:not(:disabled) */
.actions ::slotted(*) {
  color: #bb86fc;
  --mdc-theme-primary: #bb86fc;
}
/*
Action ripple ...
.mdc-snackbar__action::before, .mdc-snackbar__action::after {
  background-color: #bb86fc;
}
.mdc-snackbar__action:hover::before {
  opacity: 0.08;
}
.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before, .mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-snackbar__action.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.24;
}
*/

mwc-icon-button {
  color: rgba(255, 255, 255, 0.87);
  width: 36px;
  height: 36px;
}
/*
dismiss icon ripple

.mdc-snackbar__dismiss::before, .mdc-snackbar__dismiss::after {
  background-color: rgba(255, 255, 255, 0.87);
}
.mdc-snackbar__dismiss:hover::before {
  opacity: 0.08;
}
.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before, .mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-snackbar__dismiss.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.24;
}
*/

mwc-icon-button {
  margin-left: 8px;
  margin-right: 0;
  --mdc-icon-button-size: 36px;
  --mdc-icon-size: 18px;
  --mdc-icon-button-padding: 9px;
}
:host(:not([dismissable])) mwc-icon-button {
  display: none;
}

slot[name="action"],
.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,
.mdc-snackbar__dismiss.mdc-snackbar__dismiss img {
  width: 18px;
  height: 18px;
}`
    ]
  }

  render() {
    return html`
<div class="surface">
  <div class="label" role="status" aria-live="polite">
    <slot></slot>
  </div>
  <div class="actions">
    <slot name="action"></slot>
    <mwc-icon-button icon="clear" @click=${this.dismiss}></mwc-icon-button>
  </div>
</div>`
  }
}
