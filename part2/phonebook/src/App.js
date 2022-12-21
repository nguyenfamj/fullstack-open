import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const onInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onAddNewName = (event) => {
    event.preventDefault();

    setPersons(persons.concat({ name: newName }));

    setNewName('');
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
          <button type='submit' onClick={onAddNewName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
