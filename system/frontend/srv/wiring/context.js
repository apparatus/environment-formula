'use strict'

const createMu = require('mu')
// const restify = require('restify')

module.exports = context

function context (opts, cb) {
  const ctx = {
    mu: createMu(opts)
  }
  // restify:
  // const ctx = {
  //   server: restify.createServer(opts.server),
  //   client: restify.createJsonClient(opts.api)
  // }

  cb(null, ctx)
}
