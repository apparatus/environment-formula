const browserify = require('browserify')
const builtins = {_process: require('browserify/lib/builtins')._process}
const {name} = require('../package.json')

module.exports = bundle

function bundle (opts) {
  var cached = ''

  if (opts.dev) {
    make((err, code) => {
      if (err) {
        console.warn('Unable to create initial bundle', err)
        return
      }
      cached = code
    })
  }

  return cmp

  function cmp (cb) {
    if (cached) return cb(null, cached)
    return make(cb && ((err, code) => {
      if (err) return cb(err)
      if (opts.dev) cached = code
      cb(null, code)
    }))
  }

  function make (cb) {
    var build = browserify(Object.assign(
      {builtins: builtins, standalone: opts.dev && name},
      opts
    ))

    build.add(require.resolve('../cmp'))

    if (!cb) return build.bundle()

    build.bundle((err, buf) => {
      if (err) return cb(err)
      buf = buf.toString()
      cb(null, buf)
    })
  }

}
