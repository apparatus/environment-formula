const falafel = require('falafel')
const through = require('through2')

const LOAD_REQUIRE = './wiring/dev-load'

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
  var target 
  function walk (node) {
    if (node.type === 'CallExpression') {
      if (node.callee && node.callee.name === 'require' &&
        node.arguments.length === 1 && node.arguments[0].value === LOAD_REQUIRE) {
        ns = node.parent.id.name
        target = node
      }
      if (ns && node.callee && node.callee.name === ns) {
        /* eslint no-new-func: 0 */
        
        var errFound = node.arguments[2].body.body.some((n) => {
          if (
            n.type === 'IfStatement' && 
            n.test.type === 'Identifier' && 
            n.test.name === node.arguments[2].params[0].source()
          ) {
            n.update('')
            return true
          }
        })
        if (errFound) {
          node.arguments[2].update(node.arguments[2].source().replace(/(.*\()(.+),( )?/, '$1'))  
        }

        target.update(
          `${node.arguments[2].source()}\n` +
          `load(${errFound ? '' : 'null, '}{` +
          Function('return ' + node.arguments[0].source())()
            .map((n) => `'${n}': require('../../services/${n}/cmp')(${node.arguments[1].source()})`)
            .join('\n') +
          '})'
        )
        node.callee.update('')
        node.update('')
      }
    }
  }
}
