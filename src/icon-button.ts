import { LitElement, html, customElement, css, property } from 'lit-element';

import './icon'
import './ripple'
import { hiddenStyle } from './styles';

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
      hiddenStyle,
      css`
:host {
  display: inline-flex;
  contain: content;
}

mwc-ripple {
  width: var(--mdc-icon-button-size, 48px);
  height: var(--mdc-icon-button-size, 48px);
}

button {
  will-change: transform, opacity;
  width: 100%;
  height: 100%;
  padding: var(--mdc-icon-button-padding, 12px);
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
  user-select: none;
}

::slotted(svg),
::slotted(img)
::slotted(mwc-icon), {
  width: var(--mdc-icon-size, 24px);
  height: var(--mdc-icon-size, 24px);
  display: inline-block;
}

:host([on]) slot:not([name]) {
  display: none;
}

:host(:not([on])) slot[name] {
  display: none;
}

:host:disabled {
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
