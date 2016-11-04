const name = 'frontend'

const env = process.env

module.exports = {
  name: name,
  dev: env.NODE_ENV !== 'production',
  context: {
    dev: env.NODE_ENV !== 'production'
  },
  // restify:
  // context: {
  //   dev: env.NODE_ENV !== 'production',
  //   server: {name: name},
  //   api: {url: env.API_URL}
  // },
  setup: {
    port: env.FRONTEND_PORT || 6000,
    host: env.FRONTEND_HOST || 'localhost'
  }
}
