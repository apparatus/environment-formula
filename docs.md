# environment-boilerplate

(SYSTEM DESCRIPTION HERE)

## Service: service-name

### Service API 

#### `{ role: 'service-name', cmd: 'one' }`


    a third arg can optionally be passed to define
    which docs generator will use as a description 
  

##### logic
```js
(args, cb) => {
  cb(null, {my: 'first action'})
}
```

#### `{ role: 'service-name', cmd: 'two' }`


    description of cmd two...
  

##### logic
```js
(args, cb) => {
  // const {mu} = ctx
  // call some other service/pattern
  // mu.dispatch({role: 'another-service', cmd: 'action'}, (err, result) => {
    // if (err) return cb(err)
    // ...
  cb(null, {
    someUserDataWas: args.pattern.someUserData,
    super: 'duper'
  })
  // })
}
```

### Route Table 

#### inbound route: '*'

**transport:** mu-tcp

**source host:** process.env.SERVICE_NAME_HOST

**source port:** process.env.SERVICE_NAME_PORT


## Service: frontend

### Service API 

### Route Table 

#### inbound route: '*'

**transport:** mu-tcp

**source host:** process.env.FRONTEND_HOST

**source port:** process.env.FRONTEND_PORT


