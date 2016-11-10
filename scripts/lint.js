const spawn = require('child_process').spawn

spawn('spacey-standard', [
  '--env', 'browser', '--env', 'node'
].concat(process.execArgv.slice(3)),
  {stdio: 'inherit', cwd: process.cwd(), env: process.env}
).on('exit', (code) => {
  if (!code) {
    console.log(process.cwd(), 'linting passed')
  } else {
    process.exit(code)
  }
})
