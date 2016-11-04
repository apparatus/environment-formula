const React = require('react')
const {render} = require('react-dom')
const meld = require('./wiring/meld')
const load = require('./wiring/load')

load(['service-name'], {React}, (err, cmps) => {
  if (err) { console.error(err) }
  app(cmps)
})

function app (cmps) {
  const serviceNameCmp = cmps['service-name']
  const store = (state, root) => React.createClass({
    getInitialState: () => state,
    render: function () { return React.createElement(root, this.state) }
  })
  const App = store({entries: []}, function (props) {
    return meld `<div>
      <div>
        <div>
          <h1> foo </h1>
        </div>
        <div>
          ${serviceNameCmp(props)}
        </div>
      </div>
    </div>`
  })

  render(React.createElement(App), document.getElementById('app'))
}
