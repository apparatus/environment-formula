const tcp = require('mu/drivers/tcp')
const component = require('../lib/component')
const pattern = require('../lib/pattern')

const env = process.env
const opts = {
  port: env.SERVICE_NAME_PORT,
  host: env.SERVICE_NAME_HOST
}

const name = 'service-name'

module.exports = serviceName

// the role here is to mediate between the api layer
// and the service layer. The service mediators are
// loaded and initialized in api's root index.js file

function serviceName (ctx) {
  const {mu, server} = ctx

  const handle = pattern(mu)

  // set up transport pattern routing
  
  mu.outbound({role: name}, tcp.client(opts))

  // set up the component
  component({name}, ctx)

  // if we want to remotely load a component in 
  // production (instead of building it into app payload)
  // we can pass `remoteInProd` as true
  // ```
  // component({name, remoteInProd: true}, ctx)
  // ```

  // set up API routes for services

  server.route({
    method: 'GET',
    path: '/service-name/one',
    handler: handle({role: name, cmd: 'one'})
  })

  // we can pass a function to `handle` to extract
  // required items from the request body (payload)

  server.route({
    method: 'POST',
    path: '/service-name/two',
    handler: handle((payload) => ({
      role: name, 
      cmd: 'two',
      someUserValue: payload.someUserValue
    }))
  })

  // without pattern handle sugar:
  // 
  // server.route({
  //   method: 'GET',
  //   path: '/service-name/cmd',
  //   handler: (request, reply) => {
  //     mu.dispatch(pat, function (err, res) {
  //       reply({result: err ? 'error' : res, err: err})
  //     })
  //   } 
  // })
}

