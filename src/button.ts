import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import './ripple'
import { defaultCSS, elevationCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mega-button': ButtonElement;
  }
}

@customElement('mega-button')
export class ButtonElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  block = false;

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

  @property({ type: Boolean, attribute: 'trailing-icon' })
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
      defaultCSS,
      elevationCSS,
      css`
:host {
  display: inline-flex;
  outline: none;
  contain: content;
  border-radius: var(--mega-button-border-radius, 4px);
  will-change: box-shadow;
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
  padding: var(--button-padding, 0 8px);
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
  border-radius: var(--mega-button-border-radius, 4px);
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
mega-icon {
  margin-left: 0;
  margin-right: 8px;
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 18px;
  vertical-align: top;
}
:host(:not(:disabled)) button {
  color: var(--mega-theme-primary, #6200ee);
}

.label + mega-icon {
  margin-left: 8px;
  margin-right: 0;
}

svg {
  fill: currentColor;
}

:host([raised]) mega-icon,
:host([unelevated]) mega-icon,
:host([outlined]) mega-icon {
  margin-left: -4px;
  margin-right: 8px;
}
:host([raised]) .label + mega-icon,
:host([unelevated]) .label + mega-icon,
:host([outlined]) .label + mega-icon {
  margin-left: 8px;
  margin-right: -4px;
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
  background-color: var(--mega-theme-primary, #6200ee);
}
:host([raised]:not(:disabled)) button,
:host([unelevated]:not(:disabled)) button {
  color: var(--mega-theme-on-primary, #fff);
}

:host([raised])  {
  box-shadow: var(--elevation-02);
  transition: var(--elevation-transition);
}
:host([raised]:hover),
:host([raised]:focus) {
  box-shadow: var(--elevation-04);
}
:host([raised]:active) {
  box-shadow: var(--elevation-02);
}
:host([raised]:disabled) {
  box-shadow: var(--elevation-00);
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
  border-color: var(--mega-theme-primary, #6200ee);
}

:host([dense]) button {
  height: 32px;
  font-size: 0.8125rem;
}

:host([raised]) mega-ripple,
:host([unelevated]) mega-ripple {
  --mega-ripple-fg-opacity: 0.24;
}

:host([block]) button {
  width: 100%;
}
`
    ]
  }

  render() {
    const icon = html`<mega-icon>${this.icon}</mega-icon>`
    return html`
<mega-ripple primary>
  <button ?disabled=${this.disabled} aria-label=${this.label || this.icon}>
    ${this.icon && !this.trailingIcon ? icon : nothing}
    <span class="label">${this.label}</span>
    ${this.icon && this.trailingIcon ? icon : nothing}
    <slot></slot>
  </button>
</mega-ripple>`
  }
}
