const React = require('react')
const {render} = require('react-dom')
const muReact = require('mu-react')
const meld = require('./wiring/meld')

var fetch = muReact(lu, React)

fetch({
  components: ['service-name'],
}, setup)

// function patterns(app) {
//   lu.add({role: 'activity', cmd: 'entry'}, function (args, cb) {
//     var entries = app.state.entries.concat({
//       service: args.info.service,
//       action: args.info.action,
//       result: args.result
//     })
//     app.setState({entries: entries})
//     cb()
//   })
// }

function setup(deps) {
  var cmps = deps.components
  var theme = deps.styles
  var store = (state, root) => React.createClass({
    getInitialState: () => state,
    render: function () { return React.createElement(root, this.state) }
  })
  var App = store({entries: []}, function (props) {
    var styles = theme.app.styles
    return meld `<div>
      <div>
        <div>
          <h1> foo </h1>
        </div>
        <div>
          <cmps.Service1 styles={theme.service.styles}/>
        </div>
      </div>
    </div>`
  })

  var app = render(React.createElement(App), document.getElementById('app'))
  // patterns(app)
}