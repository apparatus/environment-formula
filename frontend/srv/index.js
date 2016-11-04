'use strict'
const wiring = require('./wiring')
const config = require('./config')
const app = require('../app/wiring/remote.js')

wiring(config, service, ready)

function service (ctx) {
  const {mu} = ctx
  const {name} = config

  mu.define({role: name, cmd: 'app'}, (args, cb) => {
    app(args, (err, payload) => {
      cb(null, {payload: payload})
    })
  })  

}

function ready (err, ctx) {
  const {mu} = ctx
  const {name} = config

  if (err) { throw err }
  mu.log.info(`${name} service started`)
}

// restify or similar (express, fastify):
// function service (ctx) {
//   const {server} = ctx
//   const {name} = config

//   server.get(`/${name}/app`, function (req, res) {
//     app(req.query, (err, payload) => {
//       cb(null, {payload: payload})
//     })
//   })

// }

// function ready (err, ctx) {
//   const {logger} = ctx
//   const {name} = config
//   if (err) { throw err }
//   logger.info(`${name} service started`)
// }
