const spawn = require('child_process').spawn
const fs = require('fs')
const {basename, join} = require('path')
const parallel = require('fastparallel')()

var packs = [''].concat(require('./config').packageDirs)

var cwd = process.cwd()
parallel({}, packs.map((p) => (cb) => clean(join(cwd, p), cb)), (err) => {
  console.log(err)
})

function clean (d, cb) {
  fs.access(join(d, 'node_modules'), (err) => {
    if (err) {
      if (err.code === 'ENOENT') return cb(null, 0)
      return cb(err)
    }
    console.log('removing', join(basename(cwd), basename(d), 'node_modules'))
    spawn('rm', ['-fr', join(d, 'node_modules')].concat(process.execArgv.slice(3)), {
      stdio: 'inherit', env: process.env
    }).on('error', cb)
      .on('exit', (code) => {
        console.log('removed', join(basename(cwd), basename(d), 'node_modules'))
        cb(null, {[code]: d})
      })
  })
}
