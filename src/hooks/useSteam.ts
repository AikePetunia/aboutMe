export async function fetchSteam() {
  const base =
    process.env.REACT_APP_API_BASE ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "");

  const res = await fetch(`${base}/api/steam/recent`);
  const text = await res.text();

  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Steam backend devolvió algo que no es JSON:", text);
    throw err;
  }
}
