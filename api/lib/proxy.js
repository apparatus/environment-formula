'use strict'

module.exports = proxy

// convenience function, proxies an incoming request
// to another route, useful for hooking incoming api requests
// up with services that expose HTTP endpoints (instead of pattern matching)
// See the services/polyfill.js file for usage 

function proxy () {
  return ({host, port, route}) => (request, reply) => {
    return reply.proxy({
      uri: `http://${host}:${port}${route}${request.url.search}`
    })
  }
}