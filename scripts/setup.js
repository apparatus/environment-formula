const spawn = require('child_process').spawn
const fs = require('fs')
const {basename, join} = require('path')
const series = require('fastseries')()

var packs = [''].concat(require('./config').packageDirs)

var cwd = process.cwd()
series({}, packs.map((p) => (cb) => install(join(cwd, p), cb)), (err, codes) => {
  if (!err && !codes.filter((c) => c.code).length) {
    return
  }
  console.error(err, codes)
})

function install (d, cb) {
  fs.access(d, (err) => {
    if (err) {
      if (err.code === 'ENOENT') return cb(null, 0)
      return cb(err)
    }
    console.log('installing deps for', join('services', cwd === d ? basename(d) : join(basename(cwd), basename(d))))
    spawn('npm', ['install', '--no-progress', '--depth=0'].concat(process.execArgv.slice(3)), {
      stdio: 'inherit', cwd: d, env: process.env
    }).on('error', cb)
      .on('exit', (code) => {
        console.log('successfully installed deps for', join('services', cwd === d ? basename(d) : join(basename(cwd), basename(d))), '\n')
        cb(null, {code: code, dir: d})
      })
  })
}
