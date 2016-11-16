# environment-boilerplate

The default environment for creating fullstack microservices

Must be run on Node 6+

* config - fuge config - microservices runtime environment
* scripts - supporting scripts for building, validation, project management
* services - services

## services

* api - Hapi + mu
* frontend - React + mu
* polyfill - auto-polyfill service
* service-name - example fullstack service

## Quick Start

```sh
$ git clone --recursive https://github.com/nearform/environment-boilerplate/
$ cd environment-boilerplate
$ npm install -g fuge
$ npm run setup
$ fuge shell config/system.yml
> start all
```

## OSX/macOS ENFILE Problem

If the fuge `start all` results in some services failing to start, 
showing an "ENFILE" error, it's because since Yosemite file limits
have been over-zealously restricted. You can either just try to start
the service that fails individually, or to get rid of the annoyance
`npm run os-enfile-fix` will solve the problem (but only in your current)
terminal. To permanently copy the `scripts/osx-enfile-fix.sh` script 
contents to your `~/.bash_profile`.


## Workflow Commands

From the project root, the following commands can be used

### `npm run setup`

Use this command to get started. 

Install all dependencies in all services, the `scripts` folder, and devDependencies in the project root.

### `npm run upgrade`

Update all service dependencies (runs `npm update` in service folders).

### `npm run lint`

Lint all services, in parallel

### `npm run lint -- --fix`

Autocorrect lint errors where possible while linting.


### `npm run verify`

Structural integrity checks, check whether the project conforms
to vital boilerplate structure which are relied upon in the
build process.

### `npm test`

Run all service tests, also calculates total coverage

### `npm run coverage`

Generate a system wide HTML coverage report, open immediately 
in default browser

### `npm run clean`

Remove `node_modules` folder in every service

### `npm run build`

Create a ui-build folder in project route with HTML, CSS and JS.

### `npm run release`

Allows semver control across services, 

Automatically detects which services have changed, asks 
how the version number should be bumped (patch, minor, major, custom),
changes services package.json's accordingly, git tags and creates
GH release for each changed service. 

### `npm run ci`

Command that CI platform (Travis, CircleCI) uses
