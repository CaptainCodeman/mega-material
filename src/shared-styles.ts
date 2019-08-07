import { css } from 'lit-element'

export const textfieldLabelStyle = css`
  label {
    font-size: 16px;
    font-weight: 400;
    color: #0009;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 6px;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(12px, 18px) scale(1);
    transform-origin: 0 0;
  }

  :host([focused]) label {
    color: var(--mega-theme-primary, #6200ee);
  }

  :host([disabled]) label {
    color: #9e9e9e;
  }
`
