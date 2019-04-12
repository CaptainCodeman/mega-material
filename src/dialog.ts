import { LitElement, html, customElement, css, property, query, PropertyValues } from 'lit-element';

import { defaultCSS, elevationCSS } from './styles';
import { isScrollable } from './utils';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-dialog': DialogElement;
  }
}

const DIALOG_ANIMATION_CLOSE_TIME_MS = 75,
      DIALOG_ANIMATION_OPEN_TIME_MS = 150

@customElement('mwc-dialog')
export class DialogElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  opening = false;

  @property({ type: Boolean, reflect: true })
  closing = false;

  @property({ type: Boolean, reflect: true })
  opened = false;

  @property({ type: Boolean, reflect: true })
  scrollable = false;

  @property({ type: Boolean, reflect: true })
  stacked = false;

  @property({ type: String })
  title: string

  @query('#dialog')
  dialogElement: HTMLDivElement

  @query('#content')
  contentElement: HTMLDivElement

  @query('slot[name="action"]')
  actionSlot: HTMLSlotElement

  private actionElements_: Node[] = []
  private animationFrame_ = 0

  constructor() {
    super()
    this.close = this.close.bind(this)
  }

  async open() {
    this.opening = true
    // notifyOpening

    await this.updateComplete

    this.opened = true
    this.layout_()

    window.setTimeout(() => {
      this.opening = false
    }, DIALOG_ANIMATION_OPEN_TIME_MS);

    // TODO: lock body scrolling when dialog open
    // body { overflow: hidden; }
  }

  async close() {
    if (!this.opened) {
      return
    }
    this.opened = false
    this.closing = true

    await this.updateComplete

    window.setTimeout(() => {
      this.closing = false
    }, DIALOG_ANIMATION_CLOSE_TIME_MS);
  }

  firstUpdated(changedProperties: PropertyValues) {
    this.actionSlot.addEventListener('slotchange', e => this.actionSlotChanged_(e))
  }

  private actionSlotChanged_(e: Event) {
    this.actionElements_.forEach(node => node.removeEventListener('click', this.close))
    this.actionElements_ = this.actionSlot.assignedNodes().filter(node => node.nodeType === 1)
    this.actionElements_.forEach(node => node.addEventListener('click', this.close))
  }

  private layout_() {
    /*
    if (this.autoStackButtons_) {
      this.detectStackedButtons_()
    }
    */
    this.detectScrollableContent_()
  }

  private detectScrollableContent_() {
    this.scrollable = isScrollable(this.contentElement)
  }

  static get styles() {
    return [
      defaultCSS,
      elevationCSS,
      css`
#dialog,
#scrim {
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

#dialog {
  display: none;
  z-index: 7;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  transform: scale(0.8);
  opacity: 0;
}

#surface {
  box-shadow: var(--elevation-24);
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  max-width: 100%;
  min-width: 280px;
  max-height: calc(100vh - 32px);
  border-radius: 4px;
  background-color: var(--mdc-theme-surface, #fff);
}

#title {
  color: rgba(0, 0, 0, 0.87);
  display: block;
  margin-top: 0;
  line-height: normal;
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  text-decoration: inherit;
  text-transform: inherit;
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0 24px 9px;
  border-bottom: 1px solid transparent;
}

/* WTF? */
#title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}

:host([scrollable]) #title {
  padding-bottom: 15px;
}

#content {
  color: rgba(0, 0, 0, 0.6);
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03125em;
  text-decoration: inherit;
  text-transform: inherit;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 24px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}


#content ::slotted(:first-child) {
  margin-top: 0;
}
#content ::slotted(:last-child) {
  margin-bottom: 0;
}

#title + #content {
  padding-top: 0;
}

:host([scrollable]) #content {
  padding-top: 8px;
  padding-bottom: 8px;
}

/*
#content .mdc-list:first-child:last-child {
  padding: 6px 0 0;
}

:host([scrollable]) #content .mdc-list:first-child:last-child {
  padding: 0;
}
*/

:host([scrollable]) #title,
:host([scrollable]) footer {
  border-color: rgba(0, 0, 0, 0.12);
}

footer {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  padding: 8px;
  border-top: 1px solid transparent;
}
:host([stacked]) footer {
  flex-direction: column;
  align-items: flex-end;
}

slot[name="action"]::slotted(*) {
  margin-left: 8px;
  margin-right: 0;
  max-width: 100%;
  text-align: right;
}
slot[name="action"]::slotted(:first-child) {
  margin-left: 0;
  margin-right: 0;
}

:host([stacked]) slot[name="action"]::slotted(:not(:first-child)) {
  margin-top: 12px;
}

#scrim {
  opacity: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.32);
}

@media (max-width: 592px) {
  #surface {
    max-width: calc(100vw - 32px);
  }
}
@media (min-width: 592px) {
  #surface {
    max-width: 560px;
  }
}

:host([opened]) #dialog,
:host([opening]) #dialog,
:host([closing]) #dialog{
  display: flex;
}

:host([opening]) #scrim {
  transition: opacity 150ms linear;
}
:host([opening]) #container {
  transition: opacity 75ms linear,
              transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
}

:host([closing]) #scrim,
:host([closing]) #container {
  transition: opacity 75ms linear;
}
:host([closing]) #container {
  transform: scale(1);
}

:host([opened]) #scrim {
  opacity: 1;
}
:host([opened]) #container {
  transform: scale(1);
  opacity: 1;
}
`
    ]
  }

  render() {
    return html`
<div id="dialog"
     role="alertdialog"
     aria-modal="true"
     aria-labelledby="title"
     aria-describedby="content">
  <div id="container">
    <div id="surface">
      <h2 id="title">${this.title}</h2>
      <div id="content"><slot></slot></div>
      <footer><slot name="action"></slot></footer>
    </div>
  </div>
  <div id="scrim" @click=${this.close}></div>
</div>`
  }
}
