const browserify = require('browserify')
const builtins = {_process: require('browserify/lib/builtins')._process}
const {name} = require('../config')

var cached = ''

module.exports = (args, cb) => {
  if (cached) return cb(null, cached)
  bundle(null, (err, code) => {
    cached = code
    cb(null, cached)
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
