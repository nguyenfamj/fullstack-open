import { useEffect, useState } from 'react';
import NameFilter from './components/NameFilter';
import Notification from './components/Notification/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { createPerson, getPersons, updatePerson } from './service/contactCRUD';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refetch, setRefetch] = useState(0);
  const [messageBox, setMessageBox] = useState({ message: null, success: true });

  console.log(persons);

  const onInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onInputNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMessageDelay = (message, success) => {
    setTimeout(() => {
      setMessageBox({ message, success });
    }, 1000);
  };

  const onAddNewName = (event) => {
    event.preventDefault();
    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (foundPerson) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, do you want to replace the old number with the new one?`
      );

      if (confirmation) {
        const updatedPerson = { name: foundPerson.name, number: newNumber };

        updatePerson(foundPerson.id, updatedPerson)
          .then((response) => {
            handleMessageDelay(`Number of ${foundPerson.name} changed successfully`, true);
          })
          .catch((error) => handleMessageDelay(error.response.data.error, false));
        setRefetch((prevState) => prevState + 1);
      }

      return;
    }
    const newPerson = { name: newName, number: newNumber };

    createPerson(newPerson)
      .then((response) => {
        handleMessageDelay(`Number of ${newPerson.name} added successfully`, true);
      })
      .catch((error) =>
        handleMessageDelay(error.response.data.error || error.response.data, false)
      );
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
      <Notification {...messageBox} />
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
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        setRefetch={setRefetch}
        handleMessageDelay={handleMessageDelay}
      />
    </div>
  );
};

export default App;
