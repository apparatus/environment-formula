import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import { showToast } from '../actions/misc';

import './About.css';

@connect(state => ({}), ({
  showToast
}))
export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {

    return (
      <Container>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <h1>About</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
