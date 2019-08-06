import { LitElement, html, customElement } from 'lit-element';
import { defaultCSS, elevationCSS, typographyCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mega-surface': SurfaceElement;
  }
}

@customElement('mega-surface')
export class SurfaceElement extends LitElement {
  static get styles() {
    return [
      defaultCSS,
      elevationCSS,
      typographyCSS,
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}
