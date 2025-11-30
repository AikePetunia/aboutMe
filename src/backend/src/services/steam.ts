import { Router } from "express";
import fetch from "node-fetch";

const router = Router();
const ENDPOINT =
  "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";

router.get("/recent", async (_req, res) => {
  const steamKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  console.log("steam handler env", { hasKey: !!steamKey, hasId: !!steamId });

  if (!steamKey || !steamId) {
    return res.status(500).json({ error: "Steam API key or Steam ID not set" });
  }

  try {
    const url = `${ENDPOINT}?key=${steamKey}&steamid=${steamId}&format=json`;
    const response = await fetch(url);
    console.log("Steam request", url, "status", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("Steam error body:", text);
      return res.status(502).json({
        error: "Steam fetch failed",
        status: response.status,
        body: text,
      });
    }

    const raw = (await response.json()) as SteamRawResponse;
    const games =
      raw.response.games?.map((g) => ({
        appId: g.appid,
        name: g.name,
        playtimeHours: (g.playtime_forever ?? 0) / 60,
        icon: `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`,
      })) ?? [];

    res.json({ fetchedAt: Date.now(), games });
  } catch (err) {
    console.error("Steam handler crashed:", err);
    res.status(502).json({ error: "Steam fetch failed", detail: String(err) });
  }
});

interface SteamRawResponse {
  response: {
    total_count: number;
    games?: Array<{
      appid: number;
      name: string;
      playtime_forever?: number;
      img_icon_url: string;
    }>;
  };
}

export default router;
