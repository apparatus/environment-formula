const React = require('react')
const {render} = require('react-dom')
const cls = require('./styles')
const meld = require('./wiring/melder')({React})
const load = require('./wiring/dev-load')

load(['service-name'], {React, dispatch}, (err, cmps) => {
  if (err) { console.error(err) }
  app(cmps)
})

// this is a general dispatch function,
// it represents the dispatch of a good flux lib, like redux
// or.. even the dispatch from mu
function dispatch (action) {
  var entries = app.store.state.entries.concat(action)
  app.store.setState({entries: entries})
}

function app (cmps) {
  const serviceNameCmp = cmps['service-name']
  const store = (state, root) => React.createClass({
    getInitialState: () => state,
    render: function () { return React.createElement(root, this.state) }
  })
  const App = store({entries: []}, function (props) {
    return meld `
      <div class="${cls.app}">
        <h1 class="${cls.title}"> Service Tester </h1>
        ${serviceNameCmp(props)}
      </div>
    `
  })

  app.store = render(React.createElement(App), document.getElementById('app'))
}

