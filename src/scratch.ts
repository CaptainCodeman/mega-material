import { LitElement, html, customElement, css, property, PropertyValues, query } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import './ripple'
import { hiddenStyle, rippleStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-scratch': ScratchElement;
  }
}

if (!HTMLSlotElement.prototype.assignedElements) {
  Object.defineProperty(HTMLSlotElement.prototype, 'assignedElements', {
    value: function(options?: AssignedNodesOptions) {
      const nodes = <Node[]>this.assignedNodes(options)
      return nodes.filter(node => node.nodeType === 1)
    }
  })
}

@customElement('mwc-scratch')
export class ScratchElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  primary: boolean = false

  @property({ type: String })
  icon: string

  @query('slot[name="icon"]')
  iconSlot: HTMLSlotElement

  private iconElements: Element[] = []

  @property({ type: Boolean, reflect: true, attribute: 'has-icon' })
  private hasIcon: boolean = false

  firstUpdated(changedProperties: PropertyValues) {
    this.iconSlot.addEventListener('slotchange', e => {
      this.iconElements = this.iconSlot.assignedElements()
      this.hasIconCheck()
    })
  }

  updated(changedProperties: PropertyValues) {
    this.hasIconCheck()
  }

  hasIconCheck() {
    this.hasIcon = this.iconElements.length > 0 || this.icon !== undefined
  }

  static get styles() {
    return [
      hiddenStyle,
      rippleStyle,
      css`
:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

:host([start]) {
  justify-content: flex-start;
}

:host([end]) {
  justify-content: flex-end;
}

:host([center]) {
  justify-content: center;
}

mwc-icon,
slot[name="icon"]::slotted(*) {
  color: #999;
  margin-left: 0;
  margin-right: 8px;
}

:host([right]) #icon {
  order: 2;
  margin-left: 8px;
  margin-right: 0;
}`
    ]
  }

  render() {
    return html`
<mwc-ripple ?primary=${this.primary}></mwc-ripple>
<slot name="icon">${ this.icon ? html`<mwc-icon>${this.icon}</mwc-icon>` : nothing }</slot>
<slot></slot>
`
  }
}
