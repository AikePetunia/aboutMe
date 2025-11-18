// sections/LeftColumn.tsx
import "./leftColumn.css";
import { AboutMe } from "../../components/leftColumn/aboutMe/AboutMe";
import { Github } from "../../components/leftColumn/github/Github";
import { Vrchat } from "../../components/leftColumn/vrchat/Vrchat";
import { CurrentlyPlaying } from "../../components/leftColumn/currentlyPlaying/CurrentlyPlaying";
import { CountryData } from "../../components/leftColumn/countryData/CountryData";
import { LetterBox } from "../../components/leftColumn/letterbox/LetterBox";
import { Spotify } from "../../components/leftColumn/spotify/Spotify";
import { Anime } from "../../components/leftColumn/anime/Anime";
  
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
