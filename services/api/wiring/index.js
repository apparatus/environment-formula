'use strict'
const context = require('./context')
const frontend = require('./frontend')
const setup = require('./setup')

module.exports = wiring

function wiring (opts, api, ready) {
  const {dev} = opts

  context(opts.context, init)

  function init (err, ctx) {
    if (err) return ready(err)
    api(ctx)
    setup(ctx, opts.setup, (err) => {
      if (dev) {
        // in production, static hosting should not
        // be handled in node (e.g. use nginx, etc.)
        frontend(ctx, opts.frontend)
      }

      ready(err, ctx)
    })
  }
}
