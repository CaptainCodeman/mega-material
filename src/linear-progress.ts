import { LitElement, html, customElement, css, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-linear-progress': LinearProgressElement;
  }
}

@customElement('mwc-linear-progress')
export class LinearProgressElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  determinate = false;

  @property({ type: Number, reflect: true })
  progress = 1;

  @property({ type: Number, reflect: true })
  buffer = 1;

  @property({ type: Boolean, reflect: true })
  reverse = false;

  @property({ type: Boolean, reflect: true })
  closed = false;

  static get styles() {
    return [
      css`
@-webkit-keyframes primary-indeterminate-translate {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  20% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
            animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  59.15% {
    -webkit-animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
            animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    -webkit-transform: translateX(83.67142%);
            transform: translateX(83.67142%);
  }
  100% {
    -webkit-transform: translateX(200.611057%);
            transform: translateX(200.611057%);
  }
}
@keyframes primary-indeterminate-translate {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  20% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
            animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  59.15% {
    -webkit-animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
            animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    -webkit-transform: translateX(83.67142%);
            transform: translateX(83.67142%);
  }
  100% {
    -webkit-transform: translateX(200.611057%);
            transform: translateX(200.611057%);
  }
}
@-webkit-keyframes primary-indeterminate-scale {
  0% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  36.65% {
    -webkit-animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
            animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  69.15% {
    -webkit-animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
            animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    -webkit-transform: scaleX(0.661479);
            transform: scaleX(0.661479);
  }
  100% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
}
@keyframes primary-indeterminate-scale {
  0% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  36.65% {
    -webkit-animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
            animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  69.15% {
    -webkit-animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
            animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    -webkit-transform: scaleX(0.661479);
            transform: scaleX(0.661479);
  }
  100% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
}
@-webkit-keyframes secondary-indeterminate-translate {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
            animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  25% {
    -webkit-animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
            animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    -webkit-transform: translateX(37.651913%);
            transform: translateX(37.651913%);
  }
  48.35% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
            animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    -webkit-transform: translateX(84.386165%);
            transform: translateX(84.386165%);
  }
  100% {
    -webkit-transform: translateX(160.277782%);
            transform: translateX(160.277782%);
  }
}
@keyframes secondary-indeterminate-translate {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
            animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  25% {
    -webkit-animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
            animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    -webkit-transform: translateX(37.651913%);
            transform: translateX(37.651913%);
  }
  48.35% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
            animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    -webkit-transform: translateX(84.386165%);
            transform: translateX(84.386165%);
  }
  100% {
    -webkit-transform: translateX(160.277782%);
            transform: translateX(160.277782%);
  }
}
@-webkit-keyframes secondary-indeterminate-scale {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
            animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  19.15% {
    -webkit-animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
            animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    -webkit-transform: scaleX(0.457104);
            transform: scaleX(0.457104);
  }
  44.15% {
    -webkit-animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
            animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    -webkit-transform: scaleX(0.72796);
            transform: scaleX(0.72796);
  }
  100% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
}
@keyframes secondary-indeterminate-scale {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
            animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
  19.15% {
    -webkit-animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
            animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    -webkit-transform: scaleX(0.457104);
            transform: scaleX(0.457104);
  }
  44.15% {
    -webkit-animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
            animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    -webkit-transform: scaleX(0.72796);
            transform: scaleX(0.72796);
  }
  100% {
    -webkit-transform: scaleX(0.08);
            transform: scaleX(0.08);
  }
}
@-webkit-keyframes buffering {
  to {
    -webkit-transform: translateX(-10px);
            transform: translateX(-10px);
  }
}
@keyframes buffering {
  to {
    -webkit-transform: translateX(-10px);
            transform: translateX(-10px);
  }
}
@-webkit-keyframes primary-indeterminate-translate-reverse {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  20% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
            animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  59.15% {
    -webkit-animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
            animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    -webkit-transform: translateX(-83.67142%);
            transform: translateX(-83.67142%);
  }
  100% {
    -webkit-transform: translateX(-200.611057%);
            transform: translateX(-200.611057%);
  }
}
@keyframes primary-indeterminate-translate-reverse {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  20% {
    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
            animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  59.15% {
    -webkit-animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
            animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    -webkit-transform: translateX(-83.67142%);
            transform: translateX(-83.67142%);
  }
  100% {
    -webkit-transform: translateX(-200.611057%);
            transform: translateX(-200.611057%);
  }
}
@-webkit-keyframes secondary-indeterminate-translate-reverse {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
            animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  25% {
    -webkit-animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
            animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    -webkit-transform: translateX(-37.651913%);
            transform: translateX(-37.651913%);
  }
  48.35% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
            animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    -webkit-transform: translateX(-84.386165%);
            transform: translateX(-84.386165%);
  }
  100% {
    -webkit-transform: translateX(-160.277782%);
            transform: translateX(-160.277782%);
  }
}
@keyframes secondary-indeterminate-translate-reverse {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
            animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  25% {
    -webkit-animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
            animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    -webkit-transform: translateX(-37.651913%);
            transform: translateX(-37.651913%);
  }
  48.35% {
    -webkit-animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
            animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    -webkit-transform: translateX(-84.386165%);
            transform: translateX(-84.386165%);
  }
  100% {
    -webkit-transform: translateX(-160.277782%);
            transform: translateX(-160.277782%);
  }
}
@-webkit-keyframes buffering-reverse {
  to {
    -webkit-transform: translateX(10px);
            transform: translateX(10px);
  }
}
@keyframes buffering-reverse {
  to {
    -webkit-transform: translateX(10px);
            transform: translateX(10px);
  }
}
:host {
  display: block;
  position: relative;
  width: 100%;
  height: 4px;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  overflow: hidden;
}
.bar {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-animation: none;
          animation: none;
  -webkit-transform-origin: top left;
          transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
      -webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}
span {
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-animation: none;
          animation: none;
}
.dots {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-animation: buffering 250ms infinite linear;
          animation: buffering 250ms infinite linear;
  background-repeat: repeat-x;
  background-size: 10px 4px;
}
.buffer {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-transform-origin: top left;
          transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
      -webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
}
.primary {
  -webkit-transform: scaleX(0);
          transform: scaleX(0);
}
.secondary {
  visibility: hidden;
}
:host([indeterminate]) .bar {
  transition: none;
}
:host([indeterminate]) .primary {
  left: -145.166611%;
  -webkit-animation: primary-indeterminate-translate 2s infinite linear;
          animation: primary-indeterminate-translate 2s infinite linear;
}
:host([indeterminate]) .primary > span {
  -webkit-animation: primary-indeterminate-scale 2s infinite linear;
          animation: primary-indeterminate-scale 2s infinite linear;
}
:host([indeterminate]) .secondary {
  left: -54.888891%;
  -webkit-animation: secondary-indeterminate-translate 2s infinite linear;
          animation: secondary-indeterminate-translate 2s infinite linear;
  visibility: visible;
}
:host([indeterminate]) .secondary > span {
  -webkit-animation: secondary-indeterminate-scale 2s infinite linear;
          animation: secondary-indeterminate-scale 2s infinite linear;
}
:host([reverse]) .bar,
:host([reverse]) .buffer {
  right: 0;
  -webkit-transform-origin: center right;
          transform-origin: center right;
}
:host([reverse]) .primary {
  -webkit-animation-name: primary-indeterminate-translate-reverse;
          animation-name: primary-indeterminate-translate-reverse;
}
:host([reverse]) .secondary {
  -webkit-animation-name: secondary-indeterminate-translate-reverse;
          animation-name: secondary-indeterminate-translate-reverse;
}
:host([reverse]) .dots {
  -webkit-animation: buffering-reverse 250ms infinite linear;
          animation: buffering-reverse 250ms infinite linear;
}
:host([closed]) {
  opacity: 0;
}

span {
  background-color: #6200ee;
  background-color: var(--mdc-theme-primary, #6200ee);
}

.dots {
  background-image: var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"));
}

.buffer {
  background-color: var(--mdc-theme-secondary, #e6e6e6);
}

:host([indeterminate][reverse]) .primary {
  right: -145.166611%;
  left: auto;
}
:host([indeterminate][reverse]) .secondary {
  right: -54.888891%;
  left: auto;
}`
    ]
  }

  render() {
    // TODO: change styles to use :not([determinate]) so we don't need this attrib
    if (this.determinate) {
      this.removeAttribute('indeterminate')
    } else {
      this.setAttribute('indeterminate', '')
    }

    return html`
<div class="dots"></div>
<div class="buffer" style=${styleMap({ transform: `scaleX(${this.buffer.toFixed(2)})` })}></div>
<div class="bar primary" style=${styleMap({ transform: `scaleX(${this.progress.toFixed(2)})` })}><span></span></div>
<div class="bar secondary"><span></span></div>`
  }
}
