import { useEffect, useState } from "react";
import { fetchAnimes, MALAnimeItem } from "../../../hooks/useMAL";

export function Anime() {
  const [animes, setAnimes] = useState<MALAnimeItem[]>([]);

  useEffect(() => {
    fetchAnimes().then((data) => setAnimes(data.data || []));
  }, []);

  return (
    <div className="anime-list">
      {animes.map((item) => (
        <div key={item.node.id} className="anime-item">
          {item.node.main_picture?.large && (
            <img
              src={item.node.main_picture.large}
              alt={item.node.title}
              style={{ width: 120, height: 180, objectFit: "cover" }}
            />
          )}

          <div>
            <h4>{item.node.title}</h4>
            {item.list_status?.score && <p> {item.list_status.score}/10</p>}
            {item.node.mean && <p> {item.node.mean}/10</p>}
            {item.node.num_episodes && <p>{item.node.num_episodes}</p>}
            {item.list_status?.status && <p> {item.list_status.status}</p>}
            {item.node.genres && (
              <p>{item.node.genres.map((g) => g.name).join(", ")}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
