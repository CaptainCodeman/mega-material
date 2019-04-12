import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import { defaultCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-textfield': TextFieldElement;
  }
}

@customElement('mwc-textfield')
export class TextFieldElement extends LitElement {
  @property({ type: String })
  type: string = 'text'

  @property({ type: String })
  value: string = ''

  @property({ type: String })
  placeholder: string = ''

  @property({ type: String })
  label: string = ''

  @property({ type: String })
  icon: string = ''

  @property({ type: String, attribute: 'icon-trailing' })
  iconTrailing: string = ''

  @property({ type: String })
  prefix: string = ''

  @property({ type: String })
  suffix: string = ''

  @property({ type: String, attribute: 'helper-text' })
  helperText: string = ''

  @property({ type: String })
  error: string = ''

  @property({ type: Boolean, reflect: true })
  box = false

  @property({ type: Boolean, reflect: true })
  outlined = false

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false

  @property({ type: Boolean, reflect: true })
  counter = false

  @property({ type: Boolean, reflect: true, attribute: 'multi-line' })
  multiLine = false

  @property({ type: Boolean, reflect: true })
  disabled = false  // true = readonly ?

  @property({ type: Boolean, reflect: true })
  required = false

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static get styles() {
    return [
      defaultCSS,
      css`
label {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  position: absolute;
  bottom: 8px;
  left: 0;
  -webkit-transform-origin: left top;
          transform-origin: left top;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1.15rem;
  cursor: text;
}

label[above] {
  cursor: auto;
}

label[above] {
  -webkit-transform: translateY(-100%) scale(0.75);
          transform: translateY(-100%) scale(0.75); }

label[shake] {
  -webkit-animation: mdc-floating-label-shake-float-above-standard 250ms 1;
          animation: mdc-floating-label-shake-float-above-standard 250ms 1; }

@-webkit-keyframes mdc-floating-label-shake-float-above-standard {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); } }

@keyframes mdc-floating-label-shake-float-above-standard {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); } }

mdc-line-ripple {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  -webkit-transform: scaleX(0);
          transform: scaleX(0);
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: 2; }

mdc-line-ripple[active] {
  -webkit-transform: scaleX(1);
          transform: scaleX(1);
  opacity: 1; }

mdc-line-ripple[deactivating] {
  opacity: 0; }

.outline {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 1px);
  height: calc(100% - 2px);
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  overflow: hidden; }
.outline svg {
    position: absolute;
    width: 100%;
    height: 100%; }

.outline-idle {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid;
  opacity: 1; }

.mdc-notched-outline__path {
  stroke-width: 1px;
  transition: stroke 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);
  fill: transparent; }

.mdc-notched-outline--notched {
  opacity: 1; }

.mdc-notched-outline--notched ~ .mdc-notched-outline__idle {
  opacity: 0; }

@-webkit-keyframes mdc-ripple-fg-radius-in {
  from {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);
            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }
  to {
    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }

@keyframes mdc-ripple-fg-radius-in {
  from {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);
            transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }
  to {
    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }

@-webkit-keyframes mdc-ripple-fg-opacity-in {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: 0; }
  to {
    opacity: var(--mdc-ripple-fg-opacity, 0); } }

@keyframes mdc-ripple-fg-opacity-in {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: 0; }
  to {
    opacity: var(--mdc-ripple-fg-opacity, 0); } }

@-webkit-keyframes mdc-ripple-fg-opacity-out {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: var(--mdc-ripple-fg-opacity, 0); }
  to {
    opacity: 0; } }

@keyframes mdc-ripple-fg-opacity-out {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: var(--mdc-ripple-fg-opacity, 0); }
  to {
    opacity: 0; } }

.mdc-ripple-surface--test-edge-var-bug {
  --mdc-ripple-surface-test-edge-var: 1px solid #000;
  visibility: hidden; }
  .mdc-ripple-surface--test-edge-var-bug::before {
    border: var(--mdc-ripple-surface-test-edge-var); }

.mdc-text-field-helper-text {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.03333em;
  text-decoration: inherit;
  text-transform: inherit;
  margin: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  will-change: opacity; }
  .mdc-text-field + .mdc-text-field-helper-text {
    margin-bottom: 8px; }

.mdc-text-field-helper-text--persistent {
  transition: none;
  opacity: 1;
  will-change: initial; }

.mdc-text-field--with-leading-icon .mdc-text-field__icon,
.mdc-text-field--with-trailing-icon .mdc-text-field__icon {
  position: absolute;
  bottom: 16px;
  cursor: pointer; }

.mdc-text-field__icon:not([tabindex]),
.mdc-text-field__icon[tabindex="-1"] {
  cursor: default;
  pointer-events: none; }

.mdc-text-field {
  display: inline-block;
  position: relative;
  margin-bottom: 8px;
  will-change: opacity, transform, color; }
  .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input {
    border-bottom-color: rgba(0, 0, 0, 0.42); }
  .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input:hover {
    border-bottom-color: rgba(0, 0, 0, 0.87); }
  .mdc-text-field .mdc-line-ripple {
    background-color: #6200ee;
    /* @alternate */
    background-color: var(--mdc-theme-primary, #6200ee); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input {
    color: rgba(0, 0, 0, 0.87); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled) + .mdc-text-field-helper-text {
    color: rgba(0, 0, 0, 0.6); }
  .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--textarea) {
    border-bottom-color: rgba(0, 0, 0, 0.12); }
  .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon {
    color: rgba(0, 0, 0, 0.54); }

.mdc-text-field__input {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  width: 100%;
  height: 30px;
  padding: 20px 0 1px;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
  background: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none; }
  .mdc-text-field__input::-webkit-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mdc-text-field__input:-ms-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mdc-text-field__input::-ms-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mdc-text-field__input::placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mdc-text-field__input:focus {
    outline: none; }
  .mdc-text-field__input:invalid {
    box-shadow: none; }
  .mdc-text-field__input:-webkit-autofill + .mdc-floating-label {
    -webkit-transform: translateY(-100%) scale(0.75);
            transform: translateY(-100%) scale(0.75);
    cursor: auto; }

.mdc-text-field--outlined {
  height: 56px;
  border: none; }
  .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__idle {
    border-color: rgba(0, 0, 0, 0.24); }
  .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__path {
    stroke: rgba(0, 0, 0, 0.24); }
  .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline__idle,
  .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline__idle {
    border-color: rgba(0, 0, 0, 0.87); }
  .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__path,
  .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__path {
    stroke: rgba(0, 0, 0, 0.87); }
  .mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__path {
    stroke: #6200ee;
    /* @alternate */
    stroke: var(--mdc-theme-primary, #6200ee); }
  .mdc-text-field--outlined .mdc-floating-label--float-above {
    -webkit-transform: translateY(-130%) scale(0.75);
            transform: translateY(-130%) scale(0.75); }
  .mdc-text-field--outlined .mdc-floating-label--shake {
    -webkit-animation: mdc-floating-label-shake-float-above-text-field-outlined 250ms 1;
            animation: mdc-floating-label-shake-float-above-text-field-outlined 250ms 1; }
  .mdc-text-field--outlined .mdc-notched-outline {
    border-radius: 4px; }
  .mdc-text-field--outlined .mdc-notched-outline__idle {
    border-radius: 4px; }
  .mdc-text-field--outlined .mdc-text-field__input {
    display: flex;
    padding: 12px;
    border: none;
    background-color: transparent;
    z-index: 1; }
  .mdc-text-field--outlined .mdc-floating-label {
    /* @noflip */
    left: 16px;
    /* @noflip */
    right: initial;
    position: absolute;
    bottom: 20px; }
  .mdc-text-field--outlined .mdc-text-field__icon {
    z-index: 2; }

.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__path {
  stroke-width: 2px; }

.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: rgba(0, 0, 0, 0.6); }

.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__idle {
  border-color: rgba(0, 0, 0, 0.06); }

.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__path {
  stroke: rgba(0, 0, 0, 0.06); }

.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  border-bottom: none; }

.mdc-text-field--outlined.mdc-text-field--dense {
  height: 48px; }
  .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above {
    -webkit-transform: translateY(-110%) scale(0.923);
            transform: translateY(-110%) scale(0.923); }
  .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake {
    -webkit-animation: mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1;
            animation: mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1; }
  .mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input {
    padding: 12px 12px 7px; }
  .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label {
    bottom: 16px; }
  .mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__icon {
    top: 12px; }

.mdc-text-field--box {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  border-radius: 4px 4px 0 0;
  display: inline-flex;
  position: relative;
  height: 56px;
  margin-top: 16px;
  overflow: hidden; }
  .mdc-text-field--box::before, .mdc-text-field--box::after {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    content: ""; }
  .mdc-text-field--box::before {
    transition: opacity 15ms linear;
    z-index: 1; }
  .mdc-text-field--box.mdc-ripple-upgraded::before {
    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));
            transform: scale(var(--mdc-ripple-fg-scale, 1)); }
  .mdc-text-field--box.mdc-ripple-upgraded::after {
    top: 0;
    /* @noflip */
    left: 0;
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: center center;
            transform-origin: center center; }
  .mdc-text-field--box.mdc-ripple-upgraded--unbounded::after {
    top: var(--mdc-ripple-top, 0);
    /* @noflip */
    left: var(--mdc-ripple-left, 0); }
  .mdc-text-field--box.mdc-ripple-upgraded--foreground-activation::after {
    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;
            animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }
  .mdc-text-field--box.mdc-ripple-upgraded--foreground-deactivation::after {
    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;
            animation: 150ms mdc-ripple-fg-opacity-out;
    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
            transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }
  .mdc-text-field--box::before, .mdc-text-field--box::after {
    background-color: rgba(0, 0, 0, 0.87); }
  .mdc-text-field--box:hover::before {
    opacity: 0.04; }
  .mdc-text-field--box:not(.mdc-ripple-upgraded):focus::before, .mdc-text-field--box:not(.mdc-ripple-upgraded):focus-within::before, .mdc-text-field--box.mdc-ripple-upgraded--background-focused::before {
    transition-duration: 75ms;
    opacity: 0.12; }
  .mdc-text-field--box::before, .mdc-text-field--box::after {
    top: calc(50% - 100%);
    /* @noflip */
    left: calc(50% - 100%);
    width: 200%;
    height: 200%; }
  .mdc-text-field--box.mdc-ripple-upgraded::after {
    width: var(--mdc-ripple-fg-size, 100%);
    height: var(--mdc-ripple-fg-size, 100%); }
  .mdc-text-field--box:not(.mdc-text-field--disabled) {
    background-color: whitesmoke; }
  .mdc-text-field--box .mdc-floating-label--float-above {
    -webkit-transform: translateY(-50%) scale(0.75);
            transform: translateY(-50%) scale(0.75); }
  .mdc-text-field--box .mdc-floating-label--shake {
    -webkit-animation: mdc-floating-label-shake-float-above-text-field-box 250ms 1;
            animation: mdc-floating-label-shake-float-above-text-field-box 250ms 1; }
  .mdc-text-field--box .mdc-text-field__input {
    align-self: flex-end;
    box-sizing: border-box;
    height: 100%;
    padding: 20px 16px 0; }
  .mdc-text-field--box .mdc-floating-label {
    /* @noflip */
    left: 16px;
    /* @noflip */
    right: initial;
    position: absolute;
    bottom: 20px;
    width: calc(100% - 48px);
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    overflow: hidden;
    will-change: transform; }

.mdc-text-field--box.mdc-text-field--disabled {
  background-color: #fafafa;
  border-bottom: none; }
  .mdc-text-field--box.mdc-text-field--disabled .mdc-text-field__input {
    border-bottom-color: rgba(0, 0, 0, 0.06); }
  .mdc-text-field--box.mdc-text-field--disabled:not(.mdc-text-field--disabled) .mdc-floating-label {
    color: rgba(0, 0, 0, 0.37); }
  .mdc-text-field--box.mdc-text-field--disabled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mdc-text-field--box.mdc-text-field--disabled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mdc-text-field--box.mdc-text-field--disabled:not(.mdc-text-field--disabled) .mdc-text-field__input::-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mdc-text-field--box.mdc-text-field--disabled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
    color: rgba(0, 0, 0, 0.37); }

.mdc-text-field--box.mdc-text-field--dense .mdc-floating-label--float-above {
  -webkit-transform: translateY(-70%) scale(0.923);
          transform: translateY(-70%) scale(0.923); }

.mdc-text-field--box.mdc-text-field--dense .mdc-floating-label--shake {
  -webkit-animation: mdc-floating-label-shake-float-above-text-field-box-dense 250ms 1;
          animation: mdc-floating-label-shake-float-above-text-field-box-dense 250ms 1; }

.mdc-text-field--box.mdc-text-field--dense .mdc-text-field__input {
  padding: 12px 12px 0; }

.mdc-text-field--with-leading-icon .mdc-text-field__icon {
  /* @noflip */
  left: 15px;
  /* @noflip */
  right: initial; }

.mdc-text-field--with-leading-icon .mdc-text-field__input {
  /* @noflip */
  padding-left: 48px;
  /* @noflip */
  padding-right: 15px; }

.mdc-text-field--with-leading-icon .mdc-floating-label {
  /* @noflip */
  left: 48px;
  /* @noflip */
  right: initial; }

.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above {
  -webkit-transform: translateY(-130%) translateX(-32px) scale(0.75);
          transform: translateY(-130%) translateX(-32px) scale(0.75); }

.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake {
  -webkit-animation: mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1;
          animation: mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1; }

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above {
  -webkit-transform: translateY(-110%) translateX(-21px) scale(0.923);
          transform: translateY(-110%) translateX(-21px) scale(0.923); }

.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake {
  -webkit-animation: mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1;
          animation: mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1; }


.mdc-text-field--with-trailing-icon .mdc-text-field__icon {
  /* @noflip */
  left: initial;
  /* @noflip */
  right: 15px; }

.mdc-text-field--with-trailing-icon .mdc-text-field__input {
  /* @noflip */
  padding-left: 15px;
  /* @noflip */
  padding-right: 48px; }

.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon,
.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon {
  bottom: 16px;
  -webkit-transform: scale(0.8);
          transform: scale(0.8); }

.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon {
  /* @noflip */
  left: 12px;
  /* @noflip */
  right: initial; }

.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input {
  /* @noflip */
  padding-left: 38px;
  /* @noflip */
  padding-right: 12px; }

.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label {
  /* @noflip */
  left: 38px;
  /* @noflip */
  right: initial; }

.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon {
  /* @noflip */
  left: initial;
  /* @noflip */
  right: 12px; }

.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input {
  /* @noflip */
  padding-left: 12px;
  /* @noflip */
  padding-right: 38px; }

.mdc-text-field--upgraded:not(.mdc-text-field--fullwidth):not(.mdc-text-field--box) {
  display: inline-flex;
  position: relative;
  align-items: flex-end;
  box-sizing: border-box;
  margin-top: 16px; }
  .mdc-text-field--upgraded:not(.mdc-text-field--fullwidth):not(.mdc-text-field--box):not(.mdc-text-field--textarea):not(.mdc-text-field--outlined) {
    height: 48px; }

.mdc-text-field--dense {
  margin-top: 12px;
  margin-bottom: 4px; }
  .mdc-text-field--dense .mdc-floating-label--float-above {
    -webkit-transform: translateY(-110%) scale(0.923);
            transform: translateY(-110%) scale(0.923); }
  .mdc-text-field--dense .mdc-floating-label {
    font-size: .813rem; }

.mdc-text-field__input:required + .mdc-floating-label::after {
  margin-left: 1px;
  content: "*"; }

.mdc-text-field--textarea {
  border-radius: 4px;
  display: flex;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: initial;
  transition: none;
  border: 1px solid;
  overflow: hidden; }
.mdc-text-field--textarea .mdc-floating-label {
  border-radius: 4px 4px 0 0; }
.mdc-text-field--textarea .mdc-text-field__input {
  border-radius: 2px; }
.mdc-text-field--textarea:not(.mdc-text-field--disabled) {
  border-color: rgba(0, 0, 0, 0.73); }
  .mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-text-field__input:focus {
    border-color: rgba(0, 0, 0, 0.73); }
.mdc-text-field--textarea .mdc-floating-label--float-above {
  -webkit-transform: translateY(-50%) scale(0.923);
          transform: translateY(-50%) scale(0.923); }
.mdc-text-field--textarea .mdc-floating-label--shake {
  -webkit-animation: mdc-floating-label-shake-float-above-textarea 250ms 1;
          animation: mdc-floating-label-shake-float-above-textarea 250ms 1; }
.mdc-text-field--textarea .mdc-text-field__input {
  height: auto;
  margin: 0;
  padding: 16px;
  padding-top: 32px;
  border: 1px solid transparent; }
.mdc-text-field--textarea .mdc-floating-label {
  /* @noflip */
  left: 1px;
  /* @noflip */
  right: initial;
  background-color: white;
  top: 18px;
  bottom: auto;
  margin-top: 2px;
  margin-left: 8px;
  padding: 8px;
  line-height: 1.15; }

.mdc-text-field--fullwidth {
  width: 100%; }
.mdc-text-field--fullwidth .mdc-text-field__input {
  resize: vertical; }
.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) {
  display: block;
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  border: none;
  border-bottom: 1px solid;
  outline: none; }
.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input {
  width: 100%;
  height: 100%;
  padding: 0;
  resize: none;
  border: none !important; }

.mdc-text-field--fullwidth.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--textarea) {
  border-bottom-color: #b00020; }

.mdc-text-field--dense + .mdc-text-field-helper-text {
  margin-bottom: 4px; }

.mdc-text-field--box + .mdc-text-field-helper-text,
.mdc-text-field--outlined + .mdc-text-field-helper-text {
  margin-right: 16px;
  margin-left: 16px; }

.mdc-form-field > .mdc-text-field + label {
  align-self: flex-start; }

.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: rgba(98, 0, 238, 0.87); }

.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-text-field__input::-ms-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mdc-text-field--focused .mdc-text-field__input:required + .mdc-floating-label::after {
  color: #b00020; }

.mdc-text-field--focused + .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg) {
  opacity: 1; }

.mdc-text-field--textarea.mdc-text-field--focused:not(.mdc-text-field--disabled) {
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mdc-theme-primary, #6200ee); }
.mdc-text-field--textarea.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-text-field__input:focus {
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mdc-theme-primary, #6200ee); }

.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input {
  border-bottom-color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input:hover {
  border-bottom-color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple {
  background-color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input::-ms-input-placeholder {
  color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: #b00020; }

.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid + .mdc-text-field-helper-text--validation-msg {
  color: #b00020; }

.mdc-text-field--invalid.mdc-text-field--with-trailing-icon:not(.mdc-text-field--disabled) .mdc-text-field__icon {
  color: #b00020; }

.mdc-text-field--invalid + .mdc-text-field-helper-text--validation-msg {
  opacity: 1; }

.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) {
  border-color: #b00020; }
.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input:focus {
  border-color: #b00020; }

.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__idle {
  border-color: #b00020; }

.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__path {
  stroke: #b00020; }

.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline__idle,
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline__idle {
  border-color: #b00020; }

.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__path,
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__path {
  stroke: #b00020; }

.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__path {
  stroke: #b00020; }

.mdc-text-field--disabled {
  pointer-events: none; }
.mdc-text-field--disabled .mdc-text-field__input {
  border-bottom-color: rgba(35, 31, 32, 0.26); }
.mdc-text-field--disabled .mdc-text-field__input {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-floating-label {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-text-field__input::-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-text-field__input::placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled + .mdc-text-field-helper-text {
  color: rgba(0, 0, 0, 0.37); }
.mdc-text-field--disabled .mdc-text-field__icon {
  color: rgba(0, 0, 0, 0.3); }
.mdc-text-field--disabled:not(.mdc-text-field--textarea) {
  border-bottom-color: rgba(0, 0, 0, 0.12); }
.mdc-text-field--disabled .mdc-text-field__input {
  border-bottom: 1px dotted; }
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default; }

.mdc-text-field--textarea.mdc-text-field--disabled {
  border-color: rgba(35, 31, 32, 0.26);
  background-color: #f9f9f9;
  border-style: solid; }
  .mdc-text-field--textarea.mdc-text-field--disabled .mdc-text-field__input:focus {
    border-color: rgba(35, 31, 32, 0.26); }
  .mdc-text-field--textarea.mdc-text-field--disabled .mdc-text-field__input {
    border: 1px solid transparent; }
  .mdc-text-field--textarea.mdc-text-field--disabled .mdc-floating-label {
    background-color: #f9f9f9; }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-box {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75); } }

@keyframes mdc-floating-label-shake-float-above-text-field-box {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.75); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-box-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-70%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-70%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923); } }

@keyframes mdc-floating-label-shake-float-above-text-field-box-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-70%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-70%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-70%) scale(0.923); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-130%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75); } }

@keyframes mdc-floating-label-shake-float-above-text-field-outlined {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(4% - 0%)) translateY(-130%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 0%)) translateY(-130%) scale(0.75); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-110%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-110%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923); } }

@keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-110%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-110%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-110%) scale(0.923); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon {
  0% {
    -webkit-transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(4% - 32px)) translateY(-130%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(-4% - 32px)) translateY(-130%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75); } }

@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon {
  0% {
    -webkit-transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(4% - 32px)) translateY(-130%) scale(0.75); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(-4% - 32px)) translateY(-130%) scale(0.75); }
  100% {
    -webkit-transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75);
            transform: translateX(calc(0 - 32px)) translateY(-130%) scale(0.75); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(4% - 21px)) translateY(-110%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(-4% - 21px)) translateY(-110%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923); } }

@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense {
  0% {
    -webkit-transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(4% - 21px)) translateY(-110%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(-4% - 21px)) translateY(-110%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923);
            transform: translateX(calc(0 - 21px)) translateY(-110%) scale(0.923); } }

@-webkit-keyframes mdc-floating-label-shake-float-above-textarea {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923); } }

@keyframes mdc-floating-label-shake-float-above-textarea {
  0% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923); }
  33% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
            animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);
    -webkit-transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(4% - 0%)) translateY(-50%) scale(0.923); }
  66% {
    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
            animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);
    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(-4% - 0%)) translateY(-50%) scale(0.923); }
  100% {
    -webkit-transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923);
            transform: translateX(calc(0 - 0%)) translateY(-50%) scale(0.923); } }
`
    ]
  }

  render() {
    return html`
<div>
  ${!this.fullWidth && this.icon ? html`<mwc-icon tabindex="0">${this.icon}</mwc-icon>` : nothing}
  <input id="input" type=${this.type} placeholder=${this.placeholder} ?required=${this.required} .value=${this.value} aria-label=${this.label}>
  ${!this.fullWidth && this.label ? html`<label ?has-value=${this.value} for="input">${this.label}</label>` : nothing}
  ${!this.fullWidth && this.outlined ? html`
    <div class="outline">
      <svg><path/></svg>
    </div>
    <div class="outline-idle"></div>` : html`<mwc-line-ripple></mwc-line-ripple>`}
</div>
${this.helperText ? html`<p class="mdc-text-field-helper-text" aria-hidden="true">${this.helperText}</p>` : nothing}`
  }
}
