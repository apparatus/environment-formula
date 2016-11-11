const fs = require('fs')
const path = require('path')
const build = require('tachyons-build-optimal-css')
const styles = path.join(__dirname, '..', 'app', 'css', 'index.css')
const input = fs.readFileSync(styles, 'utf8')

module.exports = (opts, cb) => {
  build(input, {
    from: styles,
    to: 'styles.css',
    minify: !opts.dev,
    whitelist: opts.whitelist,
    stripComments: true
  }).then(result => {
    if (result.messages) {
      result.messages
        .filter((msg) => msg.type === 'warning')
        .forEach(({plugin, type, text}) => console.warn(plugin, type, text))
    }
    cb(null, result.css)
  }).catch(cb)
}
