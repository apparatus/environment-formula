'use strict'

const wiring = require('./wiring')

module.exports = function (server) {
  server.route({
    method: 'GET',
    path: '/service-name/cmd/',
    handler: (request, reply) => { wiring.handleCmd(request, reply) }
  })
}
