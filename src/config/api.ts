export const API_KEY = process.env.REACT_APP_API_KEY || "";

export function getAuthHeaders() {
  const isProd =
    typeof window !== "undefined" && window.location.hostname !== "localhost";
  if (isProd && API_KEY) {
    return { Authorization: `Bearer ${API_KEY}` };
  }
  return {};
}

export function getApiBase() {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && window.location.hostname === "localhost") {
    return "http://localhost:4000";
  }
  return "https://api.aike.tech";
}
