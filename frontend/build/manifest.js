const {resolve, join, relative, parse, basename} = require('path')
const fs = require('fs')
const proxyquire = require('proxyquire').noPreserveCache()
const {api, services, apiComponentWiring} = require('./config')
const dir = resolve(__dirname, '..', '..', api)
require(dir)

module.exports = (issues) => {
  const list = Object.keys(require.cache)
    .filter((f) => f.match(join(dir, services)))
    .map((f) => relative(join(dir, services), f))
    .map((f) => resolve(__dirname, '..', '..', parse(f).name))

  const fullstackers = list.map((service) => {
    var mediator = join(resolve(__dirname, '..', '..', api, services), basename(service) + '.js')
    var cmp
    proxyquire(mediator, {
      [apiComponentWiring]: (name, mu, register, opts) => {
        if ((opts && opts.remoteInProd)) { return }
        cmp = name
      }
    })({outbound: () => {}}, () => {})
    if (!cmp) return
    if (cmp !== parse(service).name) {
      issues.push({
        type: 'warning',
        msg: `component registered in ${service} mediator does not match name: "${cmp}" should be "${basename(service)}"`
      })
    }
    return {name: basename(service), service, cmp: join(service, 'cmp'), srv: join(service, 'srv')}
  })

  return fullstackers
}