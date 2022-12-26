import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getPersons = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

export const createPerson = (newPerson) => {
  const response = axios.post(baseUrl, newPerson);

  return response.then((response) => response.data);
};

export const updatePerson = (personId, updatedPerson) => {
  const response = axios.put(`${baseUrl}/${personId}`, updatedPerson);

  return response.then((response) => response.data);
};

export const deletePerson = (personId) => {
  const response = axios.delete(`${baseUrl}/${personId}`);

  return response.then((response) => response.data);
};
