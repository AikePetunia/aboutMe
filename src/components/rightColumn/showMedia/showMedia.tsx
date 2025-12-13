import { forwardRef } from "react";
import "./showMedia.css";
import discord from "./icons/ds.avif";
import github from "./icons/github.avif";
import spotify from "./icons/sp.avif";
import steam from "./icons/steam.avif";
import instagram from "./icons/ig.avif";
import vrchat from "./icons/vr.ico";
import twitter from "./icons/x.avif";

export const ShowMedia = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="showMediaContainer show" ref={ref}>
      <div className="github-media-container">
        <a
          href="https://github.com/AikePetunia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="GitHub" />
        </a>
      </div>
      <div className="instagram-media-container">
        <a
          href="https://www.instagram.com/aike.milanesa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="Instagram" />
        </a>
      </div>
      <div className="discord-media-container">
        <a
          href="https://discord.com/users/433637449307127822"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discord} alt="Discord" />
        </a>
      </div>
      <div className="steam-media-container">
        <a
          href="https://steamcommunity.com/id/VenusAike/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={steam} alt="Steam" />
        </a>
      </div>
      <div className="vrchat-media-container">
        <a
          href="https://vrchat.com/home/user/usr_3f89d1bf-7727-439d-ba88-c8d0021ad5ec"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={vrchat} alt="VRChat" />
        </a>
      </div>
      <div className="spotify-media-container">
        <a
          href="https://open.spotify.com/user/31hxlonhyxenlnefnn54betpckye?si=a7520c8f25df4b61"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={spotify} alt="Spotify" />
        </a>
      </div>
      <div className="twitter-media-container">
        <a
          href="https://x.com/AikePetunia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="Twitter" />
        </a>
      </div>
    </div>
  );
});

export default ShowMedia;
