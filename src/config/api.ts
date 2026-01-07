// Central API config for frontend → backend calls.
// Reads the public env var exposed by CRA (REACT_APP_*).
export const API_KEY = process.env.REACT_APP_API_KEY || "";

// In dev (localhost) do NOT send Authorization to avoid preflight issues.
// In prod, include the Bearer token if present.
export function getAuthHeaders() {
  const isProd =
    typeof window !== "undefined" && window.location.hostname !== "localhost";
  if (isProd && API_KEY) {
    return { Authorization: `Bearer ${API_KEY}` };
  }
  return {};
}

// Localhost during dev; production goes to the custom domain.
export function getApiBase() {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && window.location.hostname === "localhost") {
    return "http://localhost:4000";
  }
  return "https://api.aike.tech";
}
