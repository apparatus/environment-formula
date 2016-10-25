'use strict'
const mu = require('mu')()
const hapi = require('hapi')
const port = process.env.API_PORT
const host = process.env.API_HOST

// any specific hapi or mu setup is 
// performed in wiring, and the resulting
// instances of mu and the hapi server are
// passed back to the top level (index.js)

function wiring (cb) {

  const server = new hapi.Server()
  server.connection({ host: host, port: port })
  cb(mu, server, () => server.start(() => {
    console.log('hapi server listening on port: ' + port)
  }))
}

wiring.router = (server) => (route) => server.route(route)

module.exports = wiring
