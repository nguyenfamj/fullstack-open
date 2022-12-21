import { useState } from 'react';
import NameFilter from './components/NameFilter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  console.log(searchTerm);

  const onInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onInputNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onAddNewName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, phone: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
      <h3>Add a new contact</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onInputNameChange={onInputNameChange}
        onInputNumberChange={onInputNumberChange}
        onAddNewName={onAddNewName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
