import { LitElement, html, css, customElement, property } from 'lit-element'
import { textFieldLabelCSS } from './styles'

@customElement('mega-ripple-underline')
export class RippleUnderlineElement extends LitElement {
  @property({ type: String })
  label: string = ''

  @property({ type: Boolean, reflect: true })
  active: boolean = false

  @property({ type: Boolean, reflect: true })
  focused: boolean = false

  render() {
    return html`
<label>${this.label}</label>
<div id="bottom"></div>
<div id="ripple"></div>
`
  }

  static get styles() {
    return [
      textFieldLabelCSS,
      css`
        :host {
          display: block;
          contain: content;
          position: relative;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          background-color: #f5f5f5;
          border-radius: 4px 4px 0 0;
        }

        :host([focused]) {
          background-color: #dcdcdc;
        }

        :host([active]) label {
          transform: translate(12px, 8px) scale(0.75);
        }

        div {
          display: block;
          position: absolute;
          width: 100%;
          bottom: 0;
        }

        #bottom {
          height: 1px;
          background-color: #0000006b;
        }

        :host([disabled]) #bottom {
          height: 0;
        }

        #ripple {
          height: 2px;
          background-color: var(--mega-theme-primary, #6200ee);
          transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
          transform: scaleX(0);
        }

        :host([focused]) #ripple {
          transform: scaleX(1.0);
        }
      `
    ]
  }
}
