import React from "react";
import { fetchMalCompletedByScore } from "../../../hooks/useMAL";

export function Anime() {
  const [data, setData] = React.useState<{ anime: any[]; manga: any[] } | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchMalCompletedByScore()
      .then(setData)
      .catch((e) => setError(e?.message ?? "Error"));
  }, []);

  if (error) return <p>MAL error: {error}</p>;
  if (!data) return <p>Cargando MAL…</p>;

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div>
        <h3>Anime (completed) por score</h3>
        <ol>
          {data.anime.slice(0, 10).map((x) => (
            <li key={x.id}>
              {x.title} — {x.score}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3>Manga (completed) por score</h3>
        <ol>
          {data.manga.slice(0, 10).map((x) => (
            <li key={x.id}>
              {x.title} — {x.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
