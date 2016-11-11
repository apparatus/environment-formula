const {resolve, join, relative, parse, basename} = require('path')
const proxyquire = require('proxyquire').noPreserveCache()
const {
  api, servicesDir, serviceMediatorDir, componentMarker, frontendNs
} = require('./config')
const dir = resolve(__dirname, '..', api)

require(join(dir, 'node_modules', 'hapi')).Server = function () {
  this.register = this.connection = function () {}
}

require(dir)

module.exports = (issues) => {
  const list = Object.keys(require.cache)
    .filter((f) => f.match(join(dir, serviceMediatorDir)))
    .map((f) => relative(join(dir, serviceMediatorDir), f))
    .map((f) => resolve(__dirname, '..', servicesDir, parse(f).name))

  const fullstackers = list.map((service) => {

    if (basename(service) === frontendNs) {
      return {
        name: basename(service),
        service: service,
        cmp: join(service, 'app'),
        srv: join(service, 'srv'),
        bundle: join(service, 'bundle'),
        static: join(service, 'static'),
        main: true
      }
    }

    var mediator = join(resolve(__dirname, '..', api, serviceMediatorDir), basename(service) + '.js')
    var cmp
    mediator = proxyquire(mediator, {
      [componentMarker]: ({name}, ctx, opts) => {
        cmp = name
      }
    })
    mediator({mu: {outbound: () => {}}, server: {route: () => {}}})

    if (!cmp) return
    if (cmp !== parse(service).name) {
      issues.push({
        type: 'warning',
        msg: `component registered in ${service} mediator does not match name: "${cmp}" should be "${basename(service)}"`
      })
    }
    return {
      name: basename(service),
      service,
      cmp: join(service, 'cmp'),
      srv: join(service, 'srv'),
      bundle: join(service, 'bundle')
    }
  }).filter(Boolean)

  return fullstackers
}
