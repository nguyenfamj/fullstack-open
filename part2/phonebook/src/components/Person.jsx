import React from 'react';

const Person = ({ name, number }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>{name}</div>
      <div style={{ marginLeft: 10 }}>{number}</div>
    </div>
  );
};

export default Person;
