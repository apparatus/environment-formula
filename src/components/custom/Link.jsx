import React, { Component } from 'react';
import { Link } from 'react-router';

/* A custom Link component simulating *ngIf of angular to avoid messing up the rendering code with a lot of if blocks */
export default (props) => {
  const newProps = {...props};

  if (newProps.hasOwnProperty('if') === false) {
    return <Link {...newProps} />;
  }

  if (newProps.if) {
    delete newProps.if;
    return <Link {...newProps} />;
  }

  return null;
};
