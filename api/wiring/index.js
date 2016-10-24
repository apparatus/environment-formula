'use strict'

const mu = require('mu')()
const tcp = require('mu/drivers/tcp')

mu.outbound({role: 's1'}, tcp.client({port: process.env.SERVICE_PORT, host: process.env.SERVICE_HOST}))


function handleRoleCommand (role, command, request, reply) {
  mu.dispatch({role: role, cmd: command}, function (err, res) {
    reply({result: err ? 'error' : res, err: err})
  })
}

module.exports = {
  handleOne: (request, reply) => { handleRoleCommand('s1', 'one', request, reply) }
}
