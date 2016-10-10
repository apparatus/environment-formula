import React, { Component } from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';
import cookie from 'react-cookie';


import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';

import { LoginRoute } from 'fullstack-boilerplate';

const validateLogin = (nextState, replace, callback) => {
  // do auth verification here
  callback(/* error */);
};

export default (props) => (
  <Router history={props.history}>
    <LoginRoute />
    <Redirect from="/" to="/home" />

    <Route path="/" component={App}>
      <Route path="/home" component={Home} onEnter={validateLogin} />
      <Route path="/about" component={About} onEnter={validateLogin} />
    </Route>
  </Router>
);
