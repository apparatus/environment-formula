const hapi = require('hapi')
const route = require('./route')

const server = new hapi.Server()

server.connection({
  host: process.env.HAPI_SERVICE_HOST,
  port: process.env.HAPI_SERVICE_PORT
})

route(server)

server.start(() => {
  console.log('hapi server listening on port: ' + process.env.HAPI_SERVICE_PORT)
})
