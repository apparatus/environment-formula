'use strict'
const tcp = require('mu-tcp')

module.exports = setup

function setup (ctx, opts, cb) {
  const {mu} = ctx

  mu.inbound('*', tcp.server(opts))

  cb()
}

// restify:
// const someMiddleware = require('some-middleware')

// function setup (ctx, opts, cb) {
//   const {server} = ctx

//   server.use(someMiddleware())

//   server.listen(opts.port, opts.host, cb)

// }
