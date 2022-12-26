import React from 'react';
import { deletePerson } from '../service/contactCRUD';

const Person = ({ name, number, personId, setRefetch }) => {
  const onDeleteButton = () => {
    deletePerson(personId).then((response) => {
      console.log(response);
    });

    setRefetch((prevState) => prevState + 1);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', width: 300, justifyContent: 'space-between' }}>
        <div>{name}</div>
        <div style={{ marginLeft: 10 }}>{number}</div>
      </div>

      <button style={{ marginLeft: 20 }} onClick={onDeleteButton}>
        Delete
      </button>
    </div>
  );
};

export default Person;
