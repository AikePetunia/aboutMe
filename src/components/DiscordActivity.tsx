import "../styles/discordActivity.css";
import { useEffect, useState, useRef } from "react";
import { fetchLanyard } from "../hooks/useLanyard";
import {
  resolveActivityImage,
  resolveEmojiUrl,
  formatTimeDisplay,
  formatMusicTime,
} from "../utils/discordUtils";

export function DiscordActivity() {
  const [data, setData] = useState<any | null>(null);
  const [tick, setTick] = useState(0);
  const lastFetchTime = useRef<number>(Date.now());

  const fetchData = async () => {
    try {
      const json = await fetchLanyard();
      setData(json.data);
      lastFetchTime.current = Date.now();
    } catch (error) {
      console.error("Error fetching Discord activity:", error);
    }
  };
  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
      if (data?.spotify?.timestamps?.end) {
        const now = Date.now();
        // once start time of the music reaches the end, refetchs
        if (now > data.spotify.timestamps.end + 3000) {
          fetchData();
        }

        // refetching each 30s?? idk
        if (now - lastFetchTime.current > 30000) {
          fetchData();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.spotify?.timestamps?.end]);

  if (!data) return <p>Cargando presencia...</p>;

  // ! General Variables & Helpers

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

  function formatMusicTime(
    start?: number,
    end?: number
  ): { current: string; total: string; progress: number } {
    if (!start || !end) return { current: "0:00", total: "0:00", progress: 0 };

    const now = Date.now();
    const totalDuration = end - start;
    const currentPosition = now - start;

    const progress = Math.min(
      Math.max((currentPosition / totalDuration) * 100, 0),
      100
    );

    return {
      current: formatTimeDisplay(start, now),
      total: formatTimeDisplay(start, end),
      progress,
    };
  }

  const dsStatus = data.discord_status;
  const dsSpotify = data.spotify;
  const dsActivites = data.activities;
  const custom = data.activities.find((a: any) => a.type === 4);
  const emojiUrl = resolveEmojiUrl(custom?.emoji);

  // ! Visual Studio Code Variables
  const code = data.activities.find(
    (a: any) => a.name === "Visual Studio Code"
  );
  const appId = code?.application_id;
  const largeImg = resolveActivityImage(appId, code?.assets?.large_image);

  // ! Spotify Variables
  const albumArt = dsSpotify.album_art_url;
  const musicTime = formatMusicTime(
    dsSpotify?.timestamps?.start,
    dsSpotify?.timestamps?.end
  );

  // ! Obsidian Variables

  const obsidian = dsActivites.find(
    (dsActivites: Activity) => dsActivites.name === "Obsidian"
  );
  const obsidianAppId = obsidian?.application_id;
  const obsidianLogo = resolveActivityImage(
    obsidianAppId,
    obsidian?.assets?.large_image
  );

  return (
    <div className={`ds-activity ${dsStatus} discord-container`}>
      <div className="activity">
        <div className="album-container">
          <a href={`https://open.spotify.com/track/${dsSpotify.track_id}`}>
            <img className="activity-image" src={albumArt} alt=""></img>
          </a>
          {emojiUrl && (
            <div className="emote">
              <img src={emojiUrl} alt=""></img>
            </div>
          )}
        </div>
        <div className="activity-detail">
          <a href={`https://open.spotify.com/track/${dsSpotify.track_id}`}>
            <h3>{dsSpotify.song}</h3>
          </a>
          <h4>{dsSpotify.artist}</h4>
          <span>
            {musicTime.current} / {musicTime.total}
          </span>
          <div className="progress-bar">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${musicTime.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      
      <div>
        <div className="ds-activity code">
          <img
            className="activity-image"
            src={largeImg || undefined}
            alt={code?.details}
          />
          <h3>{code?.details}</h3>
          <h6>{code?.state}</h6>
          <h4>{code?.assets?.large_text}</h4>
          <time>{formatTimeDisplay(code?.timestamps?.start)}</time>
        </div>
        <div className="ds-activity code">
          <img
            className="activity-image"
            src={obsidianLogo || undefined}
            alt={code?.details}
          />
          <h3>{obsidian?.state}</h3>
          <h6>{obsidian?.details}</h6>
          <time>{formatTimeDisplay(obsidian?.timestamps?.start)}</time>
        </div>
      </div>
      */}
      {/* add where im active*/}
    </div>
  );
}

export default DiscordActivity;
