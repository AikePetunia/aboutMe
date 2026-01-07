import { useEffect, useState } from "react";
import { fetchSpotifyPlaylists, SpotifyPlaylist } from "../../../hooks/useSpotify";
import "./spotify.css";

export function Spotify() {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);

useEffect(() => {
  fetchSpotifyPlaylists().then((data) => setPlaylists(data.playlists || []));
}, []);
  
  return (
    <>
      <h4>My playlists ! &gt;&lt; </h4>
      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            {playlist.images[0] && (
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  style={{ width: 120, height: 120, objectFit: "cover" }}
                />
              </a>
            )}
            <div className="playlist-info">
              <h4>{playlist.name}</h4>
              <p>{playlist.description}</p>
              <p>songs: {playlist.tracks.total}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Spotify;