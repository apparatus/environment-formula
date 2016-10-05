import React, { Component } from 'react';

import './Checkbox.scss';

export default (props) => {
  const { name, label, checked, onChange = () => {} } = props;

  return (
    <label className="checkbox">
      { label }
      <input type="checkbox" checked={checked} value={label} name={name} onChange={onChange} />
      <div></div>
    </label>
  );
};
