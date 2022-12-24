import React, { useState } from 'react';
import './CountryInfo.css';

const CountryInfo = ({ country, detailed }) => {
  const [isShowed, setIsShowed] = useState(false);

  console.log(country.name.common);
  return detailed || isShowed ? (
    <div className='mt-20'>
      <h1>{country.name.common}</h1>

      <img src={country.flags.png} alt='' className='country-flag' />

      <div className='info-wrapper'>
        <div className='flex-box'>
          <h3>Population</h3>
          <div>{country.population}</div>
        </div>

        <div className='flex-box'>
          <h3>Currency</h3>
          <div>{Object.keys(country.currencies)[0]}</div>
        </div>

        <div className='flex-box'>
          <h3>Capital</h3>
          <div>{country.capital}</div>
        </div>

        <div className='flex-box'>
          <h3>Area</h3>
          <div>{country.area}</div>
        </div>

        <div>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li>- {language}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className='country-info flex-box'>
      <div>{country.name.common}</div>
      <button onClick={() => setIsShowed(!isShowed)}>Show</button>
    </div>
  );
};

export default CountryInfo;
