const name = 'frontend'

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
    port: env.FRONTEND_PORT,
    host: env.FRONTEND_HOST
  }
}
