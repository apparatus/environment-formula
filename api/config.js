const {name} = require('./package.json')

const env = process.env

module.exports = {
  name: name,
  dev: env.NODE_ENV !== 'production',
  context: {
    mu: {
      dev: env.NODE_ENV !== 'production',
    },
    hapi: {
      instantation: {},
      connection: {
        port: env.PORT || 7000,
        host: env.HOST || 'localhost'
      }
    }
  },
  setup: {}
}
