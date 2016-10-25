const tcp = require('mu/drivers/tcp')

const opts = {
  port: process.env.SERVICE_NAME_PORT,
  host: process.env.SERVICE_NAME_HOST
}

module.exports = serviceName

function serviceName (mu) {
  mu.outbound({role: 'service-name'}, tcp.client(opts))
}

