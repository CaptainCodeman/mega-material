import { LitElement, html, customElement, css, property, PropertyValues, query } from 'lit-element';
import { nothing } from 'lit-html';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-theme': ThemeElement;
  }
}

@customElement('mwc-theme')
export class ThemeElement extends LitElement {
  static get styles() {
    return [
      css`
:root {
  --mdc-theme-primary: #6200ee;
  --mdc-theme-secondary: #018786;
  --mdc-theme-background: #fff;
  --mdc-theme-surface: #fff;
  --mdc-theme-on-primary: #fff;
  --mdc-theme-on-secondary: #fff;
  --mdc-theme-on-surface: #000;
  --mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-dark: #fff;
  --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
  --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);

  --mwc-primary: #6200EE;
  --mwc-primary-dark: #3700B3;
  --mwc-primary-light: #BB86FC;

  --mwc-secondary: #03DAC6;
  --mwc-secondary-dark: #018786;
  --mwc-secondary-light: #018786;

  --mwc-background: #FFFFFF;
  --mwc-surface: #FFFFFF;
  --mwc-error: #B00020;

  --mwc-on-primary: #FFFFFF;
  --mwc-on-secondary: #000000;
  --mwc-on-background: #000000;
  --mwc-on-surface: #000000;
  --mwc-on-error: #FFFFFF;
}

/*
.mdc-theme--primary {
  color: var(--mdc-theme-primary, #6200ee) !important;
}

.mdc-theme--secondary {
  color: var(--mdc-theme-secondary, #018786) !important;
}

.mdc-theme--background {
  background-color: var(--mdc-theme-background, #fff);
}

.mdc-theme--surface {
  background-color: var(--mdc-theme-surface, #fff);
}

.mdc-theme--on-primary {
  color: var(--mdc-theme-on-primary, #fff) !important;
}

.mdc-theme--on-secondary {
  color: var(--mdc-theme-on-secondary, #fff) !important;
}

.mdc-theme--on-surface {
  color: var(--mdc-theme-on-surface, #000) !important;
}

.mdc-theme--text-primary-on-background {
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)) !important;
}

.mdc-theme--text-secondary-on-background {
  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)) !important;
}

.mdc-theme--text-hint-on-background {
  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-disabled-on-background {
  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-icon-on-background {
  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-primary-on-light {
  color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)) !important;
}

.mdc-theme--text-secondary-on-light {
  color: var(--mdc-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)) !important;
}

.mdc-theme--text-hint-on-light {
  color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-disabled-on-light {
  color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-icon-on-light {
  color: var(--mdc-theme-text-icon-on-light, rgba(0, 0, 0, 0.38)) !important;
}

.mdc-theme--text-primary-on-dark {
  color: var(--mdc-theme-text-primary-on-dark, white) !important;
}

.mdc-theme--text-secondary-on-dark {
  color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)) !important;
}

.mdc-theme--text-hint-on-dark {
  color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mdc-theme--text-disabled-on-dark {
  color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mdc-theme--text-icon-on-dark {
  color: var(--mdc-theme-text-icon-on-dark, rgba(255, 255, 255, 0.5)) !important;
}

.mdc-theme--primary-bg {
  background-color: var(--mdc-theme-primary, #6200ee) !important;
}

.mdc-theme--secondary-bg {
  background-color: var(--mdc-theme-secondary, #018786) !important;
}
*/
`
    ]
  }
}
