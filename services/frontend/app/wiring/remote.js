const browserify = require('browserify')
const styles = require('./styles')
const builtins = {_process: require('browserify/lib/builtins')._process}
const {name} = require('../config')

module.exports = remote

function remote (opts) {
  if (opts.dev) {
    var full = true
    var WebSocketServer = require('uws').Server
    var wss = new WebSocketServer({ port: 35729 })
    var sockets = []
    wss.on('connection', function (ws) {
      sockets.push(ws)
      ws.send(full ? 'full' : 'cmps')
      full = false
    })
  }

  var cached = ''
  var cachedCss = ''

  bundle((err, code) => {
    if (err) {
      console.warn('Unable to create initial bundle', err)
      return
    }
    cached = code
  })
  styles(opts, (err, css) => {
    if (err) {
      console.warn('Unable to create initial styles', err)
      return
    }
    cachedCss = css
  })

  html.css = css
  html.reload = () => sockets.forEach((s) => s.close())

  return html

  function html (cb) {
    if (cached) return cb(null, cached)
    bundle((err, code) => {
      if (err) return cb(err)
      cached = code
      cb(null, code)
    })
  }

  function bundle (cb) {
    browserify({builtins: builtins, standalone: opts.dev && name})
      .add(require.resolve('../'))
      .bundle((err, buf) => {
        if (err) return console.error(err)
        buf = buf.toString()
        if (opts.dev) {
          buf += `
            ;(function live() {
              var reload = new WebSocket('ws://localhost:35729')
              reload.onmessage = frontend.reload
              reload.onclose = setTimeout.bind(null, live, 500)
            }());
          `
        }
        cb(null, buf)
      })
  }

  function css (cb) {
    if (cachedCss) return cb(null, cachedCss)
    styles(opts, (err, css) => {
      if (err) return cb(err)
      cachedCss = css
      cb(null, css)
    })
  }
}
