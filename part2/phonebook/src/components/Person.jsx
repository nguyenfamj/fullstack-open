import React from 'react';

const Person = ({ name, phone }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>{name}</div>
      <div style={{ marginLeft: 10 }}>{phone}</div>
    </div>
  );
};

export default Person;
