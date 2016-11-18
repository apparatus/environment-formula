const {resolve, join, basename} = require('path')
const fs = require('fs')
const {
  targets, 
  servicesDir, 
  systemDir,
  apiDir,
  frontendDir
} = require('./config')

if (process.mainModule === module) {
  const issues = []
  const services = require('./manifest')(issues)
  process.stdout.write('verifying structure... ')
  verify(services, issues)
  if (!issues.length) {
    process.stdout.write('structure is good\n')
  }
  process.exit(issues.length ? 1 : 0)
}

module.exports = verify

function verify (targs, issues) {
  var list = []

  if (doesNotExist('fatal', resolve(__dirname, systemDir))) {
    return fatal(`${resolve(__dirname, systemDir)} not found`)
  }

  if (doesNotExist('fatal', resolve(__dirname, servicesDir))) {
    return fatal(`${resolve(__dirname, servicesDir)} not found`)
  }

  if (doesNotExist('fatal', resolve(__dirname, apiDir))) {
    return fatal(`${resolve(__dirname, apiDir)} not found`)
  }

  if (doesNotExist('fatal', resolve(__dirname, frontendDir))) {
    return fatal(`${resolve(__dirname, frontendDir)} not found`)
  }

  list = check(list, targs, 'service')
  list = check(list, targs, 'service', 'cmp')
  list = check(list, targs, 'service', 'srv')
  list = check(list, targs, 'service', 'bundle')

  issues.push(...list)

  if (issues.length) {
    console.error(`Encountered ${issues.length} issue${issues.length > 1 ? 's' : ''}`)
    console.error(describe(issues))
  }

  function doesNotExist (type, service, sub) {
    try {
      fs.accessSync(sub || service)
    } catch (e) {
      return {
        type: type,
        path: service,
        [type]: sub,
        name: basename(service),
        med: join(resolve(__dirname, apiDir, targets), basename(service) + '.js'),
        index: require.resolve(resolve(__dirname, apiDir)),
        env: resolve(__dirname, '..')
      }
    }
  }

  function check (list, targs, service, sub) {
    return list
        .concat(
          targs
            .filter(({target}) => !list.find(({type}) => type === target))
            .map((f) => doesNotExist('cmp', f.target, sub && f[sub]))
        ).filter(Boolean)
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
      ) +
      describeBundle(
        issues.filter(({type}) => type === 'bundle')
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
    const index = require.resolve(resolve(__dirname, apiDir))
    const env = resolve(__dirname, '..')
    if (issues.length === 1) {
      return `
        Unable to find the "${issues[0].name}" service

        api target:
          ${issues[0].med}

        Was required in:
          ${index}

        But has no corresponding service folder in the environment at:
          ${env}

      `.replace(/^ {6}/gm, '   ')
    }

    return `
        Unable to find the services:
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        api targets:
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        Were required in:
          ${index}

        But have no corresponding service folder in the environment at:
          ${env}

      `.replace(/^ {6}/gm, '   ')
  }

  function describeUiCmp (issues) {
    if (issues.length === 0) { return '' }
    if (issues.length === 1) {
      return `
        Unable to find the ui component for "${issues[0].name}"

        Was declared with the ${'`'}component${'`'} function in api target:
          ${issues[0].med}

        But has no corresponding component at:
          ${issues[0].cmp}

      `.replace(/^ {6}/gm, '   ')
    }

    return `
        Unable to find ui components in services:
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        Was declared with the ${'`'}component${'`'} function in api targets:
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        But have no corresponding component at:
          ${issues[0].cmp}

      `.replace(/^ {6}/gm, '   ')
  }

  function describeBackendSrv (issues) {
    if (issues.length === 0) { return '' }

    if (issues.length === 1) {
      return `
        Unable to find the backend service for "${issues[0].name}"

        Has a api target at: 
          ${issues[0].med}

        But has no corresponding backend service at:
          ${issues[0].srv}

      `.replace(/^ {6}/gm, '   ')
    }

    return `
        Unable to find backend services for: 
          ${issues.map(({name}) => `"${name}"`).join(', ')}
        
        Has api targets at: 
          ${issues.map(({med}, i) => (i ? '        ' : '') + med).join('\n')}

        But have no corresponding backend service at:
          ${issues[0].srv}

      `.replace(/^ {6}/gm, '   ')
  }

  function describeBundle (issues) {
    if (issues.length === 0) { return '' }

    if (issues.length === 1) {
      return `
        Unable to find the bundle folder for "${issues[0].name}"

        This is needed to build the app ui

      `.replace(/^ {6}/gm, '   ')
    }

    return `
        Unable to find bundle folders for "${issues[0].name}"

        These are needed to build the app ui

      `.replace(/^ {6}/gm, '   ')
  }
}

function fatal (msg) {
  console.error('\n', 'Fatal:', msg)
  process.exit(1)
}
