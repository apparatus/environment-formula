'use strict'

const wiring = require('./wiring')
const config = require('./config')
const {dev} = config

const serviceName = require('./targets/service-name')
const frontend = dev && require('./targets/frontend')

wiring(config, api, ready)

function api (ctx) {

  // transports and routes are setup
  // in each target mediator
  // see the targets folder for more

  serviceName(ctx)

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
