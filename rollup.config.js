'use strict';

import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

// assume production mode for normal build, dev if watched
// flag is used to enable / disable HTML & JS minification
const production = !process.env.ROLLUP_WATCH;

export default {
  input: [
    'src/button.ts',
    'src/checkbox.ts',
    'src/icon.ts',
    'src/icon-button.ts',
    'src/linear-progress.ts',
    'src/ripple.ts',
    'src/top-app-bar.ts',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: 'common.js',
  },
  external: [
    'lit-html',
    'lit-html/directives/style-map',
    'lit-element',
    'tslib',
  ],
  plugins: [
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
  ]
}
