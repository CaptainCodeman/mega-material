import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './icon'
import './ripple'
import { defaultCSS } from './styles';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-chip-set': ChipSetElement;
  }
}

@customElement('mwc-chip-set')
export class ChipSetElement extends LitElement {
  @property({ type: String, reflect: true })
  type = '';  // choice | filter | input

  static get styles() {
    return [
      defaultCSS,
      css`
:host {
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

::slotted(mdc-chip) {
  margin: 4px;
}

:host([type="input"]) ::slotted(mdc-chip) {
  animation: mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1);
}
`
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}

@customElement('mwc-chip')
export class ChipElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: String, reflect: true })
  icon = '';

  @property({ type: Boolean, reflect: true, attribute: 'trailing-icon' })
  trailingIcon = '';

  @property({ type: String, reflect: true })
  checkmark = '';

  static get styles() {
    return [
      defaultCSS,
      css`
@keyframes mdc-ripple-fg-radius-in {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);
  }
  to {
    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
  }
}

@keyframes mdc-ripple-fg-opacity-in {
  from {
    animation-timing-function: linear;
    opacity: 0; }
  to {
    opacity: var(--mdc-ripple-fg-opacity, 0);
  }
}

@keyframes mdc-ripple-fg-opacity-out {
  from {
    animation-timing-function: linear;
    opacity: var(--mdc-ripple-fg-opacity, 0); }
  to {
    opacity: 0;
  }
}

:host {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: transparent;
  will-change: transform, opacity;
  border-radius: 16px;
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
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
}

mwc-ripple {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding: 7px 12px;

  line-height: 17px;
  white-space: nowrap;
  display: inline-flex;
  position: relative;
  align-items: center;
}

:host([selected]) {
  color: var(--mdc-theme-primary, #6200ee);
}

:host([selected]):hover {
  color: var(--mdc-theme-primary, #6200ee);
}

path {
  stroke: var(--mdc-theme-primary, #6200ee);
}

slot[name="icon"]::slotted(*) {
  color: rgba(0, 0, 0, 0.54);
}

:host:hover slot[name="icon"]::slotted(*) {
  color: rgba(0, 0, 0, 0.62);
}

:host:focus slot[name="icon"]::slotted(*) {
  color: rgba(0, 0, 0, 0.87);
}

.mdc-chip .mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden) {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.mdc-chip .mdc-chip__icon.mdc-chip__icon--trailing {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

:host:hover {
  color: var(--mdc-theme-on-surface, #000);
}

.mdc-chip--exit {
  transition: opacity 75ms cubic-bezier(0.4, 0, 0.2, 1),
              width 150ms cubic-bezier(0, 0, 0.2, 1),
              padding 100ms linear,
              margin 100ms linear;
  opacity: 0;
}

:host([selected]) {
  background-color: var(--mdc-theme-surface, #fff);
}

slot[name="checkmark"] {
  border-radius: 50%;
  outline: none;
  vertical-align: middle;
}

.mdc-chip__icon--trailing {
  margin: 0 -4px 0 4px;
}

slot[name="checkmark"]::sloted(*),
slot[name="icon"]::sloted(*) {
  height: 20px;
  margin: -4px 4px -4px -4px;
}

path {
  transition: stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke-width: 2px;
  stroke-dashoffset: 29.78334;
  stroke-dasharray: 29.78334;
}

:host([selected]) path {
  stroke-dashoffset: 0;
}

svg {
  width: 0;
  height: 20px;
  transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

:host([selected]) svg {
  width: 20px;
}

.mdc-chip__icon--leading {
  transition: opacity 75ms linear;
  opacity: 1;
}

.mdc-chip__icon--leading + slot[name="checkmark"] {
  transition: opacity 75ms linear;
  opacity: 0;
}

.mdc-chip__icon--leading + slot[name="checkmark"]::slotted(*) {
  transition: width 0ms;
}

:host([selected]) .mdc-chip__icon--leading {
  opacity: 0;
}

:host([selected]) .mdc-chip__icon--leading + slot[name="checkmark"] {
  width: 0;
  opacity: 1;
}

.mdc-chip__icon--leading-hidden.mdc-chip__icon--leading {
  width: 0;
  opacity: 0;
}

.mdc-chip__icon--leading-hidden.mdc-chip__icon--leading + slot[name="checkmark"] {
  width: 20px;
}

@keyframes mdc-chip-entry {
  from {
    transform: scale(0.8);
    opacity: .4;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}`
    ]
  }

  render() {
    return html`
<mwc-ripple>
  <slot name="icon"><mwc-icon>${this.icon}</mwc-icon></slot>
  <slot name="checkmark">
    <svg viewBox="-2 -3 30 30">
      <path fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
  </slot>
  <slot></slot>
</mwc-ripple>
`
  }
}
