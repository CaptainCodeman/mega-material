import { LitElement, html, customElement, css, property, PropertyValues, query } from 'lit-element';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mega-theme': ThemeElement;
  }
}

@customElement('mega-theme')
export class ThemeElement extends LitElement {
  static get styles() {
    return [
      css`
:root {
  --mega-theme-primary: #6200ee;
  --mega-theme-secondary: #018786;
  --mega-theme-background: #fff;
  --mega-theme-surface: #fff;
  --mega-theme-on-primary: #fff;
  --mega-theme-on-secondary: #fff;
  --mega-theme-on-surface: #000;
  --mega-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
  --mega-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
  --mega-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
  --mega-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
  --mega-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
  --mega-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
  --mega-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
  --mega-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
  --mega-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
  --mega-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
  --mega-theme-text-primary-on-dark: #fff;
  --mega-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
  --mega-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
  --mega-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
  --mega-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);

  --mega-primary: #6200EE;
  --mega-primary-dark: #3700B3;
  --mega-primary-light: #BB86FC;

  --mega-secondary: #03DAC6;
  --mega-secondary-dark: #018786;
  --mega-secondary-light: #018786;

  --mega-background: #FFFFFF;
  --mega-surface: #FFFFFF;
  --mega-error: #B00020;

  --mega-on-primary: #FFFFFF;
  --mega-on-secondary: #000000;
  --mega-on-background: #000000;
  --mega-on-surface: #000000;
  --mega-on-error: #FFFFFF;
}

/*
.mega-theme--primary {
  color: var(--mega-theme-primary, #6200ee) !important;
}

.mega-theme--secondary {
  color: var(--mega-theme-secondary, #018786) !important;
}

.mega-theme--background {
  background-color: var(--mega-theme-background, #fff);
}

.mega-theme--surface {
  background-color: var(--mega-theme-surface, #fff);
}

.mega-theme--on-primary {
  color: var(--mega-theme-on-primary, #fff) !important;
}

.mega-theme--on-secondary {
  color: var(--mega-theme-on-secondary, #fff) !important;
}

.mega-theme--on-surface {
  color: var(--mega-theme-on-surface, #000) !important;
}

.mega-theme--text-primary-on-background {
  color: var(--mega-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)) !important;
}

.mega-theme--text-secondary-on-background {
  color: var(--mega-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)) !important;
}

.mega-theme--text-hint-on-background {
  color: var(--mega-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-disabled-on-background {
  color: var(--mega-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-icon-on-background {
  color: var(--mega-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-primary-on-light {
  color: var(--mega-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)) !important;
}

.mega-theme--text-secondary-on-light {
  color: var(--mega-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)) !important;
}

.mega-theme--text-hint-on-light {
  color: var(--mega-theme-text-hint-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-disabled-on-light {
  color: var(--mega-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-icon-on-light {
  color: var(--mega-theme-text-icon-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mega-theme--text-primary-on-dark {
  color: var(--mega-theme-text-primary-on-dark, white) !important;
}

.mega-theme--text-secondary-on-dark {
  color: var(--mega-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)) !important;
}

.mega-theme--text-hint-on-dark {
  color: var(--mega-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mega-theme--text-disabled-on-dark {
  color: var(--mega-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mega-theme--text-icon-on-dark {
  color: var(--mega-theme-text-icon-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mega-theme--primary-bg {
  background-color: var(--mega-theme-primary, #6200ee) !important;
}

.mega-theme--secondary-bg {
  background-color: var(--mega-theme-secondary, #018786) !important;
}
*/
`
    ]
  }
}
