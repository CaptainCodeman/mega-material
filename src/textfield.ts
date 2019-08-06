import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';

import './icon'
import { defaultCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mega-textfield': TextFieldElement;
  }
}

@customElement('mega-textfield')
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
  -webkit-animation: mega-floating-label-shake-float-above-standard 250ms 1;
          animation: mega-floating-label-shake-float-above-standard 250ms 1; }

@-webkit-keyframes mega-floating-label-shake-float-above-standard {
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

@keyframes mega-floating-label-shake-float-above-standard {
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

mega-line-ripple {
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

mega-line-ripple[active] {
  -webkit-transform: scaleX(1);
          transform: scaleX(1);
  opacity: 1; }

mega-line-ripple[deactivating] {
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

.mega-notched-outline__path {
  stroke-width: 1px;
  transition: stroke 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);
  fill: transparent; }

.mega-notched-outline--notched {
  opacity: 1; }

.mega-notched-outline--notched ~ .mega-notched-outline__idle {
  opacity: 0; }

@-webkit-keyframes mega-ripple-fg-radius-in {
  from {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1);
            transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1); }
  to {
    -webkit-transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1));
            transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1)); } }

@keyframes mega-ripple-fg-radius-in {
  from {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1);
            transform: translate(var(--mega-ripple-fg-translate-start, 0)) scale(1); }
  to {
    -webkit-transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1));
            transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1)); } }

@-webkit-keyframes mega-ripple-fg-opacity-in {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: 0; }
  to {
    opacity: var(--mega-ripple-fg-opacity, 0); } }

@keyframes mega-ripple-fg-opacity-in {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: 0; }
  to {
    opacity: var(--mega-ripple-fg-opacity, 0); } }

@-webkit-keyframes mega-ripple-fg-opacity-out {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: var(--mega-ripple-fg-opacity, 0); }
  to {
    opacity: 0; } }

@keyframes mega-ripple-fg-opacity-out {
  from {
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
    opacity: var(--mega-ripple-fg-opacity, 0); }
  to {
    opacity: 0; } }

.mega-ripple-surface--test-edge-var-bug {
  --mega-ripple-surface-test-edge-var: 1px solid #000;
  visibility: hidden; }
  .mega-ripple-surface--test-edge-var-bug::before {
    border: var(--mega-ripple-surface-test-edge-var); }

.mega-text-field-helper-text {
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
  .mega-text-field + .mega-text-field-helper-text {
    margin-bottom: 8px; }

.mega-text-field-helper-text--persistent {
  transition: none;
  opacity: 1;
  will-change: initial; }

.mega-text-field--with-leading-icon .mega-text-field__icon,
.mega-text-field--with-trailing-icon .mega-text-field__icon {
  position: absolute;
  bottom: 16px;
  cursor: pointer; }

.mega-text-field__icon:not([tabindex]),
.mega-text-field__icon[tabindex="-1"] {
  cursor: default;
  pointer-events: none; }

.mega-text-field {
  display: inline-block;
  position: relative;
  margin-bottom: 8px;
  will-change: opacity, transform, color; }
  .mega-text-field:not(.mega-text-field--disabled):not(.mega-text-field--outlined):not(.mega-text-field--textarea) .mega-text-field__input {
    border-bottom-color: rgba(0, 0, 0, 0.42); }
  .mega-text-field:not(.mega-text-field--disabled):not(.mega-text-field--outlined):not(.mega-text-field--textarea) .mega-text-field__input:hover {
    border-bottom-color: rgba(0, 0, 0, 0.87); }
  .mega-text-field .mega-line-ripple {
    background-color: #6200ee;
    /* @alternate */
    background-color: var(--mega-theme-primary, #6200ee); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__input {
    color: rgba(0, 0, 0, 0.87); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-floating-label {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__input:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__input::-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__input::placeholder {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled) + .mega-text-field-helper-text {
    color: rgba(0, 0, 0, 0.6); }
  .mega-text-field:not(.mega-text-field--disabled):not(.mega-text-field--textarea) {
    border-bottom-color: rgba(0, 0, 0, 0.12); }
  .mega-text-field:not(.mega-text-field--disabled) .mega-text-field__icon {
    color: rgba(0, 0, 0, 0.54); }

.mega-text-field__input {
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
  .mega-text-field__input::-webkit-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mega-text-field__input:-ms-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mega-text-field__input::-ms-input-placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mega-text-field__input::placeholder {
    transition: color 180ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1; }
  .mega-text-field__input:focus {
    outline: none; }
  .mega-text-field__input:invalid {
    box-shadow: none; }
  .mega-text-field__input:-webkit-autofill + .mega-floating-label {
    -webkit-transform: translateY(-100%) scale(0.75);
            transform: translateY(-100%) scale(0.75);
    cursor: auto; }

.mega-text-field--outlined {
  height: 56px;
  border: none; }
  .mega-text-field--outlined:not(.mega-text-field--disabled) .mega-notched-outline__idle {
    border-color: rgba(0, 0, 0, 0.24); }
  .mega-text-field--outlined:not(.mega-text-field--disabled) .mega-notched-outline__path {
    stroke: rgba(0, 0, 0, 0.24); }
  .mega-text-field--outlined:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__input:hover ~ .mega-notched-outline__idle,
  .mega-text-field--outlined:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__icon:hover ~ .mega-notched-outline__idle {
    border-color: rgba(0, 0, 0, 0.87); }
  .mega-text-field--outlined:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__input:hover ~ .mega-notched-outline .mega-notched-outline__path,
  .mega-text-field--outlined:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__icon:hover ~ .mega-notched-outline .mega-notched-outline__path {
    stroke: rgba(0, 0, 0, 0.87); }
  .mega-text-field--outlined:not(.mega-text-field--disabled).mega-text-field--focused .mega-notched-outline__path {
    stroke: #6200ee;
    /* @alternate */
    stroke: var(--mega-theme-primary, #6200ee); }
  .mega-text-field--outlined .mega-floating-label--float-above {
    -webkit-transform: translateY(-130%) scale(0.75);
            transform: translateY(-130%) scale(0.75); }
  .mega-text-field--outlined .mega-floating-label--shake {
    -webkit-animation: mega-floating-label-shake-float-above-text-field-outlined 250ms 1;
            animation: mega-floating-label-shake-float-above-text-field-outlined 250ms 1; }
  .mega-text-field--outlined .mega-notched-outline {
    border-radius: 4px; }
  .mega-text-field--outlined .mega-notched-outline__idle {
    border-radius: 4px; }
  .mega-text-field--outlined .mega-text-field__input {
    display: flex;
    padding: 12px;
    border: none;
    background-color: transparent;
    z-index: 1; }
  .mega-text-field--outlined .mega-floating-label {
    /* @noflip */
    left: 16px;
    /* @noflip */
    right: initial;
    position: absolute;
    bottom: 20px; }
  .mega-text-field--outlined .mega-text-field__icon {
    z-index: 2; }

.mega-text-field--outlined.mega-text-field--focused .mega-notched-outline__path {
  stroke-width: 2px; }

.mega-text-field--outlined.mega-text-field--disabled .mega-text-field__input {
  color: rgba(0, 0, 0, 0.6); }

.mega-text-field--outlined.mega-text-field--disabled .mega-notched-outline__idle {
  border-color: rgba(0, 0, 0, 0.06); }

.mega-text-field--outlined.mega-text-field--disabled .mega-notched-outline__path {
  stroke: rgba(0, 0, 0, 0.06); }

.mega-text-field--outlined.mega-text-field--disabled .mega-text-field__input {
  border-bottom: none; }

.mega-text-field--outlined.mega-text-field--dense {
  height: 48px; }
  .mega-text-field--outlined.mega-text-field--dense .mega-floating-label--float-above {
    -webkit-transform: translateY(-110%) scale(0.923);
            transform: translateY(-110%) scale(0.923); }
  .mega-text-field--outlined.mega-text-field--dense .mega-floating-label--shake {
    -webkit-animation: mega-floating-label-shake-float-above-text-field-outlined-dense 250ms 1;
            animation: mega-floating-label-shake-float-above-text-field-outlined-dense 250ms 1; }
  .mega-text-field--outlined.mega-text-field--dense .mega-text-field__input {
    padding: 12px 12px 7px; }
  .mega-text-field--outlined.mega-text-field--dense .mega-floating-label {
    bottom: 16px; }
  .mega-text-field--outlined.mega-text-field--dense .mega-text-field__icon {
    top: 12px; }

.mega-text-field--box {
  --mega-ripple-fg-size: 0;
  --mega-ripple-left: 0;
  --mega-ripple-top: 0;
  --mega-ripple-fg-scale: 1;
  --mega-ripple-fg-translate-end: 0;
  --mega-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  border-radius: 4px 4px 0 0;
  display: inline-flex;
  position: relative;
  height: 56px;
  margin-top: 16px;
  overflow: hidden; }
  .mega-text-field--box::before, .mega-text-field--box::after {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    content: ""; }
  .mega-text-field--box::before {
    transition: opacity 15ms linear;
    z-index: 1; }
  .mega-text-field--box.mega-ripple-upgraded::before {
    -webkit-transform: scale(var(--mega-ripple-fg-scale, 1));
            transform: scale(var(--mega-ripple-fg-scale, 1)); }
  .mega-text-field--box.mega-ripple-upgraded::after {
    top: 0;
    /* @noflip */
    left: 0;
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: center center;
            transform-origin: center center; }
  .mega-text-field--box.mega-ripple-upgraded--unbounded::after {
    top: var(--mega-ripple-top, 0);
    /* @noflip */
    left: var(--mega-ripple-left, 0); }
  .mega-text-field--box.mega-ripple-upgraded--foreground-activation::after {
    -webkit-animation: 225ms mega-ripple-fg-radius-in forwards, 75ms mega-ripple-fg-opacity-in forwards;
            animation: 225ms mega-ripple-fg-radius-in forwards, 75ms mega-ripple-fg-opacity-in forwards; }
  .mega-text-field--box.mega-ripple-upgraded--foreground-deactivation::after {
    -webkit-animation: 150ms mega-ripple-fg-opacity-out;
            animation: 150ms mega-ripple-fg-opacity-out;
    -webkit-transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1));
            transform: translate(var(--mega-ripple-fg-translate-end, 0)) scale(var(--mega-ripple-fg-scale, 1)); }
  .mega-text-field--box::before, .mega-text-field--box::after {
    background-color: rgba(0, 0, 0, 0.87); }
  .mega-text-field--box:hover::before {
    opacity: 0.04; }
  .mega-text-field--box:not(.mega-ripple-upgraded):focus::before, .mega-text-field--box:not(.mega-ripple-upgraded):focus-within::before, .mega-text-field--box.mega-ripple-upgraded--background-focused::before {
    transition-duration: 75ms;
    opacity: 0.12; }
  .mega-text-field--box::before, .mega-text-field--box::after {
    top: calc(50% - 100%);
    /* @noflip */
    left: calc(50% - 100%);
    width: 200%;
    height: 200%; }
  .mega-text-field--box.mega-ripple-upgraded::after {
    width: var(--mega-ripple-fg-size, 100%);
    height: var(--mega-ripple-fg-size, 100%); }
  .mega-text-field--box:not(.mega-text-field--disabled) {
    background-color: whitesmoke; }
  .mega-text-field--box .mega-floating-label--float-above {
    -webkit-transform: translateY(-50%) scale(0.75);
            transform: translateY(-50%) scale(0.75); }
  .mega-text-field--box .mega-floating-label--shake {
    -webkit-animation: mega-floating-label-shake-float-above-text-field-box 250ms 1;
            animation: mega-floating-label-shake-float-above-text-field-box 250ms 1; }
  .mega-text-field--box .mega-text-field__input {
    align-self: flex-end;
    box-sizing: border-box;
    height: 100%;
    padding: 20px 16px 0; }
  .mega-text-field--box .mega-floating-label {
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

.mega-text-field--box.mega-text-field--disabled {
  background-color: #fafafa;
  border-bottom: none; }
  .mega-text-field--box.mega-text-field--disabled .mega-text-field__input {
    border-bottom-color: rgba(0, 0, 0, 0.06); }
  .mega-text-field--box.mega-text-field--disabled:not(.mega-text-field--disabled) .mega-floating-label {
    color: rgba(0, 0, 0, 0.37); }
  .mega-text-field--box.mega-text-field--disabled:not(.mega-text-field--disabled) .mega-text-field__input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mega-text-field--box.mega-text-field--disabled:not(.mega-text-field--disabled) .mega-text-field__input:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mega-text-field--box.mega-text-field--disabled:not(.mega-text-field--disabled) .mega-text-field__input::-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.37); }
  .mega-text-field--box.mega-text-field--disabled:not(.mega-text-field--disabled) .mega-text-field__input::placeholder {
    color: rgba(0, 0, 0, 0.37); }

.mega-text-field--box.mega-text-field--dense .mega-floating-label--float-above {
  -webkit-transform: translateY(-70%) scale(0.923);
          transform: translateY(-70%) scale(0.923); }

.mega-text-field--box.mega-text-field--dense .mega-floating-label--shake {
  -webkit-animation: mega-floating-label-shake-float-above-text-field-box-dense 250ms 1;
          animation: mega-floating-label-shake-float-above-text-field-box-dense 250ms 1; }

.mega-text-field--box.mega-text-field--dense .mega-text-field__input {
  padding: 12px 12px 0; }

.mega-text-field--with-leading-icon .mega-text-field__icon {
  /* @noflip */
  left: 15px;
  /* @noflip */
  right: initial; }

.mega-text-field--with-leading-icon .mega-text-field__input {
  /* @noflip */
  padding-left: 48px;
  /* @noflip */
  padding-right: 15px; }

.mega-text-field--with-leading-icon .mega-floating-label {
  /* @noflip */
  left: 48px;
  /* @noflip */
  right: initial; }

.mega-text-field--with-leading-icon.mega-text-field--outlined .mega-floating-label--float-above {
  -webkit-transform: translateY(-130%) translateX(-32px) scale(0.75);
          transform: translateY(-130%) translateX(-32px) scale(0.75); }

.mega-text-field--with-leading-icon.mega-text-field--outlined .mega-floating-label--shake {
  -webkit-animation: mega-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1;
          animation: mega-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1; }

.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense .mega-floating-label--float-above {
  -webkit-transform: translateY(-110%) translateX(-21px) scale(0.923);
          transform: translateY(-110%) translateX(-21px) scale(0.923); }

.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense .mega-floating-label--shake {
  -webkit-animation: mega-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1;
          animation: mega-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1; }


.mega-text-field--with-trailing-icon .mega-text-field__icon {
  /* @noflip */
  left: initial;
  /* @noflip */
  right: 15px; }

.mega-text-field--with-trailing-icon .mega-text-field__input {
  /* @noflip */
  padding-left: 15px;
  /* @noflip */
  padding-right: 48px; }

.mega-text-field--with-leading-icon.mega-text-field--dense .mega-text-field__icon,
.mega-text-field--with-trailing-icon.mega-text-field--dense .mega-text-field__icon {
  bottom: 16px;
  -webkit-transform: scale(0.8);
          transform: scale(0.8); }

.mega-text-field--with-leading-icon.mega-text-field--dense .mega-text-field__icon {
  /* @noflip */
  left: 12px;
  /* @noflip */
  right: initial; }

.mega-text-field--with-leading-icon.mega-text-field--dense .mega-text-field__input {
  /* @noflip */
  padding-left: 38px;
  /* @noflip */
  padding-right: 12px; }

.mega-text-field--with-leading-icon.mega-text-field--dense .mega-floating-label {
  /* @noflip */
  left: 38px;
  /* @noflip */
  right: initial; }

.mega-text-field--with-trailing-icon.mega-text-field--dense .mega-text-field__icon {
  /* @noflip */
  left: initial;
  /* @noflip */
  right: 12px; }

.mega-text-field--with-trailing-icon.mega-text-field--dense .mega-text-field__input {
  /* @noflip */
  padding-left: 12px;
  /* @noflip */
  padding-right: 38px; }

.mega-text-field--upgraded:not(.mega-text-field--fullwidth):not(.mega-text-field--box) {
  display: inline-flex;
  position: relative;
  align-items: flex-end;
  box-sizing: border-box;
  margin-top: 16px; }
  .mega-text-field--upgraded:not(.mega-text-field--fullwidth):not(.mega-text-field--box):not(.mega-text-field--textarea):not(.mega-text-field--outlined) {
    height: 48px; }

.mega-text-field--dense {
  margin-top: 12px;
  margin-bottom: 4px; }
  .mega-text-field--dense .mega-floating-label--float-above {
    -webkit-transform: translateY(-110%) scale(0.923);
            transform: translateY(-110%) scale(0.923); }
  .mega-text-field--dense .mega-floating-label {
    font-size: .813rem; }

.mega-text-field__input:required + .mega-floating-label::after {
  margin-left: 1px;
  content: "*"; }

.mega-text-field--textarea {
  border-radius: 4px;
  display: flex;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: initial;
  transition: none;
  border: 1px solid;
  overflow: hidden; }
.mega-text-field--textarea .mega-floating-label {
  border-radius: 4px 4px 0 0; }
.mega-text-field--textarea .mega-text-field__input {
  border-radius: 2px; }
.mega-text-field--textarea:not(.mega-text-field--disabled) {
  border-color: rgba(0, 0, 0, 0.73); }
  .mega-text-field--textarea:not(.mega-text-field--disabled) .mega-text-field__input:focus {
    border-color: rgba(0, 0, 0, 0.73); }
.mega-text-field--textarea .mega-floating-label--float-above {
  -webkit-transform: translateY(-50%) scale(0.923);
          transform: translateY(-50%) scale(0.923); }
.mega-text-field--textarea .mega-floating-label--shake {
  -webkit-animation: mega-floating-label-shake-float-above-textarea 250ms 1;
          animation: mega-floating-label-shake-float-above-textarea 250ms 1; }
.mega-text-field--textarea .mega-text-field__input {
  height: auto;
  margin: 0;
  padding: 16px;
  padding-top: 32px;
  border: 1px solid transparent; }
.mega-text-field--textarea .mega-floating-label {
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

.mega-text-field--fullwidth {
  width: 100%; }
.mega-text-field--fullwidth .mega-text-field__input {
  resize: vertical; }
.mega-text-field--fullwidth:not(.mega-text-field--textarea) {
  display: block;
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  border: none;
  border-bottom: 1px solid;
  outline: none; }
.mega-text-field--fullwidth:not(.mega-text-field--textarea) .mega-text-field__input {
  width: 100%;
  height: 100%;
  padding: 0;
  resize: none;
  border: none !important; }

.mega-text-field--fullwidth.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--textarea) {
  border-bottom-color: #b00020; }

.mega-text-field--dense + .mega-text-field-helper-text {
  margin-bottom: 4px; }

.mega-text-field--box + .mega-text-field-helper-text,
.mega-text-field--outlined + .mega-text-field-helper-text {
  margin-right: 16px;
  margin-left: 16px; }

.mega-form-field > .mega-text-field + label {
  align-self: flex-start; }

.mega-text-field--focused:not(.mega-text-field--disabled) .mega-floating-label {
  color: rgba(98, 0, 238, 0.87); }

.mega-text-field--focused:not(.mega-text-field--disabled) .mega-text-field__input::-webkit-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mega-text-field--focused:not(.mega-text-field--disabled) .mega-text-field__input:-ms-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mega-text-field--focused:not(.mega-text-field--disabled) .mega-text-field__input::-ms-input-placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mega-text-field--focused:not(.mega-text-field--disabled) .mega-text-field__input::placeholder {
  color: rgba(98, 0, 238, 0.87); }

.mega-text-field--focused .mega-text-field__input:required + .mega-floating-label::after {
  color: #b00020; }

.mega-text-field--focused + .mega-text-field-helper-text:not(.mega-text-field-helper-text--validation-msg) {
  opacity: 1; }

.mega-text-field--textarea.mega-text-field--focused:not(.mega-text-field--disabled) {
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mega-theme-primary, #6200ee); }
.mega-text-field--textarea.mega-text-field--focused:not(.mega-text-field--disabled) .mega-text-field__input:focus {
  border-color: #6200ee;
  /* @alternate */
  border-color: var(--mega-theme-primary, #6200ee); }

.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--outlined):not(.mega-text-field--textarea) .mega-text-field__input {
  border-bottom-color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--outlined):not(.mega-text-field--textarea) .mega-text-field__input:hover {
  border-bottom-color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-line-ripple {
  background-color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-floating-label {
  color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-text-field__input::-webkit-input-placeholder {
  color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-text-field__input:-ms-input-placeholder {
  color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-text-field__input::-ms-input-placeholder {
  color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-text-field__input::placeholder {
  color: #b00020; }

.mega-text-field--invalid:not(.mega-text-field--disabled).mega-text-field--invalid + .mega-text-field-helper-text--validation-msg {
  color: #b00020; }

.mega-text-field--invalid.mega-text-field--with-trailing-icon:not(.mega-text-field--disabled) .mega-text-field__icon {
  color: #b00020; }

.mega-text-field--invalid + .mega-text-field-helper-text--validation-msg {
  opacity: 1; }

.mega-text-field--textarea.mega-text-field--invalid:not(.mega-text-field--disabled) {
  border-color: #b00020; }
.mega-text-field--textarea.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-text-field__input:focus {
  border-color: #b00020; }

.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-notched-outline__idle {
  border-color: #b00020; }

.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled) .mega-notched-outline__path {
  stroke: #b00020; }

.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__input:hover ~ .mega-notched-outline__idle,
.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__icon:hover ~ .mega-notched-outline__idle {
  border-color: #b00020; }

.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__input:hover ~ .mega-notched-outline .mega-notched-outline__path,
.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled):not(.mega-text-field--focused) .mega-text-field__icon:hover ~ .mega-notched-outline .mega-notched-outline__path {
  stroke: #b00020; }

.mega-text-field--outlined.mega-text-field--invalid:not(.mega-text-field--disabled).mega-text-field--focused .mega-notched-outline__path {
  stroke: #b00020; }

.mega-text-field--disabled {
  pointer-events: none; }
.mega-text-field--disabled .mega-text-field__input {
  border-bottom-color: rgba(35, 31, 32, 0.26); }
.mega-text-field--disabled .mega-text-field__input {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-floating-label {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-text-field__input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-text-field__input:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-text-field__input::-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-text-field__input::placeholder {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled + .mega-text-field-helper-text {
  color: rgba(0, 0, 0, 0.37); }
.mega-text-field--disabled .mega-text-field__icon {
  color: rgba(0, 0, 0, 0.3); }
.mega-text-field--disabled:not(.mega-text-field--textarea) {
  border-bottom-color: rgba(0, 0, 0, 0.12); }
.mega-text-field--disabled .mega-text-field__input {
  border-bottom: 1px dotted; }
.mega-text-field--disabled .mega-floating-label {
  cursor: default; }

.mega-text-field--textarea.mega-text-field--disabled {
  border-color: rgba(35, 31, 32, 0.26);
  background-color: #f9f9f9;
  border-style: solid; }
  .mega-text-field--textarea.mega-text-field--disabled .mega-text-field__input:focus {
    border-color: rgba(35, 31, 32, 0.26); }
  .mega-text-field--textarea.mega-text-field--disabled .mega-text-field__input {
    border: 1px solid transparent; }
  .mega-text-field--textarea.mega-text-field--disabled .mega-floating-label {
    background-color: #f9f9f9; }

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-box {
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

@keyframes mega-floating-label-shake-float-above-text-field-box {
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

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-box-dense {
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

@keyframes mega-floating-label-shake-float-above-text-field-box-dense {
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

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-outlined {
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

@keyframes mega-floating-label-shake-float-above-text-field-outlined {
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

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-outlined-dense {
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

@keyframes mega-floating-label-shake-float-above-text-field-outlined-dense {
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

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-outlined-leading-icon {
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

@keyframes mega-floating-label-shake-float-above-text-field-outlined-leading-icon {
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

@-webkit-keyframes mega-floating-label-shake-float-above-text-field-outlined-leading-icon-dense {
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

@keyframes mega-floating-label-shake-float-above-text-field-outlined-leading-icon-dense {
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

@-webkit-keyframes mega-floating-label-shake-float-above-textarea {
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

@keyframes mega-floating-label-shake-float-above-textarea {
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
  ${!this.fullWidth && this.icon ? html`<mega-icon tabindex="0">${this.icon}</mega-icon>` : nothing}
  <input id="input" type=${this.type} placeholder=${this.placeholder} ?required=${this.required} .value=${this.value} aria-label=${this.label}>
  ${!this.fullWidth && this.label ? html`<label ?has-value=${this.value} for="input">${this.label}</label>` : nothing}
  ${!this.fullWidth && this.outlined ? html`
    <div class="outline">
      <svg><path/></svg>
    </div>
    <div class="outline-idle"></div>` : html`<mega-line-ripple></mega-line-ripple>`}
</div>
${this.helperText ? html`<p class="mega-text-field-helper-text" aria-hidden="true">${this.helperText}</p>` : nothing}`
  }
}
