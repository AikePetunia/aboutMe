import { useEffect, useState } from "react";
import { fetchWeather } from "../../../hooks/useWeather";

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

  console.log("Weather data:", weather);
  return (
    <>
      <p>Cordoba, Argentina.,</p>
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature_2m}°C</p>
          <p>Humidity: {weather.relative_humidity_2m}%</p>
          <p>time: {weather.time}</p>
        </div>
      ) : (
        <p>wait till fetches :3</p>
      )}
    </>
  );
}

export default CountryData;
