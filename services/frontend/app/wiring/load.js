module.exports = load

function load (cmps, ctx, cb) {
  Promise.all(
    cmps.map(
      (cmp) => fetch(`${cmp}/cmp.js`)
        .then((response) => response.text())
        .then((source) => create(cmp, source, ctx))
    )
  ).catch(cb).then((cmps) => {
    cb(null, cmps.reduce((o, cmp) => {
      o[cmp.name] = cmp.render
      return o
    }, {}))
  })
}

function create (cmp, source, ctx) {
  const {React} = ctx
  const module = {exports: {}}
  /* eslint no-new-func: 0 */
  Function('module', 'exports', source)(module, module.exports)
  const component = ((module.exports.__esModule)
    ? module.exports.default
    : module.exports)(ctx)

  return {
    name: cmp,
    render: function (props) {
      return React.createElement(component, props)
    }
  }
}
