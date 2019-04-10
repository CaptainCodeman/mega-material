'use strict';

import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

// assume production mode for normal build, dev if watched
// flag is used to enable / disable HTML & JS minification
const production = !process.env.ROLLUP_WATCH;
const plugins = [
  resolve(),
  production && minifyHTML(),
  typescript({ typescript: require('typescript') }),
  production && terser({
    compress: {
      passes: 2,
    },
    mangle: {
      properties: {
        regex: /_$/,
      },
    },
    output: {
      beautify: false,
    },
    sourcemap: true,
  }),
];

export default [{
  input: [
    'src/button.ts',
    'src/card.ts',
    'src/checkbox.ts',
    'src/chips.ts',
    'src/drawer.ts',
    'src/fab.ts',
    'src/icon.ts',
    'src/icon-button.ts',
    'src/linear-progress.ts',
    'src/list.ts',
    'src/notched-outline.ts',
    'src/ripple.ts',
    'src/slider.ts',
    'src/switch.ts',
    'src/snackbar.ts',
    'src/tabs.ts',
    'src/textfield.ts',
    'src/top-app-bar.ts',
    // for simplified testing things out:
    'src/scratch.ts',
  ],
  output: {
    dir: 'docs',
    format: 'esm',
    sourcemap: false,
    entryFileNames: '[name].js',
    chunkFileNames: 'common.js',
  },
  plugins,
}, {
  input: [
    'src/button.ts',
    'src/card.ts',
    'src/checkbox.ts',
    'src/chips.ts',
    'src/drawer.ts',
    'src/fab.ts',
    'src/icon.ts',
    'src/icon-button.ts',
    'src/linear-progress.ts',
    'src/list.ts',
    'src/notched-outline.ts',
    'src/ripple.ts',
    'src/slider.ts',
    'src/switch.ts',
    'src/snackbar.ts',
    'src/tabs.ts',
    'src/textfield.ts',
    'src/top-app-bar.ts',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: false,
    entryFileNames: '[name].js',
    chunkFileNames: 'common.js',
  },
  external: [
    'tslib',
    'lit-html',
    'lit-element',
  ],
  plugins,
}, {
  input: 'src/index.ts',
  output: {
    file: 'dist/' + pkg.browser,
    format: 'iife',
    name: 'MegaMaterial',
    sourcemap: false,
  },
  plugins,
}]
