const {name} = require('../package.json')

const env = process.env

module.exports = {
  name: name,
  frontend: {
    frontendRole: 'frontend',
    target: {
      port: env.FRONTEND_PORT,
      host: env.FRONTEND_HOST
    }
  }
}
