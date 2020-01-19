/* eslint-disable max-classes-per-file */
import { LitElement, html, customElement, css, property, Constructor } from 'lit-element'
import './icon'
import './ripple'
import { nothing } from 'lit-html'
import { defaultCSS, elevationCSS } from './styles'
import { withThemable } from './utils/themable'

type InputTypes = 'radio' | 'checkbox'

function isChip(chip: unknown): chip is typeof ChipElement {
  return chip instanceof ChipElementBase
}

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
      const chipElement = (input.parentElement as unknown) as Constructor<typeofChipElement>
      // if (!isChip(chipElement)) {
      //   throw new TypeError('<input> must be a direct child of <chip-element>')
      // }

      // if () {
      //
      // }

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

  private mutationObserver: MutationObserver

  // @property({ type: String, reflect: true })
  // text = ''

  // @property({ type: String, reflect: true })
  // icon = ''

  // @property({ type: Boolean, reflect: true, attribute: 'trailing-icon' })
  // trailingIcon = ''

  // @property({ type: String, reflect: true })
  // checkmark = ''

  static get styles() {
    return [
      defaultCSS,
      elevationCSS,
      css`
        /* @keyframes mega-ripple-fg-radius-in {
          from {
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1);
          }
          to {
            transform: translate(var(--mega-ripple-fg-translate-end, 0))
              scale(var(--mega-ripple-fg-scale, 1));
          }
        }

        @keyframes mega-ripple-fg-opacity-in {
          from {
            animation-timing-function: linear;
            opacity: 0;
          }
          to {
            opacity: var(--mega-ripple-fg-opacity, 0);
          }
        }

        @keyframes mega-ripple-fg-opacity-out {
          from {
            animation-timing-function: linear;
            opacity: var(--mega-ripple-fg-opacity, 0);
          }
          to {
            opacity: 0;
          }
        } */

        :host {
          --mega-ripple-fg-size: 0;
          --mega-ripple-left: 0;
          --mega-ripple-top: 0;
          --mega-ripple-fg-scale: 1;
          --mega-ripple-fg-translate-end: 0;
          --mega-ripple-fg-translate-start: 0;
          -webkit-tap-highlight-color: transparent;
          will-change: transform, opacity, box-shadow;
          border-radius: 16px;
          background-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.6);
          font-family: Roboto, sans-serif;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.01786em;
          text-decoration: inherit;
          text-transform: inherit;
          display: inline-flex;
          position: relative;
          align-items: center;
          outline: none;
          cursor: pointer;
          overflow: hidden;
          box-shadow: var(--elevation-00);
          transition: var(--elevation-transition);
        }

        mega-ripple {
          width: 100%;
          height: 100%;
          border-radius: inherit;
          padding: 6px 12px 5px;

          line-height: 21px;
          white-space: nowrap;
          display: inline-flex;
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

        :host(:active:not([disabled]):not([selected])) {
          box-shadow: var(--elevation-03);
          color: rgba(0, 0, 0, 0.86);
        }

        :host([selected]) {
          color: var(--mega-theme-primary, #6200ee);
          background-color: rgba(227, 213, 255, 0.976);
        }
        :host([selected]):hover {
          color: var(--mega-theme-primary, #6200ee);
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

  render() {
    return html`
      <mega-ripple ?disabled=${this.disabled} primary>
        ${this.icon
          ? html`
              <slot name="icon"><mega-icon>${this.icon}</mega-icon></slot>
            `
          : nothing}
        ${this.type !== 'radio'
          ? html`
              <slot name="checkmark">
                <svg viewBox="-6 -7 30 30">
                  <path fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
              </slot>
            `
          : nothing}
        <slot></slot>
      </mega-ripple>
    `
  }
}


@customElement('mega-chip-set');
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
