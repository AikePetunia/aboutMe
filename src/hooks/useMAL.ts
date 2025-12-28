export async function fetchMalCompletedByScore(): Promise<MalCompletedByScoreDto> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/mal/completed-by-score`);
  const text = await res.text();

  let payload: any;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `no-JSON Response. HTTP ${res.status}. Body: ${text.slice(0, 300)}`
    );
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  // si tu backend devuelve { ok: true, anime, manga }
  if (payload?.ok === true) {
    return { anime: payload.anime ?? [], manga: payload.manga ?? [] };
  }

  // si devuelve { ok:false, error: ... }
  if (payload?.ok === false) {
    throw new Error(String(payload.error ?? "MAL request failed"));
  }

  // fallback si devuelve directo {anime, manga}
  if (payload?.anime && payload?.manga)
    return payload as MalCompletedByScoreDto;

  throw new Error("Unexpected MAL response shape");
}
function getApiBase() {
  return typeof window !== "undefined" &&
    window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "";
}
