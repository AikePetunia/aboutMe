// sections/LeftColumn.tsx
import "../styles/leftColumn.css";
import { AboutMe } from "../components/leftColumn/aboutMe/AboutMe";
import { Github } from "../components/leftColumn/Github";
import { Vrchat } from "../components/leftColumn/Vrchat";
import { CurrentlyPlaying } from "../components/leftColumn/CurrentlyPlaying";
import { CountryData } from "../components/leftColumn/CountryData";
import { LetterBox } from "../components/leftColumn/LetterBox";
import { Spotify } from "../components/leftColumn/Spotify";
import { Anime } from "../components/leftColumn/Anime";
  
export default function LeftColumn() {
  return (
    <div className="left-grid">
      <div className="about-me-grid">
        <AboutMe />
      </div>
      <div className="github-grid">
        <Github />
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
      <div className="spotify-grid">
        <Spotify />
      </div>
      <div className="anime-grid">
        <Anime />
      </div>
    </div>
  );
}
