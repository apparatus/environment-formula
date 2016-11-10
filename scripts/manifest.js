const {resolve, join, relative, parse, basename} = require('path')
const proxyquire = require('proxyquire').noPreserveCache()
const {api, servicesDir, serviceMediatorDir, componentMarker} = require('./config')
const dir = resolve(__dirname, '..', api)

require(dir)

module.exports = (issues) => {
  const list = Object.keys(require.cache)
    .filter((f) => f.match(join(dir, serviceMediatorDir)))
    .map((f) => relative(join(dir, serviceMediatorDir), f))
    .map((f) => resolve(__dirname, '..', servicesDir, parse(f).name))

  const fullstackers = list.map((service) => {
    var mediator = join(resolve(__dirname, '..', api, serviceMediatorDir), basename(service) + '.js')
    var cmp
    mediator = proxyquire(mediator, {
      [componentMarker]: ({name}, ctx, opts) => {
        if ((opts && opts.remoteInProd)) { return }
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
    return {name: basename(service), service, cmp: join(service, 'cmp'), srv: join(service, 'srv')}
  }).filter(Boolean)

  return fullstackers
}
