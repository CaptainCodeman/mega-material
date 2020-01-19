/* eslint-disable max-classes-per-file */
import { LitElement, html, customElement, css, property, svg } from 'lit-element'
import './icon'
import './ripple'
import { nothing } from 'lit-html'
import { defaultCSS, elevationCSS } from './styles'

type InputTypes = 'radio' | 'checkbox'

class ChipSetElementBase extends LitElement {
  private inputs: NodeListOf<HTMLInputElement>

  static get styles() {
    return [
      defaultCSS,
      css`
        :host {
          display: flex;
          flex: 1;

          padding: 4px;
          box-sizing: border-box;
          overflow-x: auto; /* @TODO add prev next buttons, add breakout that it can scroll to the absolute edge. */
        }
        div {
          min-height: min-content;
          display: flex;
        }

        ::slotted(mega-chip) {
          margin-right: 4px;
        }

        :host([type='input']) ::slotted(mega-chip) {
          animation: mega-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1);
        }
      `,
    ]
  }

  firstUpdated() {
    this.inputs = this.querySelectorAll<HTMLInputElement>('input')
    this.inputs.forEach(input => {
      input.addEventListener('change', this.recalcSelectedState, { passive: true })
      input.addEventListener('focus', this.recalcSelectedState, { passive: true })
      input.addEventListener('blur', this.recalcSelectedState, { passive: true })
    })
    this.recalcSelectedState()
  }

  disconnectedCallback() {
    this.inputs = this.querySelectorAll<HTMLInputElement>('input')
    this.inputs.forEach(input => {
      input.removeEventListener('change', this.recalcSelectedState)
      input.removeEventListener('focus', this.recalcSelectedState)
      input.removeEventListener('blur', this.recalcSelectedState)
    })
  }

  /**
   * We recalc this from the parent instead of directly on the child because
   * an input[type=radio] only fires when selected.
   */
  recalcSelectedState = () => {
    this.inputs.forEach(input => {
      const chipElement = input.parentElement as ChipElementBase
      if (chipElement instanceof ChipElementBase === false) {
        throw new TypeError('<input> must be a direct child of <chip-element>')
      }

      chipElement.selected = input.checked
      chipElement.focused = document.activeElement === input
      chipElement.type = input.type as InputTypes
    })
  }

  render() {
    return html`
      <div><slot></slot></div>
    `
  }
}

class ChipElementBase extends LitElement {
  @property({ type: String, reflect: true })
  type: InputTypes

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  raised = false

  @property({ type: Boolean, reflect: true })
  focused = false

  @property({ type: Boolean, reflect: true })
  selected = false

  @property({ type: Boolean, reflect: true, attribute: 'has-visual' })
  private hasVisual = false

  private mutationObserver: MutationObserver

  // @property({ type: Boolean, reflect: true, attribute: 'trailing-icon' })
  // trailingIcon = ''

  static get styles() {
    return [
      defaultCSS,
      elevationCSS,
      css`
        :host {
          -webkit-tap-highlight-color: transparent;
          will-change: transform, opacity, box-shadow;
          border-radius: 16px;
          height: 32px;
          background-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.01786em;
          text-decoration: inherit;
          text-transform: inherit;
          position: relative;
          /* outline: none; */
          cursor: pointer;
          overflow: hidden;
          box-shadow: var(--elevation-00);
          transition: var(--elevation-transition);
        }

        mega-ripple {
          border-radius: inherit;
          white-space: nowrap;
          display: flex;
          position: relative;
          align-items: center;
        }

        :host([disabled]) {
          background-color: rgba(0, 0, 0, 0.043);
          color: rgba(0, 0, 0, 0.3);
        }
        :host(:hover:not([disabled]):not([selected])) {
          background-color: rgba(0, 0, 0, 0.16);
          color: rgba(0, 0, 0, 0.81);
        }

        :host([focused]:not([disabled]):not([selected])) {
          background-color: rgba(0, 0, 0, 0.22);
          color: rgba(0, 0, 0, 0.86);
        }

        :host(:active:not([disabled])) {
          box-shadow: var(--elevation-03);
        }
        :host(:active:not([disabled]):not([selected])) {
          color: rgba(0, 0, 0, 0.86);
        }

        /* Make the input the complete clickable area of the parent, handles focus, checked, etc. */
        :host ::slotted(input) {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          display: block;
          margin: 0;
          padding: 0;
        }
        :host(:not([disabled])) ::slotted(input) {
          cursor: pointer;
        }

        /* https://material.io/components/chips/#specs */
        .text {
          padding: 0 12px 0 4px; /* 12 minus the svg margin */
        }
        .checkmark {
          height: 21px;
          margin: -2px -2px -5px 8px;
          width: 0;
          transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .checkmark path {
          transition: stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);
          stroke-width: 2px;
          stroke-dashoffset: 29.78334;
          stroke-dasharray: 29.78334;
          stroke: black;
        }

        /* type=radio */
        :host([type='radio'][selected]) {
          color: var(--mega-theme-primary, #6200ee);
          background-color: rgba(227, 213, 255, 0.976);
        }
        :host([type='radio'][selected]):hover {
          color: var(--mega-theme-primary, #6200ee);
        }

        /* type=checkbox */
        :host([type='checkbox'][selected]) {
          background-color: rgba(0, 0, 0, 0.23);
          color: rgba(0, 0, 0, 1);
        }

        :host([type='checkbox'][selected]) .checkmark {
          width: 21px;
        }

        :host([type='checkbox'][selected]) .checkmark path {
          stroke-dashoffset: 0;
        }

        slot[name='left-visual']::slotted(*) {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin: -3px -1px -7px 4px;
          border-radius: calc(24px / 2);
        }

        :host([type='checkbox'][has-visual]) .checkmark {
          height: 17px;
          position: absolute;
          left: -3px;
          top: 8.5px;
        }
        :host([type='checkbox'][has-visual]) .checkmark path {
          stroke-width: 2.5px;
        }

        @keyframes mega-chip-entry {
          from {
            transform: scale(0.8);
            opacity: 0.4;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `,
    ]
  }

  connectedCallback() {
    super.connectedCallback()
    this.mutationObserver = new MutationObserver(this.updateState.bind(this))
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    })
    this.updateState()
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect()
    super.disconnectedCallback()
  }

  protected updateState() {
    const input = this.querySelector('input')
    if (!input) {
      return
    }

    this.disabled = input.disabled
    this.selected = input.checked
  }

  protected slotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasVisual = slot.assignedNodes().length > 0
  }

  render() {
    return html`
      <mega-ripple ?disabled=${this.disabled} ?primary=${this.type === 'radio'}>
        <slot name="left-visual" @slotchange=${this.slotChange}></slot>
        <svg viewBox="-4 -4 30 30" class="checkmark">
          <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" part="path" />
        </svg>
        <span class="text"><slot></slot></span>
        <!-- <slot name="right-visual"></slot> -->
      </mega-ripple>
    `
  }
}

@customElement('mega-chip-set')
class ChipSetElement extends ChipSetElementBase {}

// const ChipSetElement = withThemable(ChipSetElementBase
// window.customElements.define('mega-chip-set', ChipSetElement)

@customElement('mega-chip')
class ChipElement extends ChipElementBase {}

declare global {
  interface HTMLElementTagNameMap {
    'mega-chip-set': typeof ChipSetElement
  }
}

export { ChipSetElement, ChipElement }
