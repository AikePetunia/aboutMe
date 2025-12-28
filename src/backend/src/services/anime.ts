import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

const MAL_BASE = "https://api.myanimelist.net/v2";

type MalListResponse = {
  data: Array<{
    node: { id: number; title: string };
    list_status?: { status: string; score: number; updated_at?: string };
  }>;
  paging?: { next?: string };
};

async function fetchAllCompleted(
  username: string,
  kind: "animelist" | "mangalist",
  clientId: string
) {
  const headers = { "X-MAL-CLIENT-ID": clientId }; // auth para info pública :contentReference[oaicite:3]{index=3}

  let offset = 0;
  const limit = 100; // si MAL te limita distinto, bajalo a 50
  const out: any[] = [];

  while (true) {
    const url =
      `${MAL_BASE}/users/${encodeURIComponent(username)}/${kind}` +
      `?status=completed&sort=list_score&fields=list_status&limit=${limit}&offset=${offset}`;

    const r = await fetch(url, { headers });
    const text = await r.text();
    if (!r.ok)
      throw new Error(`MAL ${kind} failed ${r.status}: ${text.slice(0, 200)}`);

    const json = JSON.parse(text) as MalListResponse;
    const page = json.data ?? [];
    if (page.length === 0) break;

    out.push(
      ...page.map((x) => ({
        id: x.node.id,
        title: x.node.title,
        score: x.list_status?.score ?? 0,
        updatedAt: x.list_status?.updated_at ?? null,
      }))
    );

    offset += page.length;
    if (page.length < limit) break; // última página
  }

  // Por si MAL no ordena como esperás, lo garantizamos nosotros:
  out.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  return out;
}

router.get("/api/mal/completed-by-score", async (_req, res) => {
  const clientId = process.env.MAL_CLIENT_ID;
  const username = process.env.MAL_USERNAME;

  if (!clientId || !username) {
    return res
      .status(500)
      .json({ error: "Missing MAL_CLIENT_ID or MAL_USERNAME" });
  }

  try {
    const [anime, manga] = await Promise.all([
      fetchAllCompleted(username, "animelist", clientId),
      fetchAllCompleted(username, "mangalist", clientId),
    ]);

    res.json({ ok: true, fetchedAt: Date.now(), anime, manga });
    console.log(
      `Fetched MAL completed for ${username}: ${anime.length} anime, ${manga.length} manga.`
    );
  } catch (e: any) {
    res.status(502).json({ ok: false, error: String(e?.message ?? e) });
  }
});

export default router;
