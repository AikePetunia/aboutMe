import React from "react";
import { fetchSteam } from "../../../hooks/useSteam";
import "./steam.css";

interface SteamGame {
  appId: number | string;
  name: string;
  icon: string;
  playtimeHours: number;
}

interface SteamDto {
  games: SteamGame[];
}

export function CurrentlyPlaying() {
  const [steamData, setSteamData] = React.useState<SteamDto | null>(null);

  React.useEffect(() => {
    fetchSteam()
      .then((data) => {
        setSteamData(data);
      })
      .catch((error) => {
        console.error("Error fetching Steam data:", error);
      });
  }, []);

  let gamePrefix = "https://store.steampowered.com/app/";

  return (
    <>
      <h4>Recently played on steam</h4>
      <div className="games-grid">
        {steamData?.games?.map((game) => (
          <div key={game.appId} className="game-card">
            <img src={game.icon} alt={game.name} className="game-icon" />
            <div className="game-info-container">
              <a href={gamePrefix + game.appId}>{game.name}</a>
              <p>{game.playtimeHours.toFixed(0)} hours played</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CurrentlyPlaying;
