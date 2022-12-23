import React from 'react';
import Person from './Person';

const Persons = ({ persons, searchTerm }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((person, index) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </>
  );
};

export default Persons;
