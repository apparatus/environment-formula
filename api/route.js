'use strict'

const wiring = require('./wiring')

module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/service1/action1/',
    handler: (request, reply) => { wiring.handleOne(request, reply) }
  })
}
