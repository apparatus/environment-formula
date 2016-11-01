'use strict'
const tcp = require('mu/drivers/tcp')

module.exports = setup

function setup (ctx, opts, cb) {
  ctx.server.start(cb)
}