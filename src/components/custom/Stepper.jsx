import React, { Component } from 'react';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';

const styles = {
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '20px'
  },
  next: {
    float: 'right'
  },
  stepBody: {
    minHeight: '200px'
  }
};

/* A custom Stepper component to show workflows in several steps, allowing to move Next and Previous */
export class Stepper extends Component {
  next = () => {
    const newStep = this.state.step + 1;

    this.setState({ step: Math.min(newStep, this.props.children.length - 1) });
    this.props.onNext(newStep);
  };

  prev = () => this.setState({ step: Math.max(0, this.state.step - 1) });

  finish = () => {
    this.props.onFinish();
  }

  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };

    this.next = ::this.next;
    this.prev = ::this.prev;
    this.finish = ::this.finish;
  }

  componentDidMount() {
    const { children } = this.props;

    if (Array.isArray(children) === false) {
      this.props.children = [children];
    }
  }

  render () {
    if (this.props.if === false) {
      return null;
    }

    const { step } = this.state;
    const { children, nextLabel, prevLabel, finishLabel, onFinish } = this.props;

    const currentChild = children[step];
    const firstStep = step === 0;
    const lastStep = step === children.length - 1;

    return (
      <Container>
        <br />
        <Row>
          <Col xs="12" style={styles.header}>{currentChild.props.name}</Col>
        </Row>

        <Row>
          <Col xs="12" style={styles.stepBody}>
            { currentChild }
          </Col>
        </Row>

        <br />
        <Divider />
        <br />

        <Row>
          <Col xs="2">
            { !firstStep ? <Button type="button" variant="raised" size="small" onClick={this.prev}>{prevLabel}</Button> : null }
          </Col>

          <Col xs="8"></Col>

          <Col xs="2"> {
              !lastStep ?
                <Button type="button" variant="raised" style={styles.next} size="small" onClick={this.next}>{nextLabel}</Button>
              :
                <Button type="button" variant="raised" color="primary" style={styles.next} size="small" onClick={this.finish}>{finishLabel}</Button>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

Stepper.defaultProps = {
  nextLabel: 'Next',
  prevLabel: 'Prev',
  finishLabel: 'Finish',
  onFinish: () => {},
  onNext: () => {},
  if: true
};

export const Step = (props) => (
  <div>{ props.children }</div>
);
