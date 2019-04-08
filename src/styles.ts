import { css } from "lit-element";

export const hiddenStyle = css`
:host([hidden]) {
  display: none;
}

[hidden] {
  display: none;
}`

export const rippleStyle = css`
mwc-ripple {
  position: absolute;
  border-radius: inherit;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`
