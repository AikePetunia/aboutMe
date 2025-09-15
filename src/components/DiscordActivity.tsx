import "../styles/discordActivity.css";
import { useEffect, useState } from "react";
import { fetchLanyard } from "../hooks/useLanyard";
export function DiscordActivity() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetchLanyard().then((json) => setData(json.data));
  }, []);

  if (!data) return <p>Cargando presencia...</p>;

  const dsStatus = data.discord_status;
  const dsSpotify = data.spotify;
  const dsActivites = data.activities;

  interface Activity {
    name: string;
    [key: string]: any;
  }

  interface SpotifyData {
    [key: string]: any;
  }

  interface LanyardData {
    discord_status: string;
    spotify: SpotifyData | null;
    data: {
      activities: Activity[];
    };
  }

  const codeActivity = dsActivites.find(
    (dsActivites: Activity) => dsActivites.name === "Code"
  );
  const mathActivity = dsActivites.find(
    (dsActivites: Activity) => dsActivites.name === "obsidian"
  );

  const albumArt = dsSpotify.album_art_url;

  /* 
    Actividades de interes:
    Spotify - Code - Obsidian 
    NO pueden aparecer una atras de la otra, en todo caso se hace 
    un carousel (automatico?)
    segun el estado -> segun el color de background
  */

  console.log(dsActivites);
  console.log(dsSpotify);
  return (
    <div className={`ds-activity ${dsStatus} discord-container`}>
      <div className="activity">
        <a href={`https://open.spotify.com/track/${dsSpotify.track_id}`}>
          <img className="activity-image" src={albumArt} alt=""></img>
        </a>
        <h3>{dsSpotify.artist}</h3>
        <h4>{dsSpotify.song}</h4>
        <span>
          {dsSpotify.timestamps.start} / {dsSpotify.timestamps.end}
        </span>
      </div>
    </div>
  );
}

export default DiscordActivity;
