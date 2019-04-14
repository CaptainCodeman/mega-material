import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './icon'
import './ripple'
import { defaultCSS } from './styles';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-tab': TabElement;
    'mwc-tab-bar': TabBarElement;
    'mwc-tab-indicator': TabIndicatorElement;
    'mwc-tab-scroller': TabScrollerElement;
  }
}

export type TabAlign = 'start' | 'end' | 'center'


@customElement('mwc-tab')
export class TabElement extends LitElement {
  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  stacked = false;

  @property({ type: Boolean, reflect: true, attribute: 'min-width' })
  minWidth = false;

  @property({ type: Boolean, reflect: true })
  content = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  flex: 1 0 auto;
  justify-content: center;
  white-space: nowrap;
  position: relative;
  contain: content;
}
mwc-ripple {
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
}
button {
  position: relative;
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  box-sizing: border-box;
  height: 48px;
  padding: 0 24px;
  border: none;
  outline: none;
  background: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  z-index: 1;
}
#label {
  color: var(--mdc-theme-on-surface, #000);
}
mwc-icon,
slot[name="icon"]::slotted(*) {
  color: var(--mdc-theme-on-surface, #000);
  fill: currentColor;
}
button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

:host([min-width]) button {
  flex: 0 1 auto;
}

#content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

#label,
mwc-icon,
slot[name="icon"]::slotted(*) {
  transition: 150ms color linear, 150ms opacity linear;
  z-index: 2;
}

#label {
  display: inline-block;
  opacity: 0.6;
  line-height: 1;
}

mwc-icon,
slot[name="icon"]::slotted(*) {
  width: 24px;
  height: 24px;
  opacity: 0.54;
  font-size: 24px;
  --mdc-icon-size: 24px;
}

:host([stacked]) button {
  height: 72px;
}

:host([stacked]) #content {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

:host([stacked]) mwc-icon,
:host([stacked]) slot[name="icon"]::slotted(*) {
  padding-top: 12px;
}

:host([stacked]) #label {
  padding-bottom: 16px;
}

:host([active]) #label {
  color: var(--mdc-theme-primary, #6200ee);
}
:host([active]) mwc-icon,
:host([active]) slot[name="icon"]::slotted(*) {
  color: var(--mdc-theme-primary, #6200ee);
  fill: currentColor;
}
:host([active]) #label,
:host([active]) mwc-icon,
:host([active]) slot[name="icon"]::slotted(*) {
  transition-delay: 100ms;
  opacity: 1;
}

:host(:not([stacked])) mwc-icon + #label,
:host(:not([stacked])) slot[name="icon"] + #label {
  padding-left: 8px;
  padding-right: 0;
}
`
    ]
  }

  render() {
    return html`
<mwc-ripple primary>
  <button role="tab" ?aria-selected=${this.selected} tabindex="0">
    <span id="content">
      <slot name="icon">${this.icon ? html`<mwc-icon>${this.icon}</mwc-icon>` : nothing }</slot>
      <span id="label"><slot></slot></span>
    </span>
    <mwc-tab-indicator .active=${this.active}></mwc-tab-indicator>
  </button>
</mwc-ripple>
`
  }
}

@customElement('mwc-tab-bar')
export class TabBarElement extends LitElement {
  @property({ type: String, reflect: true })
  align: TabAlign = 'center'

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  width: 100%;
}
`
    ]
  }

  render() {
    return html`<mwc-tab-scroller .align=${this.align}><slot></slot></mwc-tab-scroller>`
  }
}

@customElement('mwc-tab-indicator')
export class TabIndicatorElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  active = false;

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
#underline {
  background-color: var(--mdc-theme-primary, #6200ee);
  height: 2px;
}
.mdc-tab-indicator > .mdc-tab-indicator__content--icon {
  color: var(--mdc-theme-secondary, #018786);
}
.mdc-tab-indicator > .mdc-tab-indicator__content--icon {
  height: 34px;
  font-size: 34px;
}

.mdc-tab-indicator__content {
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  width: 100%;
}

.mdc-tab-indicator__content--icon {
  align-self: center;
  margin: 0 auto;
}

.mdc-tab-indicator--active > .mdc-tab-indicator__content {
  opacity: 1;
}

.mdc-tab-indicator > .mdc-tab-indicator__content {
  transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
}

.mdc-tab-indicator--no-transition > .mdc-tab-indicator__content {
  transition: none;
}

.mdc-tab-indicator--fade > .mdc-tab-indicator__content {
  transition: 150ms opacity linear;
}

.mdc-tab-indicator--active.mdc-tab-indicator--fade > .mdc-tab-indicator__content {
  transition-delay: 100ms;
}
`
    ]
  }

  render() {
    return html``
  }
}

@customElement('mwc-tab-scroller')
export class TabScrollerElement extends LitElement {
  @property({ type: String, reflect: true })
  align: TabAlign = 'center'

  @property({ type: Boolean, reflect: true })
  animating = false

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  overflow-y: hidden;
  display: flex;
  width: 100%;
  flex: 1;
}

#area {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow-x: scroll;
}

#area::-webkit-scrollbar {
  display: none;
}

#content {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  transform: none;
  will-change: transform;
}

:host([align="start"]) #content {
  justify-content: flex-start;
}

:host([align="end"]) #content {
  justify-content: flex-end;
}

:host([align="center"]) #content {
  justify-content: center;
}

:host([animating]) #area {
  -webkit-overflow-scrolling: auto;
}

:host([animating]) #content {
  transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
}`
    ]
  }

  render() {
    return html`<div id="area"><div id="content"><slot></slot></div></div>`
  }
}
