import { LitElement, html, customElement, css, property, PropertyValues, query } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import './ripple'
import { defaultCSS, rippleCSS } from './styles';
import { isLightBackground } from './colors';

declare global {
  interface HTMLElementTagNameMap {
    'mega-scratch': ScratchElement;
    'mega-scratch-color': ScratchColorElement;
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

@customElement('mega-scratch')
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
      defaultCSS,
      rippleCSS,
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

slot[name="icon"] mega-icon,
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
<mega-ripple ?primary=${this.primary}></mega-ripple>
<slot name="icon">${ this.icon ? html`<mega-icon>${this.icon}</mega-icon>` : nothing }</slot>
<slot></slot>
`
  }
}


@customElement('mega-scratch-color')
export class ScratchColorElement extends LitElement {
  @property({ type: String, reflect: true })
  theme: string = ''

  @property({ type: Boolean, reflect: true })
  bg = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  firstUpdated(changedProperties: PropertyValues) {
    const lightBG = isLightBackground(this)
    this.style.setProperty('--overlay', lightBG ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)');
    this.style.setProperty('--hover-opacity', lightBG ? '0.04' : '0.08');
    this.style.setProperty('--focus-opacity', lightBG ? '0.12' : '0.24');
    this.style.setProperty('--selected-opacity', lightBG ? '0.08' : '0.16');
    this.style.setProperty('--activated-opacity', lightBG ? '0.12' : '0.24');
    this.style.setProperty('--pressed-opacity', lightBG ? '0.16' : '0.32');
  }

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 12px;
  min-width: 200px;
  color: var(--mega-background-on);
  background-color: var(--mega-background);
  outline: none;
  user-select: none;
}

:host([theme="primary"]) {
  color: var(--mega-primary);
}

:host([theme="primary-light"]) {
  color: var(--mega-primary-light);
}

:host([theme="primary-dark"]) {
  color: var(--mega-primary-dark);
}

:host([theme="secondary"]) {
  color: var(--mega-secondary);
}

:host([theme="secondary-light"]) {
  color: var(--mega-secondary-light);
}

:host([theme="secondary-dark"]) {
  color: var(--mega-secondary-dark);
}

:host([theme^="primary"][bg]) {
  color: var(--mega-primary-on);
}

:host([theme="primary"][bg]) {
  background-color: var(--mega-primary);
}

:host([theme="primary-light"][bg]) {
  background-color: var(--mega-primary-light);
}

:host([theme="primary-dark"][bg]) {
  background-color: var(--mega-primary-dark);
}

:host([theme^="secondary"][bg]) {
  color: var(--mega-primary-on);
}

:host([theme="secondary"][bg]) {
  background-color: var(--mega-secondary);
}

:host([theme="secondary-light"][bg]) {
  background-color: var(--mega-secondary-light);
}

:host([theme="secondary-dark"][bg]) {
  background-color: var(--mega-secondary-dark);
}

:host([theme="background"]) {
  color: var(--mega-background-on);
  background-color: var(--mega-background);
}

:host([bg][theme="background"]) {
  color: var(--mega-background);
  background-color: var(--mega-background-on);
}

:host([theme="surface"]) {
  color: var(--mega-surface-on);
  background-color: var(--mega-surface);
}

:host([bg][theme="surface"]) {
  color: var(--mega-surface);
  background-color: var(--mega-surface-on);
}

:host([theme="error"]) {
  color: var(--mega-error-on);
  background-color: var(--mega-error);
}

:host([bg][theme="error"]) {
  color: var(--mega-error);
  background-color: var(--mega-error-on);
}

:host::before,
:host::after {
  position: absolute;
  top: 0;
  right: 0%;
  bottom: 0;
  left: 0;
  content: '';
  opacity: 0;
  background-color: var(--overlay);
}

:host([theme^="primary"])::before,
:host([theme^="primary"])::after {
  background-color: var(--mega-primary);
}

:host([theme^="secondary"])::before,
:host([theme^="secondary"])::after {
  background-color: var(--mega-secondary);
}

:host([selected])::before {
  opacity: var(--selected-opacity);
}

:host([activated])::before {
  opacity: var(--activated-opacity);
}

:host([bg])::after {
  background-color: var(--overlay);
}

:host(:focus)::after {
  opacity: var(--focus-opacity);
}

:host(:hover)::after {
  opacity: var(--hover-opacity);
}

:host(:active)::after {
  opacity: var(--pressed-opacity);
}

:host([disabled]) {
  color: #444 !important;
  background-color: #ccc !important;
}

:host([disabled])::before,
:host([disabled])::after {
  background-color: transparent !important;
}
`
    ]
  }

  render() {
    return html`<div><slot></slot></div>`
  }
}
