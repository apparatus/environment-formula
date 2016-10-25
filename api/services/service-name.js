const tcp = require('mu/drivers/tcp')
const patternMaker = require('../wiring/pattern')

const opts = {
  port: process.env.SERVICE_NAME_PORT,
  host: process.env.SERVICE_NAME_HOST
}

module.exports = serviceName

// the role here is to mediate between the api layer
// and the service layer. The service mediators are
// loaded and initialized in api's root index.js file

function serviceName (mu, register) {
  const pattern = patternMaker(mu)

  mu.outbound({role: 'service-name'}, tcp.client(opts))

  register({
    method: 'GET',
    path: '/service-name/a',
    handler: pattern({role: 'service-name', cmd: 'a'})
  })

  register({
    method: 'POST',
    path: '/service-name/b',
    handler: pattern((payload) => ({
      role: 'service-name', 
      cmd: 'b',
      someUserValue: payload.someUserValue
    }))
  })

  // without pattern sugar:
  // 
  // register({
  //   method: 'GET',
  //   path: '/service-name/cmd',
  //   handler: (request, reply) => {
  //     mu.dispatch(pat, function (err, res) {
  //       reply({result: err ? 'error' : res, err: err})
  //     })
  //   } 
  // })
}

