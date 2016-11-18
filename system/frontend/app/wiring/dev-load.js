// dynamically loads components into the ui
// in production the load function is statically
// converted into actually requiring the component
// so that components are bundled into a single app.js file

module.exports = load

function load (cmps, ctx, cb) {
  if (!registerDevReload.done) {
    registerDevReload(cmps, ctx, cb)
  }

  Promise.all(
    cmps.map(
      (cmp) => fetch(`${cmp}/cmp.js?cachebust=${Date.now()}`)
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

global.__devReload = () => {}
function registerDevReload (cmps, ctx, cb) {
  registerDevReload.done = true
  global.__devReload = ({data}) => {
    if (global.__devReload.locked) return

    if (data === 'full') {
      location.reload()
    }
    if (data === 'cmps') {
      global.__devReload.locked = true
      load(cmps, ctx, (...args) => {
        global.__devReload.locked = false
        cb(...args)
      })
    }
  }
}
