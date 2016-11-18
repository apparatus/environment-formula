'use strict'
const context = require('./context')
const setup = require('./setup')

module.exports = wiring

function wiring (opts, service, ready) {
  context(opts.context, init)

  function init (err, ctx) {
    if (err) return ready(err)
    setup(ctx, opts.setup, (err) => {
      service(ctx)
      ready(err, ctx)
    })
  }
}

