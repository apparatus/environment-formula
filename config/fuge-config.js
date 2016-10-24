module.exports = {
  // tels fuge to proxy connections to docker. Allows
  // you to specifiy localhost in your microservices.
  proxy: 'docker',

  // Run docker containers if an image is specified.
  runDocker: true,

  // Log to file, not console logs are found in ./logs
  tail: false,

  // Restart microservices if they explode, lets say no.
  restartOnError: false,

  // Ignore all this junk
  exclude: [
    '**/node_modules',
    '**/data',
    '**/.git',
    '**/CURRENT',
    '**/LOG*',
    '**/MANIFEST*',
    '**/*.ldb',
    '**/*.log'
  ]
}
