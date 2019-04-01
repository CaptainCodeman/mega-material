import { LitElement, html, customElement, css } from 'lit-element';
import { hiddenStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-icon': IconElement;
  }
}

// TODO: make lazy and check for --mdc-icon-font being set to something else
// use css font loading api to hide icons until font has loaded or something like
// https://github.com/bramstein/fontfaceobserver to fade them in when they are
// https://github.com/typekit/webfontloader
const el = document.createElement('link');
el.rel = 'stylesheet';
el.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head!.appendChild(el);

@customElement('mwc-icon')
export class IconElement extends LitElement {
  static get styles() {
    return [
      hiddenStyle,
      css`
:host {
  font-family: var(--mdc-icon-font, "Material Icons");
  font-display: block;
  font-weight: normal;
  font-style: normal;
  font-size: var(--mdc-icon-size, 24px);
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
  contain: content;
}`
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}
