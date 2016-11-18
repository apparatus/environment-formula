'use strict'

const melder = require('./wiring/melder')
const cls = require('./styles')

module.exports = component

function component (ctx) {
  const meld = melder(ctx)
  const {dispatch} = ctx

  return render

  function render (props) {
    return meld `
      <div class="${cls.cmp}">
        <div class="${cls.one}">
          <button class="${cls.btn}" type="button" onClick=${one}>
           service-name: one
          </button>
        </div>
        <form class="${cls.two}" onSubmit=${two}>
          <div class="${cls.twoInner}">
            <input class="${cls.inp}" name='someUserData' placeholder='Type something'> 
            <button class="${cls.btn}" type="submit">
              service-name: two
            </button>
          </div>
        </form>
        <div class="${cls.activity}">
        ${props.entries.map(entry => meld `
          <div class="${cls.entry}">
            <div> <strong>Type:</strong> ${entry.type} </div>
            <div> <strong>Data:</strong> ${JSON.stringify(entry.data, 0, 2)} </div>
          </div>
        `)}
        </div>
      </div>
    `
  }

  function one () {
    fetch('/service-name/one')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data
        dispatch({type: 'res', role: 'service-name', cmd: 'one', data: data})
      })
      .catch((err) => {
        dispatch({type: 'res-err', role: 'service-name', cmd: 'one', data: err})
      })
  }

  function two (e) {
    e.preventDefault()
    var data = new FormData(e.target)
    fetch('/service-name/two', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        someUserData: data.get('someUserData')
      })
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) throw data
        dispatch({type: 'res', role: 'service-name', cmd: 'two', data: data})
      })
      .catch((err) => {
        dispatch({type: 'res-err', role: 'service-name', cmd: 'two', data: err})
      })
  }
}
