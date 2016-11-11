'use strict'
const wiring = require('./wiring')
const config = require('./config')
const dev = config.dev && require('../dev')

wiring(config, ready)

function ready (err, ctx) {
  const {mu} = ctx
  const {name} = config

  if (err) { throw err }

  if (dev) { dev(ctx) }

  mu.log.info(`${name} service started`)
}


// function ready (err, ctx) {
//   const {logger} = ctx
//   const {name} = config
//   if (err) { throw err }
//   logger.info(`${name} service started`)
// }
