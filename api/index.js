const wiring = require('./wiring')
const {router} = wiring

const serviceName = require('./services/service-name')
// const anotherService = require('./services/another-service')

wiring(api)

function api (mu, server, ready) {
  const register = router(server)

  // here we initialize the service mediators
  // transports and routes are setup
  // in each service mediator
  // see the services folder for more
  
  serviceName(mu, register)
  // anotherService(mu, register)

  ready()
}


