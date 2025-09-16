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

        // refetching each 30s
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

  const dsStatus = data.discord_status;
  const dsSpotify = data.spotify || null;
  const dsActivites = data.activities || [];

  const custom = data.activities.find((a: any) => a.type === 4) || {};

  const emojiUrl = custom?.emoji ? resolveEmojiUrl(custom.emoji) : null;
  const statusText = custom?.state || "";

  // ! Visual Studio Code Variables
  const code = data.activities.find(
    (a: any) => a.name === "Visual Studio Code"
  );
  const appId = code?.application_id;
  const largeImg = resolveActivityImage(appId, code?.assets?.large_image);

  // ! Spotify Variables - Only compute these if dsSpotify exists
  const albumArt = dsSpotify?.album_art_url || "";
  const musicTime = dsSpotify
    ? formatMusicTime(dsSpotify.timestamps?.start, dsSpotify.timestamps?.end)
    : { current: "0:00", total: "0:00", progress: 0 };

  // ! Obsidian Variables
  const obsidian = dsActivites.find(
    (activity: Activity) => activity.name === "Obsidian"
  );
  const obsidianAppId = obsidian?.application_id;
  const obsidianLogo = resolveActivityImage(
    obsidianAppId,
    obsidian?.assets?.large_image
  );

  const CustomStatus = () => (
    <>
      {(emojiUrl || statusText) && (
        <div className="emote">
          {statusText && (
            <p className={`status-text-${emojiUrl ? "emoji" : "normal"}`}>
              {statusText}
            </p>
          )}
          {emojiUrl && <img src={emojiUrl} alt=""></img>}
        </div>
      )}
    </>
  );

  const SpotifyInfo = () => (
    <>
      <div className="album-container">
        <a href={`https://open.spotify.com/track/${dsSpotify?.track_id}`}>
          <img className="activity-image" src={albumArt} alt=""></img>
        </a>
        <CustomStatus />
      </div>
      <div className="activity-container">
        <a href={`https://open.spotify.com/track/${dsSpotify?.track_id}`}>
          <h3 className="activity-detail">{dsSpotify?.song}</h3>
        </a>
        <h4 className="activity-state">{dsSpotify?.artist}</h4>
        <span className="activity-time">
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
    </>
  );

  const codeActivity = () => (
    <>
      {!dsSpotify && code && (
        <div className="ds-activity code">
          <img
            className="activity-image"
            src={largeImg || undefined}
            alt={code?.details || ""}
          />
          <h3>{code?.details}</h3>
          <h6>{code?.state}</h6>
          <h4>{code?.assets?.large_text}</h4>
          <time>{formatTimeDisplay(code?.timestamps?.start)}</time>
        </div>
      )}
    </>
  );

  const obsidianActivity = () => (
    <>
      {!dsSpotify && !code && obsidian && (
        <div className="ds-activity code">
          <img
            className="activity-image"
            src={obsidianLogo || undefined}
            alt={obsidian?.details || ""}
          />
          <h3>{obsidian?.state}</h3>
          <h6>{obsidian?.details}</h6>
          <time>{formatTimeDisplay(obsidian?.timestamps?.start)}</time>
        </div>
      )}
    </>
  );

  const hyperExcepcionalCase = () =>
    !dsSpotify &&
    !code &&
    !obsidian && (
      <div className="activity-container">
        <h3 className="activity-detail">No current activity</h3>
        <CustomStatus />
      </div>
    );

  /**
   * @param (activities) - Componentes to work on transition
   * @param (timeTransition) {number} - timeouts of transition
   */
  function transitionStatus(activities = [], timeTransition = 0) {}
  return (
    <div className={`ds-activity ${dsStatus} discord-container`}>
      {dsActivites ? (
        <>
          <div className="activity">{dsSpotify && <SpotifyInfo />}</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DiscordActivity;