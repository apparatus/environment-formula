'use strict'

const wiring = require('./wiring')
const config = require('./config')
const {dev} = config

const polyfill = require('./services/polyfill')
const serviceName = require('./services/service-name')
const frontend = dev && require('./services/frontend')

wiring(config, api, ready)

function api (ctx) {

  // here we initialize the service mediators
  // transports and routes are setup
  // in each service mediator
  // see the services folder for more

  serviceName(ctx)

  // polyfill service
  // (https://github.com/Financial-Times/polyfill-service)
  polyfill(ctx)

  // in production, static hosting should not
  // be handled in node (e.g. use nginx, etc.)
  if (dev) frontend(ctx)

}

function ready (err, ctx) {
  const {mu, server} = ctx
  const {name} = config
  if (err) { throw err }
  mu.log.debug(server.info)
  mu.log.info(`${name} is listening on port: ${server.info.port}`)
}
