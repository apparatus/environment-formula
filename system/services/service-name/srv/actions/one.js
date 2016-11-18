'use strict'

module.exports = (ctx) => (args, cb) => {
  cb(null, {my: 'first action'})
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

