const manifest = require('./manifest')
const verify = require('./verify')
const issues = []
const services = require('./manifest')(issues)
const build = require('./build')

verify(services, issues)

issues.forEach((s) => {
  var srv = services.find(({name}) => s.name === name)
  if (srv) {
    srv.invalid = true
  }
})

const passes = services.filter(({invalid}) => !invalid)

passes.forEach(build)

const fails = services.filter(({invalid}) => invalid)

if (fails.length) { console.log('Unable to build ', fails) }




process.exit()
