const browserify = require('browserify')
const styles = require('./styles')
const builtins = {_process: require('browserify/lib/builtins')._process}
const {name} = require('../config')

var cached = ''
var cachedCss = ''

module.exports = (args, cb) => {
  if (cached) return cb(null, cached)
  bundle(null, (err, code) => {
    if (err) return cb(err)
    cached = code
    cb(null, code)
  })
}

bundle(null, (err, code) => cached = code)

function bundle (args, cb) {
  browserify({builtins: builtins, standalone: name})
    .add(require.resolve('../'))
    .bundle((err, buf) => {
      if (err) return console.error(err)
      cb(null, buf.toString())
    }) 
}

module.exports.styles = (args, cb) => {
  if (cachedCss) return cb(null, cachedCss)
  styles(args, (err, css) => {
    if (err) return cb(err)
    cachedCss = css
    cb(null, css)
  }) 
}

