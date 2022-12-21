import React from 'react';

const PersonForm = ({
  newName,
  newNumber,
  onInputNameChange,
  onInputNumberChange,
  onAddNewName,
}) => {
  return (
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
  );
};

export default PersonForm;
