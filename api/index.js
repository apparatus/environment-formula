const wiring = require('./wiring')
const serviceName = require('./services/service-name')
const {router} = wiring

wiring(api)

function api (mu, server, ready) {
  const register = router(server)

  // here we initialize the service mediators
  // transports and routes are setup
  // in each service mediator
  // see the services folder for more
  
  serviceName(mu, register)

  ready()
}


