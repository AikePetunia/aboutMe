// actually gets data from here
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// gets all the animes
// En anime.ts
router.get("/user/anime", async (req, res) => {
  const token = process.env.MAL_ACCESS_TOKEN;

  console.log("Token:", token ? "exists" : "missing");

  console.log("Cookies received:", req.cookies); // Debug

  if (!token) return res.status(401).json({ error: "Unauthorized - No token" });

  try {
    const url =
      "https://api.myanimelist.net/v2/users/@me/animelist?" +
      "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis," +
      "mean,rank,popularity,num_episodes,status,genres,media_type,rating," +
      "my_list_status{score,status,num_episodes_watched,is_rewatching,start_date,finish_date,tags,comments}&" +
      `limit=100&status=${req.query.status || "completed"}`;
      
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MAL API error:", data); // Debug
      return res
        .status(response.status)
        .json({ error: "MAL API error", details: data });
    }

    return res.status(200).json(data);
  } catch (e) {
    console.error("MAL fetch anime error", e);
    return res
      .status(500)
      .json({ error: "Internal server error", details: String(e) });
  }
});

export default router;
