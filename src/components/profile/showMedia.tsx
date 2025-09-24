import "../../styles/rightColumn/showMedia.css";
import discord from "../../assets/socialMedia/ds.jpg";
import github from "../../assets/socialMedia/github.svg";
import spotify from "../../assets/socialMedia/sp.png";
import steam from "../../assets/socialMedia/steam.png";
import vrchat from "../../assets/socialMedia/vr.ico";

export function ShowMedia() {
  /* 
    https://github.com/AikePetunia
    https://www.instagram.com/aike.milanesa/
    https://x.com/AikePetunia
    https://steamcommunity.com/id/VenusAike/ <- AikeMilanesa
    https://vrchat.com/home/user/usr_3f89d1bf-7727-439d-ba88-c8d0021ad5ec
    https://discord.com/users/433637449307127822
    https://open.spotify.com/user/31hxlonhyxenlnefnn54betpckye?si=a7520c8f25df4b61 

    */
  return (
    <div className="showMediaContainer">
      <div>
        <img src={github} alt="GitHub" />
      </div>
      <div></div>
      <div>
        <img src={discord} alt="Discord" />
      </div>
      <div>
        <img src={steam} alt="Steam" />
      </div>
      <div>
        <img src={vrchat} alt="VRChat" />
      </div>
      <div>
        <img src={spotify} alt="Spotify" />
      </div>
    </div>
  );
}

// export default ShowMedia;
