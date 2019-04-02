import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-notched-outline': NotchedOutlineElement;
  }
}

@customElement('mwc-notched-outline')
export class NotchedOutlineElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  notch: boolean

  @property({ type: Number, attribute: 'notch-width' })
  notchWidth: number

  @property({ type: Boolean, reflect: true })
  disabled: boolean

  static get styles() {
    return [
      hiddenStyle,
      css`
:host {
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
  outline: none;
  contain: content;
}
.leading, .notch, .trailing {
  box-sizing: border-box;
  height: 100%;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid;
  border-bottom: 1px solid;
  pointer-events: none;
}
.leading {
  border-left: 1px solid;
  border-right: none;
  width: 12px;
}
.trailing {
  border-left: none;
  border-right: 1px solid;
  flex-grow: 1;
}
.notch {
  flex: 0 0 auto;
  width: auto;
  max-width: calc(100% - 12px * 2);
}

::slotted(label) {
  display: inline-block;
  position: relative;
  top: 17px;
  bottom: auto;
  max-width: 100%;
}

::slotted(.float-above) {
  text-overflow: clip;
  max-width: calc(100% / .75);
}

.notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}

:host(:not([notch])) .notch {
  padding: 0;
}

:host(:not(:disabled)) .leading,
:host(:not(:disabled)) .notch,
:host(:not(:disabled)) .trailing {
  border-color: rgba(0, 0, 0, 0.24);
}

:host(:not(:disabled):not(:focus):hover) .leading,
:host(:not(:disabled):not(:focus):hover) .notch,
:host(:not(:disabled):not(:focus):hover) .trailing {
  border-color: rgba(0, 0, 0, 0.87);
}

:host(:not(:disabled):focus) .leading,
:host(:not(:disabled):focus) .notch,
:host(:not(:disabled):focus) .trailing {
  border-color: var(--mdc-theme-primary, #6200ee);
}

.mdc-text-field--outlined .mdc-floating-label--shake {
  animation: mdc-floating-label-shake-float-above-text-field-outlined 250ms 1;
}
.leading {
  border-radius: 4px 0 0 4px;
}
.trailing {
  border-radius: 0 4px 4px 0;
}

.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-144%) scale(1);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: 0.75rem;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-130%) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

:host(:focus) .leading,
:host(:focus) .notch,
:host(:focus) .trailing {
  border-width: 2px;
}

:host(:disabled) {
  background-color: transparent;
}
:host(:disabled) .leading,
:host(:disabled) .notch,
:host(:disabled) .trailing {
  border-color: rgba(0, 0, 0, 0.06);
}

.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-120%) scale(0.8);
}
.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-130%) translateX(-32px) scale(0.75);
}

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-120%) translateX(-21px) scale(0.8);
}

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,
.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

`

// TODO: use :focus-within to decide focus
    ]
  }

  render() {
    return html`
<div class="leading"></div>
<div class="notch"><slot></slot></div>
<div class="trailing"></div>
`
  }
}
