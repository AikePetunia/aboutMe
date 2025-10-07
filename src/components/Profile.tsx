import meImage from "../assets/me.webp";
import bdIcon from "../assets/bdIcon.gif";
import eye from "../assets/eye.gif";
import "../styles/rightColumn/profile.css";
import { Countdown } from "./Countdown";
import DiscordActivity from "./DiscordActivity";
import { ShowMedia } from "./profile/showMedia";
import { useEffect, useState, useRef } from "react";

export function Profile() {
  const [isShown, setIsShown] = useState(false);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mediaContainerRef.current) {
      if (isShown) {
        mediaContainerRef.current.style.display = "block";
        void mediaContainerRef.current.offsetHeight;
        mediaContainerRef.current.classList.add("show");
      } else {
        mediaContainerRef.current.classList.remove("show");
        setTimeout(() => {
          if (mediaContainerRef.current && !isShown) {
            mediaContainerRef.current.classList.add("hide");
          }
        }, 200);
      }
    }
  }, [isShown]);

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
        <div className="profile-photo" onClick={() => setIsShown(!isShown)}>
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
        <ShowMedia ref={mediaContainerRef} />
      </div>
      <h3>Time Alive</h3>
      <Countdown icon={bdIcon} count={2} />
      <DiscordActivity />
    </div>
  );
}

export default Profile;
