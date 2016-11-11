const browserify = require('browserify')
const styles = require('./styles')
const builtins = {_process: require('browserify/lib/builtins')._process}
const {name} = require('../package.json')

module.exports = bundle

function bundle (opts) {
  var cached = ''
  var cachedCss = ''
  if (opts.dev) {
    make((err, code) => {
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
  }

  app.css = css

  return app

  function app (cb) {
    if (cached) return cb(null, cached)
    return make(cb && ((err, code) => {
      if (err) return cb(err)
      if (opts.dev) cached = code
      cb(null, code)
    }))
  }

  function make (cb) {
    var build = browserify(Object.assign(
      {
        builtins: builtins,
        standalone: opts.dev && name
      },
      opts
    ))

    build.add(require.resolve('../app'))

    if (!cb) return build.bundle()

    build.bundle((err, buf) => {
      if (err) return cb(err)
      buf = buf.toString()
      if (opts.dev) {
        buf += `
          ;(function dev () {
            var reload = new WebSocket('ws://localhost:35729')
            reload.onmessage = frontend.reload
            reload.onclose = dev
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
      if (opts.dev) cachedCss = css
      cb(null, css)
    })
  }
}
