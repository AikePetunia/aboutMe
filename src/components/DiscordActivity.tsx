import "../styles/discordActivity.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchLanyard } from "../hooks/useLanyard";
import { resolveEmojiUrl, formatMusicTime } from "../utils/discordUtils";
import { Spotify } from "./discordActivity/Spotify";
import { Obsidian } from "./discordActivity/Obsidian";
import { Code } from "./discordActivity/Code";
import { CustomStatus } from "./discordActivity/CustomStatus";

type ActivityKind = "spotify" | "code" | "obsidian" | "idle";
type Pane = { kind: ActivityKind; node: React.ReactNode; key: string };

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
        // si termino la cancion, refetch
        if (now > data.spotify.timestamps.end + 3000) fetchData();
        // si no cada 1min
        if (now - lastFetchTime.current > 60000) fetchData();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [data?.spotify?.timestamps?.end]);

  const dsStatus = data?.discord_status || "";
  const dsSpotify = data?.spotify || null;
  const dsActivities = data?.activities || [];

  const custom = dsActivities.find((a: any) => a.type === 4) || {};
  const emojiUrl = custom?.emoji ? resolveEmojiUrl(custom.emoji) : null;
  const statusText = custom?.state || "";

  const code = dsActivities.find((a: any) => a?.name === "Visual Studio Code");
  const obsidian = dsActivities.find((a: any) => a?.name === "Obsidian");

  const albumArt = dsSpotify?.album_art_url || "";
  const musicTime = dsSpotify
    ? formatMusicTime(dsSpotify.timestamps?.start, dsSpotify.timestamps?.end)
    : { current: "0:00", total: "0:00", progress: 0 };

  const panes: Pane[] = useMemo(() => {
    const list: Pane[] = [];

    if (!data) {
      return [
        {
          kind: "idle",
          key: "loading",
          node: <p>wait till the fetch :3</p>,
        },
      ];
    }

    if (dsSpotify) {
      list.push({
        kind: "spotify",
        key: `spotify:${dsSpotify?.track_id ?? "unknown"}`,
        node: (
          <Spotify
            spotify={dsSpotify}
            albumArt={albumArt}
            musicTime={musicTime}
            emojiUrl={emojiUrl}
            statusText={statusText}
          />
        ),
      });
    }
    if (code && !obsidian) {
      list.push({
        kind: "code",
        key: `code:${code?.application_id ?? "vs"}`,
        node: (
          <Code activity={code} emojiUrl={emojiUrl} statusText={statusText} />
        ),
      });
    }
    if (obsidian && !code) {
      list.push({
        kind: "obsidian",
        key: `obsidian:${obsidian?.application_id ?? "obs"}`,
        node: (
          <Obsidian
            activity={obsidian}
            emojiUrl={emojiUrl}
            statusText={statusText}
          />
        ),
      });
    }
    if (list.length === 0) {
      list.push({
        kind: "idle",
        key: "idle",
        node: (
          <div className="activity-container">
            <h3 className="activity-detail">Just existing</h3>
            {(emojiUrl || statusText) && (
              <div className="emote no">
                {statusText && (
                  <p className={`status-text-${emojiUrl ? "emoji" : "normal"}`}>
                    {statusText}
                  </p>
                )}
                {emojiUrl && <img src={emojiUrl} alt=""></img>}
              </div>
            )}
          </div>
        ),
      });
    }
    return list;
  }, [
    data,
    dsSpotify,
    albumArt,
    musicTime,
    emojiUrl,
    statusText,
    code,
    obsidian,
  ]);

  if (!data) {
    return (
      <div className={`discord-container ds-activity ${dsStatus}`}>
        <ActivityRotator panes={panes} />
      </div>
    );
  }

  return (
    <div className={`discord-container ds-activity ${dsStatus}`}>
      <ActivityRotator panes={panes} />
    </div>
  );
}

// transitioner
function ActivityRotator({
  panes,
  showMs = 20000, // visible time
  fadeMs = 500, // fade duration
}: {
  panes: Pane[];
  showMs?: number;
  fadeMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState<"in" | "out">("in");
  const timerRef = useRef<number | null>(null);

  // change pane reset
  useEffect(() => {
    setIdx(0);
    setFading("in");
  }, [panes.map((p) => p.key).join("|")]);

  useEffect(() => {
    // only use one there is more than one pane
    if (panes.length <= 1) return;

    const startVisiblePhase = () => {
      timerRef.current = window.setTimeout(() => {
        setFading("out");
        timerRef.current = window.setTimeout(() => {
          setIdx((i) => (i + 1) % panes.length);
          setFading("in");
          startVisiblePhase();
        }, fadeMs);
      }, showMs);
    };

    startVisiblePhase();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [panes.length, showMs, fadeMs]);

  const current = panes[idx];

  return (
    <div className="activities">
      <div
        className={`fade-stage activity ${
          fading === "out" ? "is-fading-out" : "is-fading-in"
        }`}
        style={{ transitionDuration: `${fadeMs}ms` }}
        key={current.key}
      >
        {current.node}
      </div>
    </div>
  );
}

export default DiscordActivity;
