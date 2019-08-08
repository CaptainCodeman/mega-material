import { LitElement, html, css, customElement, property, PropertyValues, query } from 'lit-element'
import { textFieldLabelCSS } from './styles'

@customElement('mega-notched-outline')
export class NotchedOutlineElement extends LitElement {
  @property({ type: String })
  label: string = ''

  @property({ type: Boolean, reflect: true })
  active: boolean = false

  @property({ type: Boolean, reflect: true })
  focused: boolean = false

  @property({ type: Boolean, reflect: true })
  empty: boolean = false

  @query('label') labelElement: HTMLLabelElement

  shouldUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('label')) {
      this.empty = this.label === ''
    }
    return true
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label')) {
      const gap = this.labelElement.clientWidth * 0.75
      this.style.setProperty('--outline-gap', `${gap}px`)
    }
  }

  render() {
    return html`
<label>${this.label}</label>
<div id="left"></div>
<div id="center"></div>
<div id="right"></div>
`
  }

  static get styles() {
    return [
      textFieldLabelCSS,
      css`
        :host {
          position: relative;
          display: flex;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: stretch;
        }

        :host([active]) label {
          transform: translate(12px, -7.5px) scale(0.75);
        }

        div {
          box-sizing: border-box;
          border-width: 1px;
          border-style: solid;
          border-color: #0000006b;
          transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([disabled]) div {
          border-color: #b3b3b3;
        }

        :host([focused]) div {
          border-width: 2px;
          border-color: var(--mega-theme-primary, #6200ee);
        }

        #left {
          width: 12px;
          border-right: none;
          border-radius: 4px 0 0 4px;
        }

        #center {
          border-top: none;
          border-left: none;
          border-right: none;
          width: 0;
          transition: width 30ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([empty]) #center {
          display: none;
        }

        :host([active]) #center {
          width: var(--outline-gap, 0);
        }

        #right {
          flex: auto;
          border-left: none;
          border-radius: 0 4px 4px 0;
        }
      `
    ]
  }
}
