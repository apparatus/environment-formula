const manifest = require('./manifest')
const verify = require('./verify')
const issues = []
const services = require('./manifest')(issues)

verify(services, issues)

issues.forEach((s) => {
  var srv = services.find(({name}) => s.name === name)
  if (srv) {
    srv.invalid = true
  }
})

console.log(services)


process.exit()

