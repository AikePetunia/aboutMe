import meImage from "../assets/me.webp";
import bdIcon from "../assets/bdIcon.gif";
import eye from "../assets/eye.gif";
import "../styles/profile.css";
import { Countdown } from "./Countdown";
import DiscordActivity from "./DiscordActivity";
export function Profile() {
  return (
    <div>
      <h1 className="ascii-name"> Aike </h1>
      <p>
        She/Her/Ella
        <br></br>
        <a href="https://nikableh.moe/"> 🏳️‍⚧️ </a>
        <br></br>
        ESP/ENG
      </p>
      <h3> Visitors </h3>
      <Countdown icon={eye} count={1} />

      <img src={meImage} className="profile-photo" alt="test"></img>
      <h3>Time Alive</h3>
      <Countdown icon={bdIcon} count={2} />
      <DiscordActivity />
    </div>
  );
}

export default Profile;
