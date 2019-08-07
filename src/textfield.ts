import { LitElement, html, css, customElement, property, PropertyValues } from 'lit-element'

import './ripple-underline'
import './notched-outline'

declare global {
  interface HTMLElementTagNameMap {
    'mega-textfield': TextfieldElement;
  }
}


@customElement('mega-textfield')
export class TextfieldElement extends LitElement {
  @property({ type: String })
  type: string

  @property({ type: String })
  value: string = ''

  @property({ type: String })
  label: string = ''

  @property({ type: String })
  prefix: string = ''

  @property({ type: String })
  suffix: string = ''

  @property({ type: Boolean, reflect: true })
  outlined: boolean

  @property({ type: Boolean, reflect: true })
  readonly: boolean

  @property({ type: Boolean, reflect: true })
  dense: boolean

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false

  @property({ type: Boolean, reflect: true, attribute: 'multi-line' })
  multiLine = false

  @property({ type: String, attribute: 'leading-icon' })
  leadingIcon: string

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon: string

  @property({ type: String, attribute: 'helper-text' })
  helperText: string

  @property({ type: String, attribute: 'error-text' })
  errorText: string

  @property({ type: Boolean, attribute: 'character-count' })
  characterCount: boolean

  @property({ type: Boolean, reflect: true })
  disabled: boolean

  @property({ type: Boolean })
  required: boolean

  @property({ type: String })
  placeholder: string = ''

  @property({ type: Number })
  maxlength: number = 0

  @property({ type: Boolean, reflect: true })
  active: boolean

  @property({ type: Boolean })
  focused: boolean

  constructor() {
    super()
    this.addEventListener('focus', this.onFocus)
    this.addEventListener('blur', this.onBlur)
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  shouldUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('focused') || changedProperties.has('value')) {
      this.active = this.focused || this.value !== ''
    }
    return true
  }

  onFocus(e: Event) {
    this.focused = true
    this.active = true
  }

  onBlur(e: Event) {
    this.focused = false
    this.active = this.value !== ''
  }

  onInput(e: Event) {
    const el = <HTMLInputElement>e.target
    this.value = el.value
  }

  render() {
    return html`
<div>
  <input
    type=${this.type}
    placeholder=${this.placeholder}
    maxlength=${this.maxlength}
    ?required=${this.required}
    ?disabled=${this.disabled}
    .value=${this.value}
    @input=${this.onInput}
  >
  ${ this.outlined
    ? html`<mega-notched-outline .label=${this.label} .active=${this.active} .focused=${this.focused} ?disabled=${this.disabled}></mega-notched-outline>`
    : html`<mega-ripple-underline .label=${this.label} .active=${this.active} .focused=${this.focused} ?disabled=${this.disabled}></mega-ripple-underline>`
  }
</div>
<span>${this.helperText}</span>
`
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        width: 280px;
        font-size: 16px;
        outline: none;
      }

      :host([fullwidth]) {
        width: 100%;
      }

      div {
        display: block;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-height: 56px;
      }

      input {
        font-size: 16px;
        line-height: 29px;
        font-weight: 400;
        height: 28px;
        padding: 22px 16px 6px 16px;
        border: none;
        background: none;
        appearance: none;
        outline: none;
        caret-color: var(--mega-theme-primary, #6200ee);
      }

      mega-notched-outline,
      mega-ripple-underline {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        z-index: -1;
      }

      span {
        font-size: 12px;
        line-height: 20px;
        margin-left: 12px;
        color: #0009;
      }

      /* TODO: move input into slot so each can size / position it as required */
      :host([outlined]) input {
        padding: 16px 16px 6px 16px;
      }
    `
  }
}

/* dense
:host([dense]) {
    min-height: 40px;
}

:host([dense]) label {
    display: none;
}
*/
