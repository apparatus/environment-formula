const wiring = require('./wiring')
const serviceName = require('./services/service-name')

wiring(api)

function api ({mu, server, pattern}, ready) {
  serviceName(mu)

  server.route({
    method: 'GET',
    path: '/service-name/cmd/',
    handler: pattern({role: 'service-name', cmd: 'cmd'})
  })

  server.route({
    method: 'POST',
    path: '/service-name/cmd/',
    handler: pattern((payload) => ({
      role: 'service-name', 
      cmd: 'cmd',
      someUserValue: payload.someUserValue
    }))
  })

  ready()
}

