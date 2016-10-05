import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { login } from '../actions/auth';

const styles = {
  box: {
    width: 500,
    margin: '100px auto 0 auto',
    padding: 50,
  },

  submit: {
    float: 'right'
  }
};

@connect(state => ({
  auth: state.auth
}), ({
  login,
  push
}))
export default class Login extends Component {
  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  login () {
    // this.props.login();
    this.props.push('/home');
  }

  render () {
    return (
      <div></div>
    );
  }
}
