const bundle = require('../bundle')({dev: true})
const tcp = require('mu-tcp')
const config = require('./config')

module.exports = dev

function dev (ctx) {
  const {mu} = ctx
  const {name} = config
  const {frontendRole, target} = config.frontend

  mu.outbound({role: frontendRole}, tcp.client(target))

  mu.define({role: name, cmd: 'component'}, (args, cb) => {
    bundle((err, payload) => {
      if (err) {
        cb(err)
        return
      }
      cb(null, {payload: payload})
    })
  })

  mu.dispatch({role: frontendRole, cmd: 'reload'}, function (err) {
    console.error(err)
  })

}
