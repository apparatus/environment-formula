const spawn = require('child_process').spawn

spawn('asini', ['exec', '--', 'npm', 'update', '--info'], {stdio: 'inherit', cwd: process.cwd(), env: process.env})

