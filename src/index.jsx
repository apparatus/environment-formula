import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import cookie from 'react-cookie';

import Routes from './Routes';
import api from './middleware/api';

import 'muicss/lib/sass/mui.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  thunk,
  api
);

const store = createStore(
  rootReducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
