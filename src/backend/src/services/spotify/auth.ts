// URI on spotify changes dependind on the ngrok http 4000 tunnel
import express from "express";
import fetch from "node-fetch";
import { generatePKCE, generateState } from "./pkce";
import { SpotifyTokenResponse } from "./types";

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const verifiersMap = new Map<string, { verifier: string; timeStamp: number }>();

// scopes needed for the app
const SCOPES = ["user-library-read", "user-top-read"].join(" ");

// GET /api/spotify/login
// step 1 logins with OAuth PKCE flow, redirecting to spotify auth
router.get("/login", (req, res) => {
  if (!CLIENT_ID || !REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: "Spotify client ID or redirect URI not configured." });
  }
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = generateState();

  verifiersMap.set(state, {
    verifier: codeVerifier,
    timeStamp: Date.now(),
  });

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // builds authorization URL page
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("client_id", CLIENT_ID);
  authUrl.searchParams.append("scope", SCOPES);
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.append("state", state);
  authUrl.searchParams.append("code_challenge_method", "S256");
  authUrl.searchParams.append("code_challenge", codeChallenge);

  console.log("redirecting to Spotify auth URL:", authUrl.href);
  res.redirect(authUrl.href.toString());
});

// GET /api/spotify/callback?${searchParams}
// step 2: spotify redirection callback after login
router.get("/callback", async (req, res) => {
  const { code, state, error } = req.query;

  // user refuses auth
  if (error) {
    return res
      .status(400)
      .json({ error: `Spotify authorization error: ${error}` });
  }

  if (!code || !state) {
    return res
      .status(400)
      .json({ error: "Missing code or state in callback." });
  }

  // (anti-CRSF)
  const stored = verifiersMap.get(state as string);
  if (!stored) {
    return res
      .status(400)
      .json({ error: "Invalid or expired state parameter." });
  }

  //state doesn't expire
  if (Date.now() - stored.timeStamp > 10 * 60 * 1000) {
    verifiersMap.delete(state as string);
    return res.status(400).json({ error: "State parameter has expired." });
  }

  // no erros? great! proceed to token exchange
  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // spotify requires basic auth with client if and secret
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code as string,
          redirect_uri: REDIRECT_URI as string,
          code_verifier: stored.verifier,
        }).toString(),
      }
    );
    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    if (!tokenResponse.ok) {
      console.error("Spotify token exchange failed:", tokenData);
      return res.status(400).json({
        error: "Failed to exchange token with Spotify.",
        details: tokenData,
      });
    }

    if (!tokenData.access_token) {
      console.error("No access token received:", tokenData);
      return res
        .status(500)
        .json({ error: "No access token received from Spotify." });
    }

    console.log("Spotify token exchange successful.");
    // Successfully obtained access token
    return res.status(200).json({
      success: true,
      tokens: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        scope: tokenData.scope,
      },
    });
  } catch (e) {
    console.error("Error during Spotify token exchange:", e);
    return res
      .status(500)
      .json({ error: "Internal server error during token exchange." });
  } finally {
    verifiersMap.delete(state as string);
  }
});

export default router;
