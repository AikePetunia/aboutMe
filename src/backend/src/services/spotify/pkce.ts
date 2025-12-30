/*
 In scenarios where storing the client secret is not safe (e.g. desktop, mobile apps or JavaScript web apps running in the browser), 
 you can use the authorization code with PKCE, as it provides protection against attacks where the authorization code may be intercepted.
 */
import crypto from "crypto";

// spotify uses SHA256, instead of plain as MAL does
export function generatePKCE() {
  // code verifieres 43-128 chars long
  const codeVerifier = crypto
    .randomBytes(64)
    .toString("base64url") // generates 64 bytes and passes to base64url
    .slice(0, 128); // doesnt exceed 128 chars

  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  return { codeVerifier, codeChallenge };
}

export function generateState() {
  return crypto.randomBytes(32).toString("hex");
}
