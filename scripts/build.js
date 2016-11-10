const exec = require('child_process').execSync

module.exports = build

function build ({name, service, cmp, srv}) {
  console.log(exec('npm run build-cmp', {cwd: service}) + '')
}
