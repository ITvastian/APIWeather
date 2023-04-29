import { useEffect, useState } from "react";
import { getCountries } from "./services/getCountries";
import { getCities } from "./services/getCities";
import { getCityWeather } from "./services/weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);



  useEffect(() => {
    (async () => {
      setCountries(await getCountries());
    })();
  }, []);
  const countryHandler = async (e) => e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
  const cityHandler = async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));


  return (
    <>
      <div>
        <label>Choose a country</label>
        <select onChange={countryHandler}>
          <option>Select Country</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {cities.length > 0 && (
        <div>
          <label>Choose a city</label>
          <select onChange={cityHandler}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
      )}
      <hr />
      {weather && (
        <div>
          <h2>Actual temperature: {weather.main.temp}°</h2>
          <p>min: {weather.main.temp_min}°</p>
          <p>max: {weather.main.temp_max}°</p>
          <p>Humidity {weather.main.humidity}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
        </div>
      )}

      <div>
        <h3>ITvastian</h3>
      </div>
    </>
  );
};

export default App;
