import { LitElement, html, customElement, css, property } from 'lit-element';

import './icon'
import './ripple'

declare global {
  interface HTMLElementTagNameMap {
    'mwc-icon-button': IconButtonElement;
  }
}

@customElement('mwc-icon-button')
export class IconButtonElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  on = false

  @property({ type: String })
  icon = ''

  @property({ type: String, attribute: 'icon-on' })
  iconOn = ''

  @property({ type: String })
  label = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  static get styles() {
    return [
      css`
:host {
  display: inline-block;
}

mwc-ripple {
  width: 48px;
  height: 48px;
}

button {
  will-change: transform, opacity;
  width: 48px;
  height: 48px;
  padding: 12px;
  font-size: 24px;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

::slotted(svg),
::slotted(img)
::slotted(mwc-icon), {
  width: 24px;
  height: 24px;
  display: inline-block;
}

:host([on]) slot:not([name]) {
  display: none;
}

:host(:not([on])) slot[name] {
  display: none;
}

:host:disabled {
  color: rgba(0, 0, 0, 0.38);
  color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));
  cursor: default;
  pointer-events: none;
}`
    ]
  }

  render() {
    return html`
<mwc-ripple unbounded>
  <button
    aria-label=${this.label}
    aria-hidden="true"
    aria-pressed="false">
    <slot><mwc-icon>${this.icon}</mwc-icon></slot>
    <slot name="on"><mwc-icon>${this.iconOn}</mwc-icon></slot>
  </button>
</mwc-ripple>`
  }
}
