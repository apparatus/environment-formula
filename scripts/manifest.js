const {resolve, join, relative, parse, basename} = require('path')
const proxyquire = require('proxyquire').noPreserveCache()
const {
  apiDir, servicesDir, systemDir, targets, componentMarker, frontendNs
} = require('./config')
const dir = resolve(__dirname, apiDir)

require(join(dir, 'node_modules', 'hapi')).Server = function () {
  this.register = this.connection = function () {}
}

require(dir)

module.exports = (issues) => {
  const list = Object.keys(require.cache)
    .filter((f) => f.match(join(dir, targets)))
    .map((f) => relative(join(dir, targets), f))

  const targs = list.map((target) => {
    if (parse(target).name === frontendNs) {
      target = resolve(__dirname, systemDir, parse(target).name)
      return {
        name: basename(target),
        target: target,
        cmp: join(target, 'app'),
        srv: join(target, 'srv'),
        bundle: join(target, 'bundle'),
        static: join(target, 'static'),
        main: true
      }
    }
    
    target = resolve(__dirname, servicesDir, parse(target).name)

    var mediator = join(resolve(__dirname, apiDir, targets), basename(target) + '.js')
    var cmp
    mediator = proxyquire(mediator, {
      [componentMarker]: ({name}, ctx, opts) => {
        cmp = name
      }
    })
    mediator({mu: {outbound: () => {}}, server: {route: () => {}}})

    if (!cmp) return
    if (cmp !== parse(target).name) {
      issues.push({
        type: 'warning',
        msg: `component registered in ${target} mediator does not match name: "${cmp}" should be "${basename(target)}"`
      })
    }
    return {
      name: basename(target),
      target,
      cmp: join(target, 'cmp'),
      srv: join(target, 'srv'),
      bundle: join(target, 'bundle')
    }
  }).filter(Boolean)

  return targs
}
