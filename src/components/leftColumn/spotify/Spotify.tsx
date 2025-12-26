import { useEffect, useState } from "react";
import { fetchSpotifyPlaylists } from "../../../hooks/useSpotify";

export function Spotify() {
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    fetchSpotifyPlaylists().then((tracks) => {
      setTopTracks(tracks);
    });
  });

  console.log(
    topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    )
  );
  // i could jsut create a playlist to allow people to add music and i hear it lol
  return (
    <>
      {" "}
      <p>spotify</p>
    </>
  );
}

export default Spotify;
