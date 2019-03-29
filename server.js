const bs = require('browser-sync').create();

const express = require('express')
const compression = require('compression')
const cache = require('express-cache-headers');
const transformMiddleware = require('express-transform-bare-module-specifiers').default;

const app = express()

app.use('/node_modules/*', cache(3600))
app.use(compression({ level: 9 }))
app.use(transformMiddleware())

bs.init({
  server: 'docs',
  index: 'index.html',
  files: [
    'index.html',
    '*.js',
  ],
  ghostMode: false,
  middleware: [app]
})
