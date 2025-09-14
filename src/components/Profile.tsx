import meImage from "../assets/me.webp";
import "../styles/profile.css";
import { Countdown } from "./Countdown";
export function Profile() {
  // name: https://patorjk.com/software/taag/
  return (
    <div>
      {/* prettier-ignore */}
      {/* 
      <pre className="ascii-name">
         ▄▄▄       ██▓ ██ ▄█▀▓█████ 
        ▒████▄    ▓██▒ ██▄█▒ ▓█   ▀ 
        ▒██  ▀█▄  ▒██▒▓███▄░ ▒███   
        ░██▄▄▄▄██ ░██░▓██ █▄ ▒▓█  ▄ 
        ▓█   ▓██▒░██░▒██▒ █▄░▒████▒
        ▒▒   ▓▒█░░▓  ▒ ▒▒ ▓▒░░ ▒░ ░
          ▒   ▒▒ ░ ▒ ░░ ░▒ ▒░ ░ ░  ░
          ░   ▒    ▒ ░░ ░░ ░    ░   
              ░  ░ ░  ░  ░      ░  ░
      </pre>
      {/* prettier-ignore */}
      {/*
      <h1 className="ascii-name">
      ▄▄▄· ▪  ▄ •▄ ▄▄▄ .
      ▐█ ▀█ ██ █▌▄▌▪▀▄.▀·
      ▄█▀▀█ ▐█·▐▀▀▄·▐▀▀▪▄
      ▐█ ▪▐▌▐█▌▐█.█▌▐█▄▄▌
      ▀  ▀ ▀▀▀·▀  ▀ ▀▀▀ 
      </h1>
      */}
      <h1 className="ascii-name"> Aike </h1>

      <Countdown icon={} number={} />
      <img src={meImage} className="profile-photo" alt="test"></img>
    </div>
  );
}

export default Profile;
