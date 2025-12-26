import { Router } from "express";
import { fetchJson } from "./core";
import { ok, err } from "./helpers";

const router = Router();
const provider = "spotify" as const;

type SpotifyPlaylistsRawResponse = {
  items: Array<{
    id: string;
    name: string;
    public: boolean | null;
    external_urls: { spotify: string };
    images: Array<{ url: string }>;
    tracks: { total: number };
    owner: { display_name?: string; id: string };
  }>;
};

router.get("/playlists", async (_req, res) => {
  const token = process.env.SPOTIFY_API_TOKEN;

  if (!token) {
    return res.status(500).json(
      err(provider, "local", {
        code: "AUTH",
        status: 500,
        message: "SPOTIFY_API_TOKEN not set (needs a Bearer access token)",
      })
    );
  }

  const url = "https://api.spotify.com/v1/me/playlists?limit=50";
  const r = await fetchJson(provider, url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!r.ok) {
    const code =
      r.status === 401 || r.status === 403
        ? "AUTH"
        : r.status === 429
        ? "RATE_LIMIT"
        : "UPSTREAM";

    return res.status(502).json(
      err(provider, r.requestId, {
        code,
        status: r.status || 502,
        message: r.networkError || "Spotify fetch failed",
        retryAfterSec: r.retryAfterSec,
        details: r.text || r.networkError,
      })
    );
  }

  const raw = r.json as SpotifyPlaylistsRawResponse;

  const playlists = (raw.items ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    public: p.public,
    url: p.external_urls?.spotify,
    image: p.images?.[0]?.url ?? null,
    tracksTotal: p.tracks?.total ?? 0,
    owner: p.owner?.display_name ?? p.owner?.id,
  }));

  return res.json(ok(provider, { playlists }));
});

export default router;
