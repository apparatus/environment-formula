'use strict'

const config = require('../config')
const opts = config.frontend

module.exports = frontend

function frontend (ctx) {
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
