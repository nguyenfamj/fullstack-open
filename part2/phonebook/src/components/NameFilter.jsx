import React from 'react';

const NameFilter = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type='text'
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder='Search people'
      />
    </div>
  );
};

export default NameFilter;
