const {join} = require('path')
const {name} = require('./package.json')

const env = process.env
const dev = env.NODE_ENV !== 'production'

module.exports = {
  name: name,
  dev: dev,
  context: {
    mu: {dev: dev},
    hapi: {
      dev: dev,
      instantation: {},
      connection: {
        port: env.API_PORT || 7000,
        host: env.API_HOST || 'localhost'
      }
    }
  },
  frontend: {
    dev: dev,
    static: join('..', 'frontend', 'static')
  },
  setup: {
    dev: dev,
    env: env
  }
}

