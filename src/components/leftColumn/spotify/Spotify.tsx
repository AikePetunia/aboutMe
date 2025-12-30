import { useEffect, useState } from "react";
import { fetchSpotifyPlaylists, SpotifyPlaylist } from "../../../hooks/useSpotify";
export function Spotify() {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);

useEffect(() => {
  fetchSpotifyPlaylists().then((data) => setPlaylists(data.playlists || []));
}, []);
  
  return (
    <>
      {playlists.map((playlist) => (
        <div key={playlist.id} className="spotify-playlist">
          {playlist.images[0] && (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
          )}
          <div>
            <h4>{playlist.name}</h4>
            <p>{playlist.description}</p>
            <p>Creador: {playlist.owner.display_name}</p>
            <p>Canciones: {playlist.tracks.total}</p>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Ver en Spotify
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default Spotify;