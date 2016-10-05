import React, { Component } from 'react';
import Input from 'muicss/lib/react/input';

export default (props) => {
  const { prefix, suffix, ...newProps} = {...props};

  const styles = {
    input: {
      flex: 1,
    },
    prefix: {
      paddingTop: '15px',
      marginBottom: '20px',
      lineHeight: '32px',
      marginRight: '10px',
      fontSize: '80%'
    },
    suffix: {
      paddingTop: '15px',
      marginBottom: '20px',
      lineHeight: '32px',
      marginLeft: '10px',
      fontSize: '80%'
    },
    label: {
      display: 'flex'
    }
  };

  if (prefix || suffix) {
    return (
      <label style={styles.label}>
        { prefix ? <span  style={styles.prefix}>{prefix}</span> : null }
        <Input style={styles.input} {...newProps} />
        { suffix ? <span  style={styles.suffix}>{suffix}</span> : null }
      </label>
    );
  }

  return <Input {...newProps} />;
};
