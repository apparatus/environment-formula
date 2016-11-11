'use strict'

const proxy = require('../lib/proxy')

const name = 'polyfill'

const env = process.env

module.exports = polyfill

// the role here is to mediate between the api layer
// and the service layer. The service mediators are
// loaded and initialized in api's root index.js file

function polyfill (ctx) {
  const {server} = ctx

  const handle = proxy()

  server.route({
    method: 'GET',
    path: `/${name}.min.js`,
    handler: handle({
      host: env.POLYFILL_HOST,
      port: env.POLYFILL_PORT,
      route: '/v2/polyfill.min.js'
    })
  })

  server.route({
    method: 'GET',
    path: `/${name}.js`,
    handler: handle({
      host: env.POLYFILL_HOST,
      port: env.POLYFILL_PORT,
      route: '/v2/polyfill.js'
    })
  })
}

