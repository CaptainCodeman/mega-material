import { LitElement, html, customElement } from 'lit-element';
import { elevationStyle } from './styles';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-surface': SurfaceElement;
  }
}


@customElement('mwc-surface')
export class SurfaceElement extends LitElement {
  static get styles() {
    return [
      elevationStyle
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}
