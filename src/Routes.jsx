import React, { Component } from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';
import cookie from 'react-cookie';

import Login from './containers/Login';
import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';

const validateLogin = (nextState, replace, callback) => {
  // do auth verification here
  callback(/* error */);
};

export default (props) => (
  <Router history={props.history}>
    <Route path="/login" component={Login} />
    <Redirect from="/" to="/home" />

    <Route path="/" component={App}>
      <Route path="/home" component={Home} onEnter={validateLogin} />
      <Route path="/about" component={About} onEnter={validateLogin} />
    </Route>
  </Router>
);
