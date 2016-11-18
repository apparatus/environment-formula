'use strict'

module.exports = pattern

// convenience function,
// useful for hooking up a microservice pattern
// with an incoming api call.
// See the services/service-name.js file for usage

function pattern (mu) {
  return (pat) => (request, reply) => {
    const pattern = (typeof pat === 'function')
      ? pat(request.payload)
      : pat

    mu.dispatch(pattern, (err, res) => {
      reply(err || res)
    })
  }
}
