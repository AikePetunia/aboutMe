// sections/LeftColumn.tsx
import "./leftColumn.css";
import { AboutMe } from "../../components/leftColumn/aboutMe/AboutMe";
import { Spotify } from "../../components/leftColumn/Spotify/Spotify";
import { Vrchat } from "../../components/leftColumn/vrchat/Vrchat";
import { CurrentlyPlaying } from "../../components/leftColumn/Steam/Steam";
import { CountryData } from "../../components/leftColumn/countryData/CountryData";
import { LetterBox } from "../../components/leftColumn/Letterbox/LetterBox";
import { Wakatime } from "../../components/leftColumn/Wakatime/Wakatime";
import { Anime } from "../../components/leftColumn/Anime/Anime";

export default function LeftColumn() {
  return (
    <div className="left-grid">
      <div className="about-me-grid">
        <AboutMe />
      </div>
      <div className="spotify-grid">
        <Spotify />
      </div>
      <div className="vrchat-grid">
        <Vrchat />
      </div>
      <div className="curr-playing-grid">
        <CurrentlyPlaying />
      </div>
      <div className="country-data-grid">
        <CountryData />
      </div>
      <div className="letterbox-grid">
        <LetterBox />
      </div>
      <div className="wakatime-grid">
        <Wakatime />
      </div>
      <div className="anime-grid">
        <Anime />
      </div>
    </div>
  );
}
