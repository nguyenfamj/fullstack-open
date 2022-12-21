import { useState } from 'react';

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
      <div style={{ marginBottom: 20 }}>
        <input
          type='text'
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder='Search people'
        />
      </div>
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
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((person, index) => (
          <div key={index} style={{ display: 'flex' }}>
            <div>{person.name}</div>
            <div style={{ marginLeft: 10 }}>{person.phone}</div>
          </div>
        ))}
    </div>
  );
};

export default App;
