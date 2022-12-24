import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import CountryInfo from './components/CountryInfo';

function App() {
  const [appState, setAppState] = useState({
    searchTerm: '',
    filteredCountries: [],
    allCountries: [],
  });

  // Input State
  const onChangeSearch = (event) => {
    setAppState({ ...appState, searchTerm: event.target.value });
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('Fetched');
      setAppState({
        ...appState,
        allCountries: response.data,
        filteredCountries: response.data,
      });
    });
  }, []);

  useEffect(() => {
    setAppState({
      ...appState,
      filteredCountries: appState.allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(appState.searchTerm.toLowerCase())
      ),
    });
  }, [appState.searchTerm]);

  return (
    <div className='App'>
      <div className='flex-box'>
        <div>Find countries: </div>
        <input
          className='search-input'
          type='text'
          placeholder='Country name'
          value={appState.searchTerm}
          onChange={onChangeSearch}
        />
      </div>

      <div className='country-list'>
        {appState.filteredCountries.length > 10 &&
        appState.filteredCountries.length != appState.allCountries.length ? (
          <div>Too many matches, specify</div>
        ) : appState.filteredCountries.length <= 10 && appState.filteredCountries.length > 1 ? (
          appState.filteredCountries.map((country, index) => (
            <CountryInfo key={index} country={country} />
          ))
        ) : appState.filteredCountries.length === 1 ? (
          <CountryInfo country={appState.filteredCountries[0]} detailed />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
