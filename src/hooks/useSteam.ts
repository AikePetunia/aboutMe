// Local copies of backend types to avoid cross-repo import.
type SteamGame = {
  appId: number | string;
  name: string;
  icon: string;
  playtimeHours: number;
};

type ApiOk<T> = { ok: true; data: T };
type ApiErr = {
  ok: false;
  provider?: string;
  error: { code: string; message: string; status: number };
};

type SteamDto = { games: SteamGame[] };

export async function fetchSteam(): Promise<SteamDto> {
  const { getApiBase, getAuthHeaders } = await import("../config/api");
  const base = getApiBase();
  const res = await fetch(`${base}/api/steam/recent`, {
    headers: getAuthHeaders(),
  });

  const text = await res.text();

  let payload: ApiOk<SteamDto> | ApiErr | any;

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

  if (payload && payload.games) return payload as SteamDto;

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  return payload as SteamDto;
}
