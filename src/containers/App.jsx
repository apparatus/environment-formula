import React, { Component } from 'react';
import { connect } from 'react-redux';
import { combineReducers } from 'redux';

import Snackbar from '../components/custom/Snackbar';
import Link from '../components/custom/Link';
import Appbar from 'muicss/lib/react/appbar';
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import { resolve } from 'react-resolver';
import cookie from 'react-cookie';
import { push } from 'react-router-redux';

import { callApi } from '../middleware/api';
import { showToast, hideToast } from '../actions/misc';

import './App.css';

@connect(state => ({
  auth: state.auth,
  toast: state.misc.toast,
}), ({
  showToast,
  hideToast,
  navigate: push
}))
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    const { children, toast, showToast, hideToast, navigate } = this.props;
    const titleStyle = { cursor: 'pointer'};

    return (
      <div>
        <header>
          <Appbar className="mui--no-user-select app-bar mui-container-fluid">
            <table width="100%">
              <tbody>
                <tr className="mui--appbar-height">
                  <td className="mui--text-title">React Starter</td>
                  <td style={{textAlign: 'right'}}>
                    <ul className="mui-list--inline mui--text-body2 nav-bar">
                      <li><Link activeClassName="active" to="/home">Home</Link></li>
                      <li><Link activeClassName="active" to="/about">About</Link></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </Appbar>
        </header>

        <Container>
          <Row>
            <Col sm="8" sm-offset="2">
              <Panel>
                { children ? children : null }
              </Panel>
            </Col>
          </Row>
        </Container>

        <Snackbar show={toast.show} message={toast.message} onClose={hideToast} />
      </div>
    );
  }
}
