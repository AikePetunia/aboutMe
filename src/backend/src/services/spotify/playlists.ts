import express from "express";
import fetch from "node-fetch";
import { SpotifyPlaylistsResponse } from "./types";
import { err } from "../helpers";

const router = express.Router();

// GET /api/spotify/playlists
router.get("/playlists", async (req, res) => {
  const token = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!token) {
    res.status(401).json({
      error: "spotify token not configured. Maybe you need to login first?",
    });
  }

  try {
    const limit = 15;
    const offset = 0;

    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = (await response.json()) as SpotifyPlaylistsResponse;

    if (!response.ok) {
      res.status(response.status).json({ error: data });
      return;
    }

    return res.json({
      playlists: data.items,
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    });
  } catch (error) {
    console.error("Error fetching Spotify playlists:", error);
    res
      .status(500)
      .json({ error: "Internal server error fetching Spotify playlists." });
  }
});

export default router;
