import { fetchWeather } from "../../../hooks/useWeather";

export function CountryData() {
  fetchWeather().then((data) => {
    console.log(data);
  });
  return (
    <>
      <p>Clima + hora</p>
    </>
  );
}

export default CountryData;
