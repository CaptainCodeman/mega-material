import { LitElement, html, customElement } from 'lit-element';
import { defaultCSS, elevationCSS, typographyCSS } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-surface': SurfaceElement;
  }
}

@customElement('mwc-surface')
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
