const wiring = require('./wiring')
const config = require('./config')

const serviceName = require('./services/service-name')

wiring(config, api, ready)

function api (ctx) {
  const {server} = ctx

  // here we initialize the service mediators
  // transports and routes are setup
  // in each service mediator
  // see the services folder for more
  
  serviceName(ctx)
  // anotherService(ctx)


}

function ready (err, ctx) {
  const {mu, server} = ctx
  const {name} = config
  if (err) { throw err }
  mu.log.debug(server.info)
  mu.log.info('hapi server listening on port: ' + server.info.port)
}