import { css } from "lit-element";

// TODO: Add Roboto stylesheet automatically (?)
// <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">

export const typographyCSS = css`
:host {
  --typography-font-family: var(--typography-font-family, Roboto, sans-serif);
  --typography-moz-osx-font-smoothing: var(--typography-moz-osx-font-smoothing, grayscale);
  --typography-webkit-font-smoothing:var(--typography-webkit-font-smoothing, antialiased);
}

::slotted(.typography) {
  text-decoration: inherit;
  text-transform: inherit;
  font-family: var(--typography-font-family);
  -moz-osx-font-smoothing: var(--typography-moz-osx-font-smoothing);
  -webkit-font-smoothing: var(--typography-webkit-font-smoothing);
}

::slotted(.headline1) {
  font-size: 6rem;
  line-height: 6rem;
  font-weight: 300;
  letter-spacing: -0.01562em;
}

::slotted(.headline2) {
  font-size: 3.75rem;
  line-height: 3.75rem;
  font-weight: 300;
  letter-spacing: -0.00833em;
}

::slotted(.headline3) {
  font-size: 3rem;
  line-height: 3.125rem;
  font-weight: 400;
  letter-spacing: normal;
}

::slotted(.headline4) {
  font-size: 2.125rem;
  line-height: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.00735em;
}

::slotted(.headline5) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 400;
  letter-spacing: normal;
}

::slotted(.headline6) {
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
}

::slotted(.subtitle1) {
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
}

::slotted(.subtitle2) {
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 500;
  letter-spacing: 0.00714em;
}

::slotted(.body1) {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03125em;
}

::slotted(.body2) {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.01786em;
}

::slotted(.caption) {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.03333em;
}

::slotted(.button) {
  font-size: 0.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.08929em;
  text-decoration: none;
  text-transform: uppercase;
}

::slotted(.overline) {
  font-size: 0.75rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: 0.16667em;
  text-decoration: none;
  text-transform: uppercase;
}
`
