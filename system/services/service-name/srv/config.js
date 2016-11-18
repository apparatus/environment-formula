const {name} = require('../package.json')

const env = process.env

module.exports = {
  name: name,
  dev: env.NODE_ENV !== 'production',
  context: {
  },
  // restify:
  // context: {
  //   dev: env.NODE_ENV !== 'production',
  //   server: {name: name},
  //   api: {url: env.API_URL}
  // },
  setup: {
    port: env.SERVICE_NAME_PORT,
    host: env.SERVICE_NAME_HOST
  }
}
