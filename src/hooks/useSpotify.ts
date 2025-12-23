// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQBd5cx6wiLvL16DuvW6z0KwHlnp3R29x4517u9mkxeRNxh7oQSfwZMs04Ub6zIs6bxGmiiD2mFOwqYJYOixcz8dPP5Af6V-0Dln3CgTcbWu-tQa0X2KTCTQ4I_tmieETE4-iAQ1nHUHNSTX2sYgrwp1Ey86V6PlUiDXD6yElYISakbZYadXVXj-cJy-_-qDnBhqtwvSTmG4FYhEQkkcs7FYiLeqcAuFzorXynzLu6uU88dAwMytEfLEMbdip0M97rH_4Yh4it3jvLod_-XyZeOQcvTjdIFQlRcyy1F8soNlingvWvH9Ni3qsDuyuCwSxz1egWd4";
async function fetchWebApi(endpoint, method, body) {
  const options: RequestInit = {
    headers: { Authorization: `Bearer ${token}` },
    method,
  };
  if (body && method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`https://api.spotify.com/${endpoint}`, options);
  return res.json();
}

export async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi(
      "v1/me/top/tracks?time_range=long_term&limit=5",
      "GET",
      null
    )
  ).items;
}
