import React, { Component } from 'react';

import './Snackbar.scss';

/* A custom responsive Snackbar component to show beautiful and short notifications sliing from bottom */
export default class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.hide = ::this.hide;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(this.hide, this.props.duration);
    }
  }

  hide() {
    window.clearTimeout(this.timer);
    this.props.onClose();
  }

  render() {
    const { show, message, action } = this.props;

    return (
      <div id="snackbar" className={(show ? 'show' : '')}>
        <span className="snackbar-message">{message}</span>
        <span onClick={this.hide} className="snackbar-action">{action}</span>
      </div>
    );
  }
};

Snackbar.defaultProps = {
  duration: 4000,
  action: 'Close',
  onClose: () => {}
};
