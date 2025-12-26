// this types are already o the backend files. Fix it.
import { ApiOk, ApiErr, SpotifyPlaylist } from "../backend/src/services/types";

type SpotifyDto = { playlists: SpotifyPlaylist[] };

function getApiBase() {
  return typeof window !== "undefined" &&
    window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "";
}

export async function fetchSpotifyPlaylists(): Promise<SpotifyDto> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/spotify/playlists?limit=50`);

  const text = await res.text();

  let payload: ApiOk<SpotifyDto> | ApiErr | any;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `no-JSON Response. HTTP ${res.status}. Body: ${text.slice(0, 300)}`
    );
  }

  if (payload && typeof payload.ok === "boolean") {
    if (payload.ok === true) return payload.data;

    // payload.ok === false
    const e = payload.error;
    const msg = `[${payload.provider}] ${e.code}: ${e.message} (status ${e.status})`;
    const err = new Error(msg);
    (err as any).meta = e;
    throw err;
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  if (payload && payload.playlists) return payload as SpotifyDto;
  return payload as SpotifyDto;
}
