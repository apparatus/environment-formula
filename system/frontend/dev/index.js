const bundle = require('../bundle')({dev: true})
const config = require('./config')
const ws = require('uws')

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

  mu.define({role: name, cmd: 'reload'}, reloader())
}

function reloader () {
  var full = true
  var WebSocketServer = ws.Server
  var wss = new WebSocketServer({ port: 35729 })
  var sockets = []
  wss.on('connection', function (ws) {
    sockets.push(ws)
    ws.send(full ? 'full' : 'cmps')
    full = false
  })
  return () => sockets.forEach((s) => s.close())
}
