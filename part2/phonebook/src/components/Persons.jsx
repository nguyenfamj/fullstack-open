import React from 'react';
import Person from './Person';

const Persons = ({ persons, searchTerm, setRefetch, handleMessageDelay }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            personId={person.id}
            setRefetch={setRefetch}
            handleMessageDelay={handleMessageDelay}
          />
        ))}
    </>
  );
};

export default Persons;
