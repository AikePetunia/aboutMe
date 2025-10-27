import { Stack } from "./aboutMe/Stack.tsx";
import { Setup } from "./aboutMe/Setup.tsx";
import { WhoAmI } from "./aboutMe/WhoAmI.tsx";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";

import "../../../styles/leftColumn/aboutMe/aboutMe.css";

export function AboutMe() {
  return (
    <>
      <div className="about-me-container">
        {/* <Setup /> */}
        {/* <Stack /> */}
        <WhoAmI />
      </div>
      {/* the truth is that this arrows it's replicated per grid */}
      <div className="carrousel-indicator"></div>
      <div className="buttons-container">
        <button className="left-button">
          <svg></svg>
        </button>
        <button className="right-button">
          <svg></svg>
        </button>
      </div>
    </>
  );
}

export default AboutMe;
