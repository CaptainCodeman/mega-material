/* eslint-disable max-classes-per-file */
import { LitElement, html, css, PropertyDeclarations, CSSResult, CSSResultArray } from 'lit-element'
import './icon'
import './ripple'
import { elevationCSS } from './styles'
import { themable, theme } from './utils/themable'

declare global {
  interface HTMLElementTagNameMap {
    'mega-chip-set': typeof ChipSetElement
    'mega-chip': typeof ChipElement
  }
}

type InputTypes = 'radio' | 'checkbox' | 'button'

export class ChipSetElement extends LitElement {
  private inputs: NodeListOf<HTMLInputElement>

  static get styles() {
    return [
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
      themable('mega-chip-set'),
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
      const chipElement = input.parentElement as ChipElement
      if (chipElement instanceof ChipElement === false) {
        throw new TypeError('<input> must be a direct child of <mega-chip>')
      }

      const type = input.type as InputTypes
      if (type === 'radio' || type === 'checkbox') chipElement.selected = input.checked
      chipElement.focused = document.activeElement === input
      chipElement.type = type
    })
  }

  render() {
    return html`
      <div><slot></slot></div>
    `
  }
}

export class ChipElement extends LitElement {
  type: InputTypes

  disabled = false

  raised = false

  focused = false

  selected = false

  private hasVisual = false

  theme: 'light' | 'dark' = 'light'

  private mutationObserver: MutationObserver

  static properties: PropertyDeclarations = {
    type: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    raised: { type: Boolean, reflect: true },
    focused: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
    hasVisual: { type: Boolean, reflect: true, attribute: 'has-visual' },
    theme: { type: String, reflect: true },
  }

  static get styles() {
    return [
      elevationCSS,
      css`
        :host {
          -webkit-tap-highlight-color: transparent;
          will-change: transform, opacity, box-shadow;
          border-radius: 16px;
          height: 32px;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.01786em;
          text-decoration: inherit;
          text-transform: inherit;
          position: relative;
          overflow: hidden;
          box-shadow: var(--elevation-00);
          transition: var(--elevation-transition);
        }
        :host(:active:not([disabled])) {
          box-shadow: var(--elevation-03);
        }

        mega-ripple {
          border-radius: inherit;
          white-space: nowrap;
          display: flex;
          position: relative;
          align-items: center;
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
        }

        :host([type='checkbox'][selected]) .checkmark {
          width: 21px;
        }

        :host([type='checkbox'][selected]) .checkmark path {
          stroke-dashoffset: 0;
        }

        slot[name='visual']::slotted(*) {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin: -3px -1px -7px 4px;
          border-radius: calc(24px / 2);
        }
        slot[name='visual']::slotted(mega-icon) {
          --mega-icon-size: 18px;
          width: 18px;
          height: 18px;
          margin: -2px -2px -4px 7px;
        }

        :host(:not([type='radio'])[has-visual]) .checkmark {
          height: 17px;
          position: absolute;
          left: -3px;
          top: 8.5px;
        }
        :host(:not([type='radio'])[has-visual]) .checkmark path {
          stroke-width: 2.5px;
        }
      `,
      themable('mega-chip'),
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
  }

  protected slotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasVisual = slot.assignedNodes().length > 0
  }

  render() {
    return html`
      <mega-ripple ?disabled=${this.disabled} ?primary=${this.type === 'radio'}>
        <slot name="visual" @slotchange=${this.slotChange}></slot>
        <svg viewBox="-4 -4 30 30" class="checkmark">
          <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" part="path" />
        </svg>
        <span class="text"><slot></slot></span>
      </mega-ripple>
    `
  }
}

/* theme=light */
theme(
  'mega-chip',
  css`
    /* type=* */
    :host([theme='light']) {
      background-color: rgba(0, 0, 0, 0.12);
      color: rgba(0, 0, 0, 0.6);
    }
    :host([theme='light'][disabled]) {
      background-color: rgba(0, 0, 0, 0.043);
      color: rgba(0, 0, 0, 0.3);
    }
    :host([theme='light']:hover:not([disabled]):not([selected])) {
      background-color: rgba(0, 0, 0, 0.16);
      color: rgba(0, 0, 0, 0.81);
    }

    :host([theme='light'][focused]:not([disabled]):not([selected])) {
      background-color: rgba(0, 0, 0, 0.22);
      color: rgba(0, 0, 0, 0.86);
    }

    :host([theme='light']:active:not([disabled]):not([selected])) {
      color: rgba(0, 0, 0, 0.86);
    }

    /* type=radio */
    :host([theme='light'][type='radio'][selected]) {
      color: var(--mega-theme-primary, #6200ee);
      background-color: rgba(227, 213, 255, 0.976);
    }
    :host([theme='light'][type='radio'][selected]):hover {
      color: var(--mega-theme-primary, #6200ee);
    }

    /* type=checkbox */
    :host([theme='light']:not([type='radio'])[selected]) {
      background-color: rgba(0, 0, 0, 0.23);
      color: rgba(0, 0, 0, 1);
    }

    :host([theme='light']) .checkmark path {
      stroke: rgba(0, 0, 0, 1);
    }
  `,
)

/* theme=dark */
theme(
  'mega-chip',
  css`
    /* type=* */
    :host([theme='dark']) {
      background-color: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.6);
    }
    :host([theme='dark'][disabled]) {
      background-color: rgba(255, 255, 255, 0.043);
      color: rgba(255, 255, 255, 0.3);
    }
    :host([theme='dark']:hover:not([disabled]):not([selected])) {
      background-color: rgba(255, 255, 255, 0.16);
      color: rgba(255, 255, 255, 0.81);
    }
    :host([theme='dark'][focused]:not([disabled]):not([selected])) {
      background-color: rgba(255, 255, 255, 0.22);
      color: rgba(255, 255, 255, 0.86);
    }
    :host([theme='dark']:active:not([disabled]):not([selected])) {
      color: rgba(255, 255, 255, 0.86);
    }

    /* type=radio */
    :host([theme='dark'][type='radio'][selected]) {
      color: var(--mega-theme-primary, #6200ee);
      background-color: rgba(227, 213, 255, 0.976);
    }
    :host([theme='dark'][type='radio'][selected]):hover {
      color: var(--mega-theme-primary, #6200ee);
    }

    /* type=checkbox */
    :host([theme='dark']:not([type='radio'])[selected]) {
      background-color: rgba(255, 255, 255, 0.23);
      color: rgba(255, 255, 255, 1);
    }

    :host([theme='dark']) .checkmark path {
      stroke: rgba(255, 255, 255, 1);
    }
  `,
)

window.customElements.define('mega-chip-set', ChipSetElement)
window.customElements.define('mega-chip', ChipElement)
