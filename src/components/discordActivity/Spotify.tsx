import { CustomStatus } from "./CustomStatus";
interface SpotifyData {
  track_id?: string;
  song?: string;
  artist?: string;
}
interface MusicTime {
  current: string;
  total: string;
  progress: number;
}

interface SpotifyProps {
  spotify: SpotifyData;
  albumArt: string;
  musicTime: MusicTime;
  emojiUrl: string | null;
  statusText: string | null;
}
export function Spotify({
  spotify,
  albumArt,
  musicTime,
  emojiUrl,
  statusText,
}: SpotifyProps) {
  return (
    <>
      <div className="album-container">
        <a href={`https://open.spotify.com/track/${spotify?.track_id}`}>
          <img className="activity-image" src={albumArt} alt=""></img>
        </a>
        <CustomStatus emojiUrl={emojiUrl} statusText={statusText} />
      </div>
      <div className="activity-container">
        <a href={`https://open.spotify.com/track/${spotify?.track_id}`}>
          <h3 className="activity-detail">{spotify?.song}</h3>
        </a>
        <h4 className="activity-state">{spotify?.artist}</h4>
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
}

export default Spotify;
