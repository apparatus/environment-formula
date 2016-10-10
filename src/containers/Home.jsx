import React, { Component } from 'react';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import MyDumbComponent from '../components/MyDumbComponent';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {

    return (
      <Container>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <h1>React Starter</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <MyDumbComponent />
          </Col>
        </Row>
      </Container>
    );
  }
}
