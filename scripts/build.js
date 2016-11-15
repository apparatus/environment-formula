const fs = require('fs')
const mod = require('module')
const util = require('util')
const {join, resolve, basename} = require('path')
const es2040 = require('es2040')
const uglifyify = require('uglifyify')
// const meldify = require('./meldify')
const loadify = require('./loadify')
const buildDir = join(__dirname, '..', 'ui-build')
module.exports = build


function build (services) {
  createBuildDir()
  const main = services.find(({main}) => main)

  const bundle = require(main.bundle)({
    transform: [loadify, /* meldify, */ es2040, uglifyify],
    whitelist: cssWhitelist(services)
  })

  bundle()
    .pipe(fs.createWriteStream(join(buildDir, 'app.js')))

  bundle.css(function (err, css) {
    if (err) {
      console.error('Unable to build CSS!', err)
      return
    }
    fs.writeFileSync(join(buildDir, 'styles.css'), css)
    docs(services)
  })

  fs.createReadStream(join(main.static, 'index.html'))
    .pipe(fs.createWriteStream(join(buildDir, 'index.html')))

}

function cssWhitelist (services) {
  const set = new Set()
  ;[].concat(...services
    .map(({cmp}) => join(cmp, 'styles'))
    .map(tryRequire)
    .filter(Boolean)
    .map((styles) => {
      return [].concat(...Object.keys(styles).map((k) => {
        return styles[k].replace(/\s\s+/g, ' ').trim()
      }).map((s) => s.split(' ')))
    }))
    .forEach((cls) => set.add(cls))

  return Array.from(set)
}

function tryRequire (path) {
  try {
    return require(path)
  } catch (e) {}
}

function createBuildDir () {
  try {
    fs.accessSync(buildDir)
  } catch (e) {
    fs.mkdirSync(buildDir)
  }
}

function docs (services) {
  var stream = fs.createWriteStream(join(__dirname, '..', 'docs.md'))
  stream.write('# ' + basename(resolve(__dirname, '..')) + '\n\n')
  stream.write('(SYSTEM DESCRIPTION HERE)\n\n')
  services.forEach((s) => doc(s, stream))
}

function doc (service, stream) {
  var env = process.env
  env.NODE_ENV = 'production'
  process.env = new Proxy(env, {
    get: (o, k) => {
      return o[k] || `process.env.${k}`
    }
  })
  var routing = '### Route Table \n\n'
  var definitions = '### Service API \n\n'
  var load = mod._load
  mod._load = function (name) {
    if (name === 'mu') {
      var mu = function () {
        return {
          inbound: function (route, meta) {
            routing += '#### inbound route: ' + util.inspect(route) + '\n\n'
            routing += '**transport:** ' + meta.name + '\n\n'
            if (meta.source) {
              if (meta.source.host) routing += '**source host:** ' + meta.source.host + '\n\n'
              if (meta.source.port) routing += '**source port:** ' + meta.source.port + '\n\n\n'
            }
          },
          outbound: function (route, meta) {
            routing += '#### outbound route: ' + util.inspect(route) + '\n\n'
            routing += '**transport:** ' + meta.name + '\n\n'
            if (meta.target) {
              if (meta.target.host) routing += '**target host:** ' + meta.target.host + '\n\n'
              if (meta.target.port) routing += '**target port:** ' + meta.target.port + '\n\n\n'
            }
          },
          define: function (pattern, fn, desc) {
            definitions += '#### `' + util.inspect(pattern) + '`\n\n'
            definitions += (desc || '(DESCRIPTION HERE)') + '\n\n'
            definitions += '##### logic\n'
            definitions += '```js\n'
            definitions += fn + '\n'
            definitions += '```\n\n'
          },
          dispatch: function () {},
          log: require('abstract-logging')
        }
      }
      return mu
    }
    if (name === 'mu-tcp') {
      var muTcp = {
        client: function (target) {
          return {name: name, target: target}
        },
        server: function (source) {
          return {name: name, source: source}
        }
      }
      return muTcp
    }
    if (name === 'mu-local') {
      return () => ({name: name})
    }

    return load.apply(mod, arguments)
  }

  require(service.srv)
  mod._load = load

  // TODO write to multiple streams, then merge
  setTimeout(() => {
    stream.write('## Service: ' + service.name + '\n\n')
    stream.write(definitions)
    stream.write(routing)
  }, 1100)
}
