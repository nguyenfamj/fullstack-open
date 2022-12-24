import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CountryInfo.css';

const CountryInfo = ({ country, detailed }) => {
  const [isShowed, setIsShowed] = useState(false);
  const [weather, setWeather] = useState({});

  console.log(weather);

  useEffect(() => {
    if (isShowed || detailed) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [isShowed]);

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
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>- {language}</li>
            ))}
          </ul>
        </div>

        <div className='weather-wrapper'>
          <h2>Weather in {country.capital}</h2>
          <div className='flex-box'>
            <h3>Temperature</h3>
            <div>{weather.main?.temp} &#8451;</div>
          </div>

          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png`}
            alt=''
          />

          <div className='flex-box'>
            <h3>Wind</h3>
            <div>{weather?.wind?.speed} m/s</div>
          </div>
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
