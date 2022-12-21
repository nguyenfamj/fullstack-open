import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '0321234584' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  console.log(newNumber);

  const onInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onInputNumberChange = (event) => {
    setNewNumber(event.target.value);
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

    console.log(persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={onInputNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onInputNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={onAddNewName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name} style={{ display: 'flex' }}>
          <div>{person.name}</div>
          <div style={{ marginLeft: 10 }}>{person.phone}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
