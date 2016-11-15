const falafel = require('falafel')
const through = require('through2')

const LOAD_REQUIRE = './wiring/load'

module.exports = function (file, opts) {
  if (/\.json$/.test(file)) return through()
  var bufs = []
  var ns
  return through(write, end)

  function write (buf, enc, next) {
    bufs.push(buf)
    next()
  }
  function end () {
    var src = Buffer.concat(bufs).toString('utf8')
    this.push(falafel(src, { ecmaVersion: 6 }, walk).toString())
    this.push(null)
  }
  function walk (node) {
    if (node.type === 'CallExpression') {
      if (node.callee && node.callee.name === 'require' &&
        node.arguments.length === 1 && node.arguments[0].value === LOAD_REQUIRE) {
        ns = node.parent.id.name
        node.update('0')
      }
      if (ns && node.callee && node.callee.name === ns) {
        /* eslint no-new-func: 0 */
        node.update(
          `var ${ns} = ${node.arguments[2].source()}\n` +
          '  load(null, {' +
          Function('return ' + node.arguments[0].source())()
            .map((n) => `'${n}': require('../../${n}/cmp')(${node.arguments[1].source()})`)
            .join('\n') +
          '})'
        )

      }
    }
  }
}
