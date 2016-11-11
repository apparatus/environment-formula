const fs = require('fs')
const {join} = require('path')
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
    transform: [loadify, /* meldify,*/ es2040, uglifyify],
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
