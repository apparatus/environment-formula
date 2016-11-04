const fs = require('fs')

module.exports = frontend

// convenience function, applies the normal
// case for hooking up a microservice frontend
// with an api call. 
// See the services folder for a usage 

function frontend (ctx, opts) {
  const {mu, server} = ctx
  const name = opts.name
  const static = opts.static
  const file = opts.filename || 'app.js'
  const dev = opts.dev
  
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {path: static}
    }
  })

  server.route({
    method: 'GET',
    path: '/app.js',
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
}