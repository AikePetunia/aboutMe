// https://myanimelist.net/apiconfig/references/authorization
import express from "express";
import fetch from "node-fetch";
import { generatePKCE, generateState } from "./pkce";

const router = express.Router();
const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
const MAL_REDIRECT_URI = process.env.MAL_REDIRECT_URI;
const MAL_CLIENT_SECRET = process.env.MAL_SECRET_CLIENT_ID;

const verifiersMap = new Map<string, { verifier: string; timestamp: number }>();

// step 1: user logins in mal, being redirected with the code
// GET /api/mal/login
router.get("/login", (req, res) => {
  const state = generateState();
  console.log("MAL_CLIENT_ID:", MAL_CLIENT_ID);
  console.log("MAL_REDIRECT_URI:", MAL_REDIRECT_URI);

  if (!MAL_CLIENT_ID || !MAL_REDIRECT_URI) {
    return res.status(500).json({
      error: "Server configuration error",
      details: "MAL credentials not configured",
    });
  }

  const { codeVerifier, codeChallenge } = generatePKCE();

  // passes the verifier for later token exchange
  verifiersMap.set(state, {
    verifier: codeVerifier,
    timestamp: Date.now(),
  });

  /* 
    GET https://myanimelist.net/v1/oauth2/authorize?
    response_type=code
    &client_id=YOUR_CLIENT_ID
    &state=YOUR_STATE
    &redirect_uri=YOUR_REDIRECT_URI
    &code_challenge=YOUR_PKCE_CODE_CHALLENGE
    &code_challenge_method=plain 
    HTTP/1.1
    Host: YOUR_HOST_URL
  */

  const authUrl = new URL("https://myanimelist.net/v1/oauth2/authorize");
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("client_id", MAL_CLIENT_ID!);
  authUrl.searchParams.append("redirect_uri", MAL_REDIRECT_URI!);
  authUrl.searchParams.append("code_challenge", codeChallenge);
  authUrl.searchParams.append("code_challenge_method", "plain");
  authUrl.searchParams.append("state", state);

  // redirect to MAL for authentication
  res.redirect(authUrl.toString());
});

// step 2: we get back with the code, exchange it for tokens
// GET /api/mal/callback?code=...&state=...
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state)
    return res.status(400).json({ error: "Missing code or state" });

  // retrieve the verifier, for checking
  const stored = verifiersMap.get(state as string);
  if (!stored)
    return res
      .status(400)
      .json({ error: "invalidad state, check how it saves on the login" });

  if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
    verifiersMap.delete(state as string);
    return res.status(400).json({ error: "state expired" });
  }

  try {
    // exchange the code for tokens
    const tokenResponse = await fetch(
      "https://myanimelist.net/v1/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code as string,
          redirect_uri: MAL_REDIRECT_URI!,
          client_id: MAL_CLIENT_ID!,
          client_secret: MAL_CLIENT_SECRET!,
          code_verifier: stored.verifier,
        }).toString(),
      }
    );

    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };

    // Verifica si hay error
    if (!tokenResponse.ok) {
      console.error("MAL token error:", tokenData);
      return res.status(400).json({
        error: "Token exchange failed",
        details: tokenData,
      });
    }

    // Verifica que el token existe
    if (!tokenData.access_token) {
      console.error("No access token in response:", tokenData);
      return res.status(500).json({ error: "No access token received" });
    }

    console.log(
      "Token obtained successfully:",
      tokenData.access_token.substring(0, 10) + "..."
    );

    // saves token in cookie
    res.cookie("mal_token", tokenData.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: "localhost",
      path: "/",
      maxAge: tokenData.expires_in * 1000,
    });

    // redirects to front
    res.redirect(`http://localhost:3000/?token=${tokenData.access_token}`);
  } catch (e) {
    console.error("MAL callback error", e);
    res.status(500).json({ error: "Internal server error" });
  }

  verifiersMap.delete(state as string);
});

export default router;
