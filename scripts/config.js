const {join} = require('path')
module.exports = {
  frontendNs: 'frontend',
  frontendDir: join('..', 'system', 'frontend'),
  apiDir: join('..', 'system', 'api'),
  systemDir: join('..', 'system'),
  servicesDir: join('..', 'system', 'services'),
  targets: 'targets',
  componentMarker: '../lib/component',
  packageDirs: [
    '',
    'srv',
    'cmp',
    'app',
    'dev',
    'bundle'
  ]
}
