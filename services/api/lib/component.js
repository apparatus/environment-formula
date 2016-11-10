module.exports = component

// convenience function, applies the normal
// case for hooking up a microservice component
// with an api call.
// See the services folder for a usage

function component (opts, ctx) {
  const {mu, server} = ctx
  const name = opts.name
  const file = opts.filename || 'cmp.js'
  const dev = mu.DEV_MODE
  if (opts.remoteInProd || !dev) {
    // we do not expose components in production
    // (the build process assembles them into a single package)
    // unless explicitly instructed with remoteInProd
    // (as a ui architecture decision)
    return
  }
  server.route({
    method: 'GET',
    path: '/service-name/' + file,
    handler: (request, reply) => {
      mu.dispatch({role: name, cmd: 'component'},
        function (err, res) {
          if (err) {
            reply(mu.error.wrap(err))
            return
          }
          reply(res.payload)
            .header('Content-Type', 'text/javascript')
        }
      )
    }
  })
}
