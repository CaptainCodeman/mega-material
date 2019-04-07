import { LitElement, html, customElement, css, property } from 'lit-element';

import './icon'
import './ripple'
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-list': ListElement;
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

  firstUpdated() {
    this.setAttribute('role', 'list')
  }

  static get styles() {
    return [
      hiddenStyle,
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

:host([dense]) .mdc-list-item__secondary-text {
  font-size: inherit;
}

:host([dense]) .mdc-list-item {
  height: 40px;
}

:host([dense]) .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 36px;
  width: 20px;
  height: 20px;
}

.mdc-list--avatar-list .mdc-list-item {
  height: 56px;
}

.mdc-list--avatar-list .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.mdc-list--two-line .mdc-list-item {
  height: 72px;
}

.mdc-list--two-line.mdc-list--dense .mdc-list-item {
  height: 60px;
}

.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {
  height: 48px;
}

.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 20px;
  width: 36px;
  height: 36px;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-divider {
  height: 0;
  margin: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.mdc-list-divider {
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

.mdc-list-divider--padded {
  margin: 0 16px;
}

.mdc-list-divider--inset {
  margin-left: 72px;
  margin-right: 0;
  width: calc(100% - 72px);
}

.mdc-list-divider--inset.mdc-list-divider--padded {
  width: calc(100% - 72px - 16px);
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
}`
    ]
  }

  render() {
    return html`
<slot></slot>
`
  }
}

export type ListItemType = 'default' | 'radio' | 'checkbox'

@customElement('mwc-list-item')
export class ListItemElement extends LitElement {
  @property({ type: String })
  label = 'default'

  xcreateRenderRoot() {
    return this
  }

  firstUpdated() {
    this.setAttribute('role', 'listitem')
  }

  static get styles() {
    return [
      hiddenStyle,
      css`
mwc-ripple {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  padding: 0 16px;
  overflow: hidden;
}

:host:focus {
  outline: none;
}

.mdc-list-item__secondary-text {
  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));
}

.mdc-list-item__graphic {
  background-color: transparent;
}

.mdc-list-item__graphic {
  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));
}

.mdc-list-item__meta {
  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38));
}

.mdc-list-item--selected,
.mdc-list-item--activated {
  color: var(--mdc-theme-primary, #6200ee);
}
.mdc-list-item--selected .mdc-list-item__graphic,
.mdc-list-item--activated .mdc-list-item__graphic {
  color: var(--mdc-theme-primary, #6200ee);
}

.mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 32px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.mdc-list-item__meta {
  margin-left: auto;
  margin-right: 0;
}

.mdc-list-item__text,
.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}

.mdc-list-item__secondary-text {
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

.mdc-list--dense .mdc-list-item__secondary-text {
  font-size: inherit;
}

.mdc-list--dense .mdc-list-item {
  height: 40px;
}

.mdc-list--dense .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 36px;
  width: 20px;
  height: 20px;
}

.mdc-list--avatar-list .mdc-list-item {
  height: 56px;
}

.mdc-list--avatar-list .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.mdc-list--two-line .mdc-list-item {
  height: 72px;
}

.mdc-list--two-line.mdc-list--dense .mdc-list-item {
  height: 60px;
}

.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {
  height: 48px;
}

.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
  margin-left: 0;
  margin-right: 20px;
  width: 36px;
  height: 36px;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-divider {
  height: 0;
  margin: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.mdc-list-divider {
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

.mdc-list-divider--padded {
  margin: 0 16px;
}

.mdc-list-divider--inset {
  margin-left: 72px;
  margin-right: 0;
  width: calc(100% - 72px);
}

.mdc-list-divider--inset.mdc-list-divider--padded {
  width: calc(100% - 72px - 16px);
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
`
    ]
  }

  render() {
    return html`
<mwc-ripple>
  <slot></slot>
</mwc-ripple>
`
  }
}
