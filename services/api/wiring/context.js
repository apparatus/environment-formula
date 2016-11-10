'use strict'
const hapi = require('hapi')
const createMu = require('mu')

module.exports = context

function context (opts, cb) {
  const server = new hapi.Server(opts.hapi.instantiation)
  server.connection(opts.hapi.connection)
  const ctx = {
    mu: createMu(opts.mu),
    server: server
  }
  cb(null, ctx)
}
