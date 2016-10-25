'use strict'
const mu = require('mu')()
const hapi = require('hapi')

function wiring (cb) {
  const port = process.env.API_PORT
  const host = process.env.API_HOST
  const server = new hapi.Server()
  server.connection({ host: host, port: port })
  cb({mu, server, pattern}, () => server.start(() => {
    console.log('hapi server listening on port: ' + port)
  }))

  function pattern () {
    return (pat) => (request, reply) => {
      if (typeof pat === 'function') {
        pat = pat(request.payload)
      }
      mu.dispatch(pat, function (err, res) {
        reply({result: err ? 'error' : res, err: err})
      })
    }
  }
}

module.exports = wiring
