import { LitElement, html, customElement, css, property, PropertyValues } from 'lit-element';

import './icon'
import './ripple'
import { defaultCSS } from './styles';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mega-tab': TabElement;
    'mega-tab-bar': TabBarElement;
    'mega-tab-indicator': TabIndicatorElement;
    'mega-tab-scroller': TabScrollerElement;
  }
}

export type TabAlign = 'start' | 'end' | 'center'


@customElement('mega-tab')
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
mega-ripple {
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
  color: var(--mega-theme-on-surface, #000);
}
mega-icon,
slot[name="icon"]::slotted(*) {
  color: var(--mega-theme-on-surface, #000);
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
mega-icon,
slot[name="icon"]::slotted(*) {
  transition: 150ms color linear, 150ms opacity linear;
  z-index: 2;
}

#label {
  display: inline-block;
  opacity: 0.6;
  line-height: 1;
}

mega-icon,
slot[name="icon"]::slotted(*) {
  width: 24px;
  height: 24px;
  opacity: 0.54;
  font-size: 24px;
  --mega-icon-size: 24px;
}

:host([stacked]) button {
  height: 72px;
}

:host([stacked]) #content {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

:host([stacked]) mega-icon,
:host([stacked]) slot[name="icon"]::slotted(*) {
  padding-top: 12px;
}

:host([stacked]) #label {
  padding-bottom: 16px;
}

:host([active]) #label {
  color: var(--mega-theme-primary, #6200ee);
}
:host([active]) mega-icon,
:host([active]) slot[name="icon"]::slotted(*) {
  color: var(--mega-theme-primary, #6200ee);
  fill: currentColor;
}
:host([active]) #label,
:host([active]) mega-icon,
:host([active]) slot[name="icon"]::slotted(*) {
  transition-delay: 100ms;
  opacity: 1;
}

:host(:not([stacked])) mega-icon + #label,
:host(:not([stacked])) slot[name="icon"] + #label {
  padding-left: 8px;
  padding-right: 0;
}
`
    ]
  }

  render() {
    return html`
<mega-ripple primary>
  <button role="tab" ?aria-selected=${this.selected} tabindex="0">
    <span id="content">
      <slot name="icon">${this.icon ? html`<mega-icon>${this.icon}</mega-icon>` : nothing }</slot>
      <span id="label"><slot></slot></span>
    </span>
    <mega-tab-indicator .active=${this.active}></mega-tab-indicator>
  </button>
</mega-ripple>
`
  }
}

@customElement('mega-tab-bar')
export class TabBarElement extends LitElement {
  @property({ type: String, reflect: true })
  align: TabAlign = 'center'

  @property({ type: Number, reflect: true, attribute: 'active-index' })
  activeIndex: number

  private tabItems_: Node[] = []

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('activeIndex')) {
      this.updateActive_()
    }
  }

  private slotChanged_(e: Event) {
    const el = <HTMLSlotElement>e.target
    this.tabItems_ = el.assignedNodes().filter(node => node.nodeType === 1)
    this.updateActive_()
  }

  private updateActive_() {
    this.tabItems_.forEach((tab: TabElement, i) => tab.active = i === this.activeIndex)
  }

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
    return html`<mega-tab-scroller .align=${this.align}><slot @slotchange=${this.slotChanged_}></slot></mega-tab-scroller>`
  }
}

@customElement('mega-tab-indicator')
export class TabIndicatorElement extends LitElement {
  @property({ type: String })
  icon = '';

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
  background-color: var(--mega-theme-primary, #6200ee);
  height: 2px;
}
.mega-tab-indicator > .mega-tab-indicator__content--icon {
  color: var(--mega-theme-secondary, #018786);
}
.mega-tab-indicator > .mega-tab-indicator__content--icon {
  height: 34px;
  font-size: 34px;
}

:host,
.mega-tab-indicator__content {
  transform-origin: left;
  opacity: 0;
}

#underline {
  align-self: flex-end;
  width: 100%;
}

.mega-tab-indicator__content--icon {
  align-self: center;
  margin: 0 auto;
}

:host([active]),
.mega-tab-indicator--active > .mega-tab-indicator__content {
  opacity: 1;
}

.mega-tab-indicator > .mega-tab-indicator__content {
  transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
}

.mega-tab-indicator--no-transition > .mega-tab-indicator__content {
  transition: none;
}

.mega-tab-indicator--fade > .mega-tab-indicator__content {
  transition: 150ms opacity linear;
}

:host([active]) .mega-tab-indicator--fade > .mega-tab-indicator__content {
  transition-delay: 100ms;
}
`
    ]
  }

  render() {
    return html`
<slot name="icon">${this.icon ? html`<mega-icon>${this.icon}</mega-icon>` : nothing }</slot>
<span id="underline"></span>`
  }
}

@customElement('mega-tab-scroller')
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
