import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './ripple'
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-radio': RadioElement;
  }
}

@customElement('mwc-radio')
export class RadioElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  @query('input')
  protected formElement!: HTMLInputElement;

  changeHandler(e: Event) {
    this.checked = this.formElement.checked;
  }

  static get styles() {
    return [
      hiddenStyle,
      css`
:host {
  display: inline-block;
  position: relative;
  outline: none;
  user-select: none;
}

:host([checked]) .track {
  background-color: var(--mdc-theme-secondary, #018786);
  border-color: var(--mdc-theme-secondary, #018786);
  opacity: 0.54;
}

:host([checked]) .thumb {
  background-color: var(--mdc-theme-secondary, #018786);
  border-color: var(--mdc-theme-secondary, #018786);
}

:host(:not([checked])) .track {
  background-color: #000;
  border-color: #000;
}

:host(:not([checked])) .thumb {
  background-color: #fff;
  border-color: #fff;
}

input {
  left: 0;
  right: initial;
  position: absolute;
  top: 0;
  width: 68px;
  height: 48px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  pointer-events: auto;
}

[dir=rtl] input,
input[dir=rtl] {
  left: initial;
  right: 0;
}

.track {
  box-sizing: border-box;
  width: 32px;
  height: 14px;
  border: 1px solid;
  border-radius: 7px;
  opacity: 0.38;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),
              background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 90ms cubic-bezier(0.4, 0, 0.2, 1);
}

mwc-ripple {
  left: -18px;
  right: initial;
  display: flex;
  position: absolute;
  top: -17px;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  transform: translateX(0);
  transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1),
              background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 90ms cubic-bezier(0.4, 0, 0.2, 1);
}
[dir=rtl] mwc-ripple,
mwc-ripple[dir=rtl] {
  left: initial;
  right: -18px;
}

.thumb {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 10px solid;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

:host([checked]) mwc-ripple {
  transform: translateX(20px);
}
[dir=rtl] :host([checked]) mwc-ripple,
:host([checked]) mwc-ripple[dir=rtl] {
  transform: translateX(-20px);
}
:host([checked]) input {
  transform: translateX(-20px);
}
[dir=rtl] :host([checked]) input,
:host([checked]) input[dir=rtl] {
  transform: translateX(20px);
}

:host([disabled]) {
  opacity: 0.38;
  pointer-events: none;
}
:host([disabled]) .thumb {
  border-width: 1px;
}
:host([disabled]) input {
  cursor: default;
  pointer-events: none;
}

mwc-ripple {
  --mdc-ripple-fg-opacity: 0.12;
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
}

:host(:not([checked])) mwc-ripple {
  --mdc-ripple-fg-opacity: 0.24;
}`
    ]
  }

  render() {
    return html`
<mwc-ripple unbounded>
  <input type="radio" role="radio" name=${this.name} ?checked=${this.checked} ?disabled=${this.disabled} @change=${this.changeHandler} .value=${this.value}>
  <div id="bg">
    <div id="outer"></div>
    <div id="inner"></div>
  </div>
</mwc-ripple>`
  }
}
