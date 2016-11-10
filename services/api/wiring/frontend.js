'use strict'

module.exports = frontend

// convenience function, applies the normal
// case for hooking up a microservice frontend
// with an api call.
// See the services folder for a usage

function frontend (ctx, opts) {
  const {mu, server} = ctx
  const staticDir = opts.staticDir
  const filename = opts.filename || 'app.js'

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {path: staticDir}
    }
  })

  server.route({
    method: 'GET',
    path: `/${filename}`,
    handler: (request, reply) => {
      mu.dispatch({role: 'frontend', cmd: 'app'},
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

  server.route({
    method: 'GET',
    path: '/styles.css',
    handler: (request, reply) => {
      mu.dispatch({role: 'frontend', cmd: 'styles'},
        function (err, res) {
          if (err) {
            reply(mu.error.wrap(err))
            return
          }
          reply(res.payload)
            .header('Content-Type', 'text/css')
        }
      )
    }
  })



}
