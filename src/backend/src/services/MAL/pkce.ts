import crypto from "crypto";

// MAL has PKCE for authentication with OAuth 2.0
// generates verifier and challenge for PKCE
export function generatePKCE() {
  const codeVerifier = crypto
    .randomBytes(96)
    .toString("base64url")
    .slice(0, 128);

  // 'NOTE: Currently, only the plain method is supported.'
  const codeChallenge = codeVerifier;

  return { codeVerifier, codeChallenge };
}

export function generateState() {
  return crypto.randomBytes(32).toString("hex");
}
