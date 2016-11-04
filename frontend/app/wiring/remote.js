const browserify = require('browserify')

module.exports = (args, cb) => browserify()
  .add(require.resolve('../'))
  .bundle((err, buf) => {
    if (err) return console.error(err)
    cb(null, buf.toString())
  })