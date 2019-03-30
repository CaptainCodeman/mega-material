import{a as t,b as e,c as o,g as i,d as r,f as n,e as a}from"./common.js";import"./icon.js";import"./ripple.js";let s=class extends t{constructor(){super(...arguments),this.raised=!1,this.unelevated=!1,this.outlined=!1,this.dense=!1,this.disabled=!1,this.trailingIcon=!1,this.icon="",this.label=""}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}static get styles(){return[e`:host{display:inline-block;outline:0}button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;padding:0 8px 0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;height:36px;border:none;outline:0;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:hidden;vertical-align:middle;border-radius:var(--mdc-button-border-radius,4px)}button::-moz-focus-inner{padding:0;border:0}:host(:active) button{outline:0}:host(:hover) button{cursor:pointer}:host(:disabled) button{background-color:transparent;color:rgba(0,0,0,.37);cursor:default;pointer-events:none}:host(:not(:disabled)) button{background-color:transparent}mwc-icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] mwc-icon,mwc-icon[dir=rtl]{margin-left:8px;margin-right:0}:host(:not(:disabled)) button{color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.label+mwc-icon{margin-left:8px;margin-right:0}.label+mwc-icon[dir=rtl],[dir=rtl] .label+mwc-icon{margin-left:0;margin-right:8px}svg{fill:currentColor}:host([outlined]) mwc-icon,:host([raised]) mwc-icon,:host([unelevated]) mwc-icon{margin-left:-4px;margin-right:8px}:hos(t[raised]) mwc-icon[dir=rtl],:host([outlined]) mwc-icon[dir=rtl],:host([unelevated]) mwc-icon[dir=rtl],[dir=rtl] :host([outlined]) mwc-icon,[dir=rtl] :host([raised]) mwc-icon,[dir=rtl] :host([unelevated]) mwc-icon{margin-left:8px;margin-right:-4px}:host([outlined]) .label+mwc-icon,:host([raised]) .label+mwc-icon,:host([unelevated]) .label+mwc-icon{margin-left:8px;margin-right:-4px}:host([outlined]) .label+mwc-icon[dir=rtl],:host([raised]) .label+mwc-icon[dir=rtl],:host([unelevated]) .label+mwc-icon[dir=rtl],[dir=rtl] :host([outlined]) .label+mwc-icon,[dir=rtl] :host([raised]) .label+mwc-icon,[dir=rtl] :host([unelevated]) .label+mwc-icon{margin-left:-4px;margin-right:8px}:host([raised]) button,:host([unelevated]) button{padding:0 16px 0 16px}:host([raised]:disabled) button,:host([unelevated]:disabled) button{background-color:rgba(0,0,0,.12);color:rgba(0,0,0,.37)}:host([raised]:not(:disabled)) button,:host([unelevated]:not(:disabled)) button{background-color:#6200ee}:host([raised]:not(:disabled)) button,:host([unelevated]:not(:disabled)) button{color:#fff;color:var(--mdc-theme-on-primary,#fff)}:host([raised]) button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(.4,0,.2,1)}:host([raised]) button:focus,:host([raised]:hover) button{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}:host([raised]:active) button{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}:host([raised]:disabled) button{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}:host([outlined]) button{border-style:solid;padding:0 14px 0 14px;border-width:2px}:host([outlined]:disabled) button{border-color:rgba(0,0,0,.37)}:host([outlined]:not(:disabled)) button{border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee)}:host([dense]) button{height:32px;font-size:.8125rem}:host([raised]) mwc-ripple,:host([unelevated]) mwc-ripple{--mdc-ripple-fg-opacity:0.24}`]}render(){const t=o`<mwc-icon>${this.icon}</mwc-icon>`;return o`<mwc-ripple><button ?disabled=${this.disabled} aria-label=${this.label||this.icon}>${this.icon&&!this.trailingIcon?t:i} <span class=label>${this.label}</span> ${this.icon&&this.trailingIcon?t:i}<slot></slot></button></mwc-ripple>`}};r([n({type:Boolean,reflect:!0})],s.prototype,"raised",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"unelevated",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"outlined",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"dense",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"disabled",void 0),r([n({type:Boolean})],s.prototype,"trailingIcon",void 0),r([n({type:String})],s.prototype,"icon",void 0),r([n({type:String})],s.prototype,"label",void 0),s=r([a("mwc-button")],s);export{s as ButtonElement};
