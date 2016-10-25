module.exports = pattern

// convenience function, applies the normal
// case for hooking up a microservice pattern
// with an api call. 
// See the services folder for a usage example

function pattern (mu) {
  return (pat) => (request, reply) => {
    if (typeof pat === 'function') {
      pat = pat(request.payload)
    }
    mu.dispatch(pat, function (err, res) {
      reply({result: err ? 'error' : res, err: err})
    })
  }
}