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
          <Person key={index} name={person.name} phone={person.phone} />
        ))}
    </>
  );
};

export default Persons;
