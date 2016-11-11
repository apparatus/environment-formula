const bundle = require('../bundle')({dev: true})
const config = require('./config')

module.exports = dev

function dev (ctx) {
  const {mu} = ctx
  const {name} = config

  mu.define({role: name, cmd: 'app'}, (args, cb) => {
    bundle((err, payload) => {
      if (err) {
        cb(err)
        return
      }
      cb(null, {payload: payload})
    })
  })

  mu.define({role: name, cmd: 'styles'}, (args, cb) => {
    bundle.css((err, payload) => {
      if (err) {
        cb(err)
        return
      }
      cb(null, {payload: payload})
    })
  })

  mu.define({role: name, cmd: 'reload'}, bundle.reload)

}
