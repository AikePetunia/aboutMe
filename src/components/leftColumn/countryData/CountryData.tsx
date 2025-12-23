import { useEffect, useState } from "react";
import { fetchWeather } from "../../../hooks/useWeather";
import "./countryData.css";
export function CountryData() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather()
      .then((data) => {
        setWeather(data.current);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  function formatTime(weatherTime) {
    return weatherTime.slice(11, 16);
  }
  return (
    <>
      {weather ? (
        <div className="weather-card">
          <div className="weather-title">
            <h5>Weather on my city</h5>
            <p className="weather-location">Cordoba, Argentina </p>
          </div>
          <div className="weather-temp-container">
            <div>
              <span className="temp-celcius">{weather.temperature_2m}</span>
              <span className="celcius">°C</span>
            </div>
            <div>
              <span className="temp-fahrenheit">
                {((weather.temperature_2m * 9) / 5 + 32).toFixed(1)}
              </span>
              <span className="fahrenheit">°F</span>
            </div>
          </div>
          <p className="weather-humidity">
            Humidity: {weather.relative_humidity_2m}%
          </p>
          <div className="weather-condition">
            <p className="weather-time">{formatTime(weather.time)}</p>
          </div>
        </div>
      ) : (
        <p>wait till fetches :3</p>
      )}
    </>
  );
}

export default CountryData;
