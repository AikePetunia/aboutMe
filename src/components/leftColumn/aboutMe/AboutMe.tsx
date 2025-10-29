import { Stack } from "./aboutMe/Stack.tsx";
import { Setup } from "./aboutMe/Setup.tsx";
import { WhoAmI } from "./aboutMe/WhoAmI.tsx";

import "../../../styles/leftColumn/aboutMe/aboutMe.css";

export function AboutMe() {
  const allowScrollWithoutPropogation = (e) => e.stopPropagation();
  return (
    <>
      <div className="about-me-container">
        <Setup />
        <Stack />
        <WhoAmI />
      </div>
      {/* the truth is that this arrows it's replicated per grid */}
      <div className="buttons-container">
        <div className="next-indicator"></div>
        <button className="left-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow left"
            width="24"
            height="24"
          >
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>{" "}
        </button>
        <button className="right-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow right"
            width="24"
            height="24"
          >
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>{" "}
        </button>
      </div>
    </>
  );
}

export default AboutMe;
