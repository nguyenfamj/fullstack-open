import { useEffect, useState } from 'react';
import NameFilter from './components/NameFilter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { createPerson, getPersons } from './service/contactCRUD';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refetch, setRefetch] = useState(0);

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
    const newPerson = { name: newName, number: newNumber };

    createPerson(newPerson).then((response) => console.log(response));

    setRefetch(refetch + 1);
    setNewName('');
    setNewNumber('');
  };

  useEffect(() => {
    console.log('re-render');

    getPersons().then((fetchedPersons) => {
      setPersons(fetchedPersons);
    });
  }, [refetch]);

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
      <Persons persons={persons} searchTerm={searchTerm} setRefetch={setRefetch} />
    </div>
  );
};

export default App;
