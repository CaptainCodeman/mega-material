import { LitElement, html, customElement, css, property, query } from 'lit-element';

import './ripple'

declare global {
  interface HTMLElementTagNameMap {
    'mwc-checkbox': CheckboxElement;
  }
}

@customElement('mwc-checkbox')
export class CheckboxElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: Boolean, reflect: true })
  indeterminate = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: String })
  value = ''

  @query('input')
  protected formElement!: HTMLInputElement;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  changeHandler_() {
    this.checked = this.formElement.checked;
    this.indeterminate = this.formElement.indeterminate;
  }

  // TODO
  // https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/foundation.ts

  static get styles() {
    return [
      css`
@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: mdc-animation-deceleration-curve-timing-function;
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}

:host {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  padding: 11px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  outline: none;
}

input:enabled:not(:checked):not(:indeterminate) ~ .background {
  border-color: rgba(0, 0, 0, 0.54);
  background-color: transparent;
}

input:enabled:checked ~ .background,
input:enabled:indeterminate ~ .background {
  border-color: var(--mdc-theme-secondary, #018786);
  background-color: var(--mdc-theme-secondary, #018786);
}

@keyframes mdc-checkbox-fade-in-background-0 {
  0% {
    border-color: rgba(0, 0, 0, 0.54);
    background-color: transparent;
  }
  50% {
    border-color: var(--mdc-theme-secondary, #018786);
    background-color: var(--mdc-theme-secondary, #018786);
  }
}
@keyframes mdc-checkbox-fade-out-background-0 {
  0%, 80% {
    border-color: var(--mdc-theme-secondary, #018786);
    background-color: var(--mdc-theme-secondary, #018786);
  }
  100% {
    border-color: rgba(0, 0, 0, 0.54);
    background-color: transparent;
  }
}
.mdc-checkbox--anim-unchecked-checked input:enabled ~ .background, :host([indeterminate]:not([checked])) input:enabled ~ .background {
  animation-name: mdc-checkbox-fade-in-background-0;
}
.mdc-checkbox--anim-checked-unchecked input:enabled ~ .background, :host(:not([checked])) input:enabled ~ .background {
  animation-name: mdc-checkbox-fade-out-background-0;
}

.checkmark {
  color: #fff;
}

.mixedmark {
  border-color: #fff;
}

.background::before {
  background-color: #018786;
}

input:disabled:not(:checked):not(:indeterminate) ~ .background {
  border-color: rgba(0, 0, 0, 0.26);
}

input:disabled:checked ~ .background,
input:disabled:indeterminate ~ .background {
  border-color: transparent;
  background-color: rgba(0, 0, 0, 0.26);
}

@media screen and (-ms-high-contrast: active) {
  .mixedmark {
    margin: 0 1px;
  }
}
.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.background {
  left: 11px;
  right: initial;
  display: inline-flex;
  position: absolute;
  top: 11px;
  bottom: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 45%;
  height: 45%;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
              border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox[dir=rtl] .background, [dir=rtl] .mdc-checkbox .background {
  left: initial;
  right: 11px;
}

.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox--upgraded .checkmark {
  opacity: 1;
}

path {
  transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
            transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}

.mdc-checkbox--upgraded .background,
.mdc-checkbox--upgraded .checkmark,
.mdc-checkbox--upgraded path,
.mdc-checkbox--upgraded .mixedmark {
  transition: none !important;
}

.mdc-checkbox--anim-unchecked-checked .background, :host([indeterminate]:not([checked])) .background, .mdc-checkbox--anim-checked-unchecked .background, :host(:not([checked])) .background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}
.mdc-checkbox--anim-unchecked-checked path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;
  transition: none;
}
:host([indeterminate]:not([checked])) .mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;
  transition: none;
}
.mdc-checkbox--anim-checked-unchecked path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;
  transition: none;
}
:host([checked][indeterminate]) .checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;
  transition: none;
}
:host([checked][indeterminate]) .mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;
  transition: none;
}
:host([checked]) .checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;
  transition: none;
}
:host([checked]) .mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;
  transition: none;
}
:host(:not([checked])) .mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;
  transition: none;
}

input:checked ~ .background,
input:indeterminate ~ .background {
  transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),
          background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);
}
input:checked ~ .background path,
input:indeterminate ~ .background path {
  stroke-dashoffset: 0;
}

.background::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0, 0);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  will-change: opacity, transform;
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
            transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}

input:focus ~ .background::before {
  transform: scale(2.75, 2.75);
  opacity: 0.12;
  transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),
            transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)l
}

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
}
input:disabled {
  cursor: default;
  pointer-events: none;
}

input:checked ~ .background .checkmark {
  transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
            transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
input:checked ~ .background .mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

input:indeterminate ~ .background .checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
            transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}
input:indeterminate ~ .background .mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

/* ripple?
.mdc-checkbox {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
}
.mdc-checkbox::before, .mdc-checkbox::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}
.mdc-checkbox::before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
}

.mdc-checkbox::before, .mdc-checkbox::after {
  background-color: #018786;
}
.mdc-checkbox:hover::before {
  opacity: 0.04;
}
.mdc-checkbox::before, .mdc-checkbox::after {
  top: calc(50% - 50%);
  left: calc(50% - 50%);
  width: 100%;
  height: 100%;
}
*/`
    ]
  }

  render() {
    return html`

<input type="checkbox"
      @change=${this.changeHandler_}
      .indeterminate=${this.indeterminate}
      .checked=${this.checked}
      .disabled=${this.disabled}
      .value=${this.value}>
<div class="background">
  <svg class="checkmark" viewBox="0 0 24 24">
    <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
  </svg>
  <div class="mixedmark"></div>
</div>`
  }
}
