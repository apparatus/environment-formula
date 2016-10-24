const hapi = require('hapi')
const route = require('./route')

const server = new hapi.Server()

server.connection({
  host: process.env.API_HOST,
  port: process.env.API_PORT
})

route(server)

server.start(() => {
  console.log('hapi server listening on port: ' + process.env.API_PORT)
})
