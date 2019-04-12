import { LitElement, html, customElement, css, property, query, PropertyValues } from 'lit-element';

import './icon'
import './ripple'
import { defaultCSS } from './styles';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-list': ListElement;
    'mwc-list-divider': ListDividerElement;
    'mwc-list-item': ListItemElement;
  }
}

export type ListType = 'default' | 'two-line' | 'avatar-list'

@customElement('mwc-list')
export class ListElement extends LitElement {
  @property({ type: String, reflect: true })
  type = 'default'

  @property({ type: Boolean, reflect: true })
  dense = false

  @query('slot')
  slotElement: HTMLSlotElement

  private listItems_: Node[] = []

  firstUpdated(changedProperties: PropertyValues) {
    this.setAttribute('role', 'list')
    this.slotElement.addEventListener('slotchange', e => this.slotChanged_(e))
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('type') ||
        changedProperties.has('dense')
    ) {
      this.updateItems_()
    }
  }

  private slotChanged_(e: Event) {
    this.listItems_ = this.slotElement.assignedNodes().filter(node => node.nodeType === 1)
    this.updateItems_()
  }

  // or should these just go on the items anyway? they are really of no concern to the list
  private updateItems_() {
    this.listItems_.forEach(node => {
      const el = <HTMLElement>node
      el.setAttribute('list-type', this.type)
      if (this.dense) {
        el.setAttribute('dense', '')
      } else {
        el.removeAttribute('dense')
      }
    })
  }

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  display: flex;
  flex-direction: column;
  contain: content;

  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
  margin: 0;
  padding: 8px 0;
  line-height: 1.5rem;
  list-style-type: none;
}

:host([dense]) {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: .812rem;
}

/*
a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-group .mdc-list {
  padding: 0;
}

.mdc-list-group__subheader {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  margin: 0.75rem 16px;
}

.mdc-list-group__subheader {
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
}
*/`
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}

@customElement('mwc-list-divider')
export class ListDividerElement extends LitElement {
  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  height: 0;
  margin: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

:host([padded]) {
  margin: 0 16px;
}

:host([inset]) {
  margin-left: 72px;
  margin-right: 0;
  width: calc(100% - 72px);
}

:host([padded][inset]) {
  width: calc(100% - 72px - 16px);
}`
    ]
  }

  render() {
    return html``
  }
}

export type ListItemType = 'default' | 'radio' | 'checkbox'

@customElement('mwc-list-item')
export class ListItemElement extends LitElement {
  @property({ type: String })
  type = 'default'

  @property({ type: String })
  label = 'default'

  @property({ type: String })
  icon: string

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon: string

  @property({ type: Boolean, reflect: true })
  selected: boolean = false

  @property({ type: Boolean, reflect: true })
  activated: boolean = false

  firstUpdated() {
    this.setAttribute('role', 'listitem')
  }

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  box-sizing: border-box;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  padding: 0 16px;
  overflow: hidden;
}

mwc-ripple {
  position: absolute;
  left: -16px;
  width: calc(100% + 32px);
  height: 100%;
  overflow: hidden;
}

:host:focus {
  outline: none;
}

.secondary {
  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));
}

mwc-icon,
slot[name="icon"]::slotted(*),
.meta {
  background-color: transparent;
  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38));
}

:host([selected]),
:host([activated]),
:host([selected]) mwc-icon,
:host([selected]) slot[name="icon"]::slotted(*),
:host([activated]) mwc-icon,
:host([activated]) slot[name="icon"]::slotted(*) {
  color: var(--mdc-theme-primary, #6200ee);
}

slot[name="icon"] mwc-icon,
slot[name="icon"]::slotted(*) {
  margin-left: 0;
  margin-right: 32px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.meta {
  margin-left: auto;
  margin-right: 0;
}

.text,
.secondary {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}

.secondary {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.01786em;
  text-decoration: inherit;
  text-transform: inherit;
}

:host([dense]) .secondary {
  font-size: inherit;
}

:host([dense]) {
  height: 40px;
}

:host([dense]) slot[name="icon"] mwc-icon,
:host([dense]) slot[name="icon"]::slotted(*) {
  margin-left: 0;
  margin-right: 36px;
  width: 20px;
  height: 20px;
}

:host([list-type="avatar-list"]) {
  height: 56px;
}

:host([list-type="avatar-list"]) slot[name="icon"] mwc-icon,
:host([list-type="avatar-list"]) slot[name="icon"]::slotted(*) {
  margin-left: 0;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.3);
  color: #fff;
}

:host([list-type="two-line"]) {
  height: 72px;
}

:host([list-type="two-line"][dense]) {
  height: 60px;
}

:host([list-type="avatar-list"][dense]) {
  height: 48px;
}

:host([list-type="avatar-list"][dense]) slot[name="icon"] mwc-icon,
:host([list-type="avatar-list"][dense]) slot[name="icon"]::slotted(*) {
  margin-left: 0;
  margin-right: 20px;
  width: 36px;
  height: 36px;
}

/*
a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}
*/
`
    ]
  }

  render() {
    return html`
<mwc-ripple ?selected=${this.selected} ?activated=${this.activated}></mwc-ripple>
<slot name="icon">${ this.icon ? html`<mwc-icon>${this.icon}</mwc-icon>` : nothing }</slot>
<span class="text">
  <span class="primary"><slot>${this.label}</slot></span>
  <span class="secondary"><slot name="secondary"></slot></span>
</span>
<span class="meta"><slot name="meta">${ this.trailingIcon ? html`<mwc-icon>${this.trailingIcon}</mwc-icon>` : nothing }</slot></span>`
// <span class="graphic"><slot name="icon"><mwc-icon>${this.icon}</mwc-icon></slot></span>
// <span class="meta"><slot name="trailingIcon"><mwc-icon>${this.trailingIcon}</mwc-icon></slot></span>
  }
}
