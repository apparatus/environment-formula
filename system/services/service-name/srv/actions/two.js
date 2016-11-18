'use strict'

module.exports = (ctx) => (args, cb) => {
  // const {mu} = ctx
  // call some other service/pattern
  // mu.dispatch({role: 'another-service', cmd: 'action'}, (err, result) => {
    // if (err) return cb(err)
    // ...
  cb(null, {
    someUserDataWas: args.pattern.someUserData,
    super: 'duper'
  })
  // })
}

// restify:
// module.exports = (ctx) => (req, res, next) => {
//   const {client, logger} = ctx
//
//   // call another service
//   client.get('/another-service/cmd', (err, cReq, cRes, result) => {
//     res.end(domeSomethingWith(result))
//     logger.info('Server returned: %j', result)
//   })
// }
