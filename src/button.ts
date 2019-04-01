import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import './ripple'
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-button': ButtonElement;
  }
}

@customElement('mwc-button')
export class ButtonElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  raised = false;

  @property({ type: Boolean, reflect: true })
  unelevated = false;

  @property({ type: Boolean, reflect: true })
  outlined = false;

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean })
  trailingIcon = false;

  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static get styles() {
    return [
      hiddenStyle,
      css`
:host {
  display: inline-block;
  outline: none;
  contain: content;
}
button {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0 8px 0 8px;
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  height: 36px;
  border: none;
  outline: none;

  line-height: inherit;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: var(--mdc-button-border-radius, 4px);
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
:host(:active) button {
  outline: none;
}
:host(:hover) button {
  cursor: pointer;
}
:host(:disabled) button {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.37);
  cursor: default;
  pointer-events: none;
}
:host(:not(:disabled)) button {
  background-color: transparent;
}
mwc-icon {
  margin-left: 0;
  margin-right: 8px;
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 18px;
  vertical-align: top;
}
[dir=rtl] mwc-icon,
mwc-icon[dir=rtl] {
  margin-left: 8px;
  margin-right: 0;
}
:host(:not(:disabled)) button {
  color: #6200ee;
  color: var(--mdc-theme-primary, #6200ee);
}

.label + mwc-icon {
  margin-left: 8px;
  margin-right: 0;
}
[dir=rtl] .label + mwc-icon,
.label + mwc-icon[dir=rtl] {
  margin-left: 0;
  margin-right: 8px;
}

svg {
  fill: currentColor;
}

:host([raised]) mwc-icon,
:host([unelevated]) mwc-icon,
:host([outlined]) mwc-icon {
  margin-left: -4px;
  margin-right: 8px;
}
[dir=rtl] :host([raised]) mwc-icon,
:hos(t[raised]) mwc-icon[dir=rtl],
[dir=rtl] :host([unelevated]) mwc-icon,
:host([unelevated]) mwc-icon[dir=rtl],
[dir=rtl] :host([outlined]) mwc-icon,
:host([outlined]) mwc-icon[dir=rtl] {
  margin-left: 8px;
  margin-right: -4px;
}
:host([raised]) .label + mwc-icon,
:host([unelevated]) .label + mwc-icon,
:host([outlined]) .label + mwc-icon {
  margin-left: 8px;
  margin-right: -4px;
}
[dir=rtl] :host([raised]) .label + mwc-icon,
:host([raised]) .label + mwc-icon[dir=rtl],
[dir=rtl] :host([unelevated]) .label + mwc-icon,
:host([unelevated]) .label + mwc-icon[dir=rtl],
[dir=rtl] :host([outlined]) .label + mwc-icon,
:host([outlined]) .label + mwc-icon[dir=rtl] {
  margin-left: -4px;
  margin-right: 8px;
}

:host([raised]) button,
:host([unelevated]) button {
  padding: 0 16px 0 16px;
}
:host([raised]:disabled) button,
:host([unelevated]:disabled) button {
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.37);
}
:host([raised]:not(:disabled)) button,
:host([unelevated]:not(:disabled)) button {
  background-color: #6200ee;
}
:host([raised]:not(:disabled)) button,
:host([unelevated]:not(:disabled)) button {
  color: #fff;
  color: var(--mdc-theme-on-primary, #fff);
}

:host([raised]) button {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
:host([raised]:hover) button ,
:host([raised]) button:focus {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
:host([raised]:active) button {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
              0px 8px 10px 1px rgba(0, 0, 0, 0.14),
              0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
:host([raised]:disabled) button {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
              0px 0px 0px 0px rgba(0, 0, 0, 0.14),
              0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}

:host([outlined]) button {
  border-style: solid;
  padding: 0 14px 0 14px;
  border-width: 2px;
}
:host([outlined]:disabled) button {
  border-color: rgba(0, 0, 0, 0.37);
}
:host([outlined]:not(:disabled)) button {
  border-color: #6200ee;
  border-color: var(--mdc-theme-primary, #6200ee);
}

:host([dense]) button {
  height: 32px;
  font-size: 0.8125rem;
}

:host([raised]) mwc-ripple,
:host([unelevated]) mwc-ripple {
  --mdc-ripple-fg-opacity: 0.24;
}`
    ]
  }

  render() {
    const mdcButtonIcon = html`<mwc-icon>${this.icon}</mwc-icon>`
    return html`
<mwc-ripple>
  <button ?disabled=${this.disabled} aria-label=${this.label || this.icon}>
    ${this.icon && !this.trailingIcon ? mdcButtonIcon : nothing}
    <span class="label">${this.label}</span>
    ${this.icon && this.trailingIcon ? mdcButtonIcon : nothing}
    <slot></slot>
  </button>
</mwc-ripple>`
  }
}
