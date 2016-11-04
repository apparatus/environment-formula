const {resolve, join, relative, parse, basename} = require('path')
const fs = require('fs')
const proxyquire = require('proxyquire').noPreserveCache()
const {api, services, apiComponentWiring} = require('./config')
const dir = resolve(__dirname, '..', '..', api)

module.exports = (fullstackers, issues) => {
  var list = []
  list = list
      .concat(
        fullstackers
          .map(({service}) => verifyExistence('service', service))
      ).filter(Boolean)

  list = list
      .concat(
        fullstackers
          .filter(({service}) => !list.find(({type}) => type === service))
          .map(({service, cmp}) => verifyExistence('cmp', service, cmp))
      ).filter(Boolean)

  list = list
      .concat(
        fullstackers
          .filter(({service}) => !list.find(({type}) => type === service))
          .map(({service, srv}) => verifyExistence('srv', service, srv))
      ).filter(Boolean)

  issues.push(...list)

  if (issues.length) {
    console.error(` Encountered ${issues.length} issue${issues.length > 1 ? 's' : ''}`)
    console.error(describe(issues))
  }

  function verifyExistence (type, service, sub) {
    try {
      fs.accessSync(sub || service)
    } catch (e) {
      return {
        type: type,
        path: service,
        [type]: sub,
        name: basename(service),
        med: join(resolve(__dirname, '..', '..', api, services), basename(service) + '.js'),
        index: require.resolve(resolve(__dirname, '..', '..', api)),
        env: resolve(__dirname, '..', '..')
      }
    }
  }

  function addIssue (opts) {
    if (opts.type === 'not found') {
      issues.add(opts)
    }
  }

  function describe (issues) {
    return (
      describeWarning(
        issues.filter(({type}) => type === 'warning')
      ) + 
      describeService(
        issues.filter(({type}) => type === 'service')
      ) +
      describeUiCmp(
        issues.filter(({type}) => type === 'cmp')
      ) +
      describeBackendSrv(
        issues.filter(({type}) => type === 'srv')
      )
    )
  }

  function describeWarning (issues) {
    if (issues.length === 0) { return '' }
    return `
     WARNINGS: 
      ${issues.map(({msg}) => '\n     ' + msg + '\n').join('\n')}
    `
  }

  function describeService (issues) {
    if (issues.length === 0) { return '' }
    const index = require.resolve(resolve(__dirname, '..', '..', api))
    const env = resolve(__dirname, '..', '..')
    if (issues.length === 1) {
      return `
        Unable to find the "${issues[0].name}" service

        Service mediator:
          ${issues[0].med}

        Was required in:
          ${index}

        But has no corresponding service folder in the environment at:
          ${env}

      `.replace(/^      /gm, '   ')
    }
    
    return `
        Unable to find the services:
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        Service mediators:
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        Were required in:
          ${index}

        But have no corresponding service folder in the environment at:
          ${env}

      `.replace(/^      /gm, '   ')
  }

  function describeUiCmp (issues) {
    if (issues.length === 0) { return '' }

    if (issues.length === 1) {
      return `
        Unable to find the ui component for "${issues[0].name}"

        Was declared with the ${'`'}component${'`'} function in service mediator:
          ${issues[0].med}

        But has no corresponding component at:
          ${issues[0].cmp}

      `.replace(/^      /gm, '   ')
    }
    
    return `
        Unable to find ui components in services:
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        Was declared with the ${'`'}component${'`'} function in service mediators:
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        But have no corresponding component at:
          ${issues[0].cmp}

      `.replace(/^      /gm, '   ')
  }

  function describeBackendSrv (issues) {
    if (issues.length === 0) { return '' }

    if (issues.length === 1) {
      return `
        Unable to find the backend service for "${issues[0].name}"

        Has a service mediator at: 
          ${issues[0].med}

        But has no corresponding backend service at:
          ${issues[0].srv}

      `.replace(/^      /gm, '   ')
    }
    
    return `
        Unable to find backend services for: 
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        Has service mediators at: 
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        But have no corresponding backend service at:
          ${issues[0].srv}

      `.replace(/^      /gm, '   ')
  }

}
