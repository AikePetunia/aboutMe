import meImage from "../assets/me.webp";
import bdIcon from "../assets/bdIcon.gif";
import eye from "../assets/eye.gif";
import "../styles/rightColumn/profile.css";
import { Countdown } from "./Countdown";
import DiscordActivity from "./DiscordActivity";
import { ShowMedia } from "./profile/showMedia";

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
      <div className="photo-media-container">
        <div className="profile-photo">
          <img src={meImage} alt="test" />
          <div className="spider-body">
            <div className="spider-leg1"> </div>
            <div className="spider-leg2"> </div>
            <div className="spider-leg3"> </div>
            <div className="spider-leg4"> </div>
            <div className="spider-head"> </div>
            <div className="spider-leg5"> </div>
            <div className="spider-leg6"> </div>
            <div className="spider-leg7"> </div>
            <div className="spider-leg8"> </div>
          </div>
        </div>
        <ShowMedia />
      </div>
      <h3>Time Alive</h3>
      <Countdown icon={bdIcon} count={2} />
      <DiscordActivity />
    </div>
  );
}

export default Profile;
