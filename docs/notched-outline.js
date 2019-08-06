import{L as e,d as t,c as a,h as o,_ as l,p as i,a as d}from"./common.js";let n=class extends e{static get styles(){return[t,a`:host{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none;outline:0;contain:content}.leading,.notch,.trailing{box-sizing:border-box;height:100%;transition:border 150ms cubic-bezier(.4,0,.2,1);border-top:1px solid;border-bottom:1px solid;pointer-events:none}.leading{border-left:1px solid;border-right:none;width:12px}.trailing{border-left:none;border-right:1px solid;flex-grow:1}.notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}::slotted(label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.float-above){text-overflow:clip;max-width:calc(100% / .75)}.notch{padding-left:0;padding-right:8px;border-top:none}:host(:not([notch])) .notch{padding:0}:host(:not(:disabled)) .leading,:host(:not(:disabled)) .notch,:host(:not(:disabled)) .trailing{border-color:rgba(0,0,0,.24)}:host(:not(:disabled):not(:focus):hover) .leading,:host(:not(:disabled):not(:focus):hover) .notch,:host(:not(:disabled):not(:focus):hover) .trailing{border-color:rgba(0,0,0,.87)}:host(:not(:disabled):focus) .leading,:host(:not(:disabled):focus) .notch,:host(:not(:disabled):focus) .trailing{border-color:var(--mega-theme-primary,#6200ee)}.mega-text-field--outlined .mega-floating-label--shake{animation:mega-floating-label-shake-float-above-text-field-outlined 250ms 1}.leading{border-radius:4px 0 0 4px}.trailing{border-radius:0 4px 4px 0}.mega-text-field--outlined .mega-floating-label--float-above{transform:translateY(-144%) scale(1)}.mega-text-field--outlined .mega-floating-label--float-above{font-size:.75rem}.mega-text-field--outlined .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--outlined.mega-notched-outline--upgraded .mega-floating-label--float-above{transform:translateY(-130%) scale(.75)}.mega-text-field--outlined .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--outlined.mega-notched-outline--upgraded .mega-floating-label--float-above{font-size:1rem}:host(:focus) .leading,:host(:focus) .notch,:host(:focus) .trailing{border-width:2px}:host(:disabled){background-color:transparent}:host(:disabled) .leading,:host(:disabled) .notch,:host(:disabled) .trailing{border-color:rgba(0,0,0,.06)}.mega-text-field--outlined.mega-text-field--dense .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--outlined.mega-text-field--dense.mega-notched-outline--upgraded .mega-floating-label--float-above{transform:translateY(-120%) scale(.8)}.mega-text-field--outlined.mega-text-field--dense .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--outlined.mega-text-field--dense.mega-notched-outline--upgraded .mega-floating-label--float-above{font-size:1rem}.mega-text-field--with-leading-icon.mega-text-field--outlined .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-notched-outline--upgraded .mega-floating-label--float-above{transform:translateY(-130%) translateX(-32px) scale(.75)}.mega-text-field--with-leading-icon.mega-text-field--outlined .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-notched-outline--upgraded .mega-floating-label--float-above{font-size:1rem}.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense.mega-notched-outline--upgraded .mega-floating-label--float-above{transform:translateY(-120%) translateX(-21px) scale(.8)}.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense .mega-notched-outline--upgraded .mega-floating-label--float-above,.mega-text-field--with-leading-icon.mega-text-field--outlined.mega-text-field--dense.mega-notched-outline--upgraded .mega-floating-label--float-above{font-size:1rem}`]}render(){return o`<div class=leading></div><div class=notch><slot></slot></div><div class=trailing></div>`}};l([i({type:Boolean,reflect:!0})],n.prototype,"notch",void 0),l([i({type:Number,attribute:"notch-width"})],n.prototype,"notchWidth",void 0),l([i({type:Boolean,reflect:!0})],n.prototype,"disabled",void 0),n=l([d("mega-notched-outline")],n);export{n as NotchedOutlineElement};
