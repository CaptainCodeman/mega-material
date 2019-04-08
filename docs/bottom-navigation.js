import { a as LitElement, b as hiddenStyle, c as css, d as html, e as __decorate, g as property, f as customElement } from './common.js';
import './icon.js';
import './ripple.js';

let BottomNavigationElement = class BottomNavigationElement extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = 0;
    }
    select(item) {
        this.selected = item;
    }
    static get styles() {
        return [
            hiddenStyle,
            css `
:host {
  z-index: 8;
  display: block;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 56px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  pointer-events: none;
  background-color: #333;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

::slotted(*) {
  margin: 8px 12px 12px 12px;
  min-width: 80px;
  max-width: 168px;
  --mdc-icon-size: 24px;
  --mdc-theme-primary: #ccc;
}
`
        ];
    }
    render() {
        return html `
<slot></slot>`;
    }
};
__decorate([
    property({ type: Number, reflect: true })
], BottomNavigationElement.prototype, "selected", void 0);
BottomNavigationElement = __decorate([
    customElement('mwc-bottom-navigation')
], BottomNavigationElement);

export { BottomNavigationElement };
