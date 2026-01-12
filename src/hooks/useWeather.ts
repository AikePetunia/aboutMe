const weatherLink =
  "https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.1811&current=temperature_2m,relative_humidity_2m&timezone=America/Argentina/Cordoba";
export async function fetchWeather() {
  const res = await fetch(weatherLink);
  return await res.json();
}
