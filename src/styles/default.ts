import { css } from "lit-element";

export const defaultCSS = css`
:host {
  display: block;
}

:host([hidden]) {
  display: none;
}

[hidden] {
  display: none;
}
`
