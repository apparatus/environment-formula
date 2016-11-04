const falafel = require('falafel')
const through = require('through2')
const hyperx = require('hyperx')

const MELD_REQUIRE = './wiring/meld'
const DOM_GEN_FN = 'require("react").createElement'

module.exports = function (file, opts) {
  if (/\.json$/.test(file)) return through()
  var bufs = []
  var h = null, mname = null, tfn = null
  var hx = hyperx(function (tagName, opts, children) {
    if (!h) return null
    var sopts = []
    Object.keys(opts).forEach(function (key) {
      if (opts[key] && typeof opts[key] === 'object'
      && opts[key]._expr !== undefined) {
        sopts.push(JSON.stringify(key) + ':' + opts[key]._expr)
      } else {
        sopts.push(JSON.stringify(key) + ':' + JSON.stringify(opts[key]))
      }
    })
    return { _expr: h + '(' + JSON.stringify(tagName)
      + ',{' + sopts.join(',') + '}'
      + (children && children.length ? (',[' + children.map(child).join(',') + ']') : '')
      + ')' }
  }, { concat: concat })
  return through(write, end)

  function concat (a, b) {
    var aexpr, bexpr, count = 0
    if (a && typeof a === 'object' && a._expr !== undefined) {
      aexpr = '(' + a._expr + ')'
      count++
    } else {
      aexpr = JSON.stringify(a)
    }
    if (b && typeof b === 'object' && b._expr !== undefined) {
      bexpr = '(' + b._expr + ')'
      count++
    } else {
      bexpr = JSON.stringify(b)
    }
    if (count === 0) return String(a) + String(b)
    return { _expr: aexpr + '+' + bexpr }
  }

  function child (c) {
    if (c && typeof c === 'object' && c._expr !== undefined) {
      return c._expr
    } else return JSON.stringify(c)
  }

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
    if (node.type === 'TemplateLiteral'
    && node.parent.tag && node.parent.tag.name === tfn) {
      var args = [ node.quasis.map(cooked) ]
        .concat(node.expressions.map(expr))
      var res = hx.apply(null, args)
      if (!res) return
      node.parent.update(res._expr)
    } else if (node.type === 'CallExpression'
    && node.callee && node.callee.name === 'require'
    && node.arguments.length === 1
    && node.arguments[0].value === MELD_REQUIRE) {
      if (node.parent.type === 'VariableDeclarator') {
        tfn = node.parent.id.name
      }
      h = tfn
      node.update(DOM_GEN_FN)
    }
  }
}

function cooked (node) { return node.value.cooked }
function expr (ex) { return { _expr: ex.source() } }
