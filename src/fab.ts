import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import './ripple'
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-fab': FABElement;
  }
}

@customElement('mwc-fab')
export class FABElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  mini = false;

  @property({ type: Boolean, reflect: true })
  exited = false;

  @property({ type: String })
  icon = '';

  @property({ type: Boolean, attribute: 'trailing-icon' })
  trailingIcon = false;

  @property({ type: String })
  label = '';

  static get styles() {
    return [
      hiddenStyle,
      css`


:host {
  will-change: transform, opacity;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
              0px 6px 10px 0px rgba(0, 0, 0, 0.14),
              0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 15ms linear 30ms,
              transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  border: none;
  fill: currentColor;
  cursor: pointer;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: hidden;
  background-color: var(--mdc-theme-secondary, #018786);
  color: var(--mdc-theme-on-secondary, #fff);
}

mwc-ripple {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  --mdc-ripple-bg-color: var(--mdc-theme-on-secondary, #fff);
}

button {
  width: 56px;
  height: 56px;
  background: none;
  display: inline-flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  line-height: inherit;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  color: inherit;
}

:host([mini]) button {
  width: 40px;
  height: 40px;
}

:host([label]) button {
  width: auto;
  height: 48px;
}

:host(:not([label])) {
  border-radius: 50%;
}
:host::-moz-focus-inner {
  padding: 0;
  border: 0;
}
:host:hover,
:host:focus {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
              0px 8px 10px 1px rgba(0, 0, 0, 0.14),
              0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
:host:active {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
              0px 12px 17px 2px rgba(0, 0, 0, 0.14),
              0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}
:host:active,
:host:focus {
  outline: none;
}
:host:hover {
  cursor: pointer;
}
svg {
  width: 100%;
}
mwc-icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: inherit;
}

:host([mini]) {
  width: 40px;
  height: 40px;
}

:host([label]) {
  border-radius: 24px;
  width: auto;
  max-width: 100%;
  height: 48px;
}

:host([label]) button {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0 20px;
}
:host([label]) mwc-icon {
  margin-left: -8px;
  margin-right: 12px;
}
:host([label][trailing-icon]) mwc-icon {
  margin-left: 12px;
  margin-right: -8px;
}

span {
  justify-content: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

mwc-icon {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:host([exited]) {
  transform: scale(0);
  transition: opacity 15ms linear 150ms,
              transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);
  opacity: 0;
}
:host([exited]) mwc-icon {
  transform: scale(0);
  transition: transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);
}

:host([trailing-icon]) button {
  flex-direction: row-reverse;
}
`
    ]
  }

  render() {
    return html`
<mwc-ripple>
  <button aria-label=${this.label || this.icon}>
    <mwc-icon ?hidden=${!this.icon}>${this.icon}</mwc-icon>
    <span>${this.label}</span>
  </button>
</mwc-ripple>`
  }
}
