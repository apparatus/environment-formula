'use strict'
const wiring = require('./wiring')
const config = require('./config')
const one = require('./actions/one')
const two = require('./actions/two')
const dev = config.dev && require('../dev')

wiring(config, service, ready)

function service (ctx) {
  const {mu} = ctx
  const {name} = config

  mu.define({role: name, cmd: 'one'}, one(ctx), `
    a third arg can optionally be passed to define
    which docs generator will use as a description 
  `)

  mu.define({role: name, cmd: 'two'}, two(ctx), `
    description of cmd two...
  `)
}

function ready (err, ctx) {
  const {mu} = ctx
  const {name} = config

  if (err) { throw err }

  if (dev) { dev(ctx) }

  mu.log.info(`${name} service started`)
}

// restify or similar (express, fastify):
// function service (ctx) {
//   const {server} = ctx
//   const {name} = config

//   server.post(`/${name}/one`, one(ctx))

//   server.post(`/${name}/two`, two(ctx))

// }

// function ready (err, ctx) {
//   const {logger} = ctx
//   const {name} = config
//   if (err) { throw err }
//   logger.info(`${name} service started`)
// }

module.exports = require('mu')
