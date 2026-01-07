// sections/LeftColumn.tsx
import "./leftColumn.css";
import { AboutMe } from "../../components/leftColumn/aboutMe/AboutMe";
import { Spotify } from "../../components/leftColumn/spotify/Spotify";
import { Vrchat } from "../../components/leftColumn/vrchat/Vrchat";
import { CurrentlyPlaying } from "../../components/leftColumn/steam/Steam";
import { CountryData } from "../../components/leftColumn/countryData/CountryData";
import { LetterBox } from "../../components/leftColumn/letterbox/LetterBox";
import { Wakatime } from "../../components/leftColumn/wakatime/Wakatime";
import { Anime } from "../../components/leftColumn/anime/Anime";

export default function LeftColumn() {
  const isPhone = window.innerWidth <= 850;

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
      {!isPhone && (
        <>
          <div className="letterbox-grid">
            <LetterBox />
          </div>
          <div className="wakatime-grid">
            <Wakatime />
          </div>
        </>
      )}
      <div className="anime-grid">
        <Anime />
      </div>
      {isPhone && (
        <div className="phone-left-spacing">
          <Wakatime />
          <LetterBox />
        </div>
      )}
    </div>
  );
}
