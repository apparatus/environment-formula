import React, { Component } from 'react';

import Appbar from 'muicss/lib/react/appbar';
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    const { children } = this.props;
    const titleStyle = { cursor: 'pointer'};

    return (
      <div>
        <header>
          <Appbar className="mui--no-user-select app-bar mui-container-fluid">
            <table width="100%">
              <tbody>
                <tr className="mui--appbar-height">
                  <td className="mui--text-title">React Starter</td>
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
      </div>
    );
  }
}
