import React, { Component } from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';
import cookie from 'react-cookie';

import App from './containers/App';
import Home from './containers/Home';

const validateLogin = (nextState, replace, callback) => {
  // do auth verification here
  callback(/* error */);
};

export default (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/home" />

    <Route path="/" component={App}>
      <Route path="/home" component={Home} onEnter={validateLogin} />
    </Route>
  </Router>
);
