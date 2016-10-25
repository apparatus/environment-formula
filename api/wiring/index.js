'use strict'

const mu = require('mu')()
const tcp = require('mu/drivers/tcp')

mu.outbound({role: 'service-name'}, tcp.client({port: process.env.SERVICE_NAME_PORT, host: process.env.SERVICE_NAME_HOST}))

module.exports = {
  handleCmd: (request, reply) => {
    mu.dispatch({role: 'service-name', cmd: 'cmd'}, function (err, res) {
      reply({result: err ? 'error' : res, err: err})
    })
  }
}
