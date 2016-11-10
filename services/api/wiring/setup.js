'use strict'

const inert = require('inert')
const h2o2 = require('h2o2')
const tcp = require('mu-tcp')

module.exports = setup

function setup (ctx, opts, cb) {
  const {server, mu} = ctx
  const {env} = opts

  mu.outbound({role: 'frontend'}, tcp.client({
    port: env.FRONTEND_PORT,
    host: env.FRONTEND_HOST
  }))

  mu.outbound({role: 'service-name'}, tcp.client({
    port: env.SERVICE_NAME_PORT,
    host: env.SERVICE_NAME_HOST
  }))

  server.register([inert, h2o2], function (err) {
    if (err) { return cb(err) }
    server.start(cb)
  })
}
