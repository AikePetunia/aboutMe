import { useState, useEffect } from "react";
import imageSrc from "../stack.png";
import React from "react";
export function Stack() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  // fix: desaparecer la imagen al mover el ratón fuera del área
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCoords({ x: event.clientX, y: event.clientY });
      setIsVisible();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <img
          src={imageSrc}
          alt="archbtw"
          style={{
            position: "absolute",
            top: coords.y + 1,
            left: coords.x + 1,
            pointerEvents: "none",
            width: "350px",
            height: "225px",
            borderRadius: "8px",
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
      <h3>My Stack</h3>
      <p
        style={{ fontSize: "12px" }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        arch btw
      </p>

      <div className="stack-section">
        <h4>Skills</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=html,css,bootstrap,javascript,react"
            alt="Skills"
          />
          <img
            src="https://developer.playcanvas.com/img/playcanvas.png"
            alt="PlayCanvas"
            width="48"
            height="48"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bsC17sEuS2OqQ2NmsHDxP8jB3E8BGHjH6A&s"
            alt="Hostinger"
            width="48"
            height="48"
          />
          <img
            src="https://skillicons.dev/icons?i=haskell,c,python,nodejs"
            alt="Skills"
          />
        </div>
      </div>

      <div className="stack-section">
        <h4>Frameworks & Other stuff</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=git,github,obsidian,debian,vscode,pycharm,sklearn"
            alt="Frameworks"
          />
          <img
            src="https://ms-playwright.gallerycdn.vsassets.io/extensions/ms-playwright/playwright/1.1.15/1749049892255/Microsoft.VisualStudio.Services.Icons.Default"
            alt="Playwright"
            width="48"
            height="48"
          />
          <img
            src="https://avatars.githubusercontent.com/u/5192682?s=280&v=4"
            alt="Xournalpp"
            width="48"
            height="48"
          />
          <img
            src="https://skillicons.dev/icons?i=md,linux,instagram,gmail,discord,twitter"
            alt="Social"
          />
        </div>
      </div>

      <div className="stack-section">
        <h4>Skills I want to learn</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=figma,vue,postgres,java,maven,spring,sass,"
            alt="Future skills"
          />
          <img
            src="
          https://skillicons.dev/icons?i=jenkins,aws,cloudflare,docker,unity,ts

"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Stack;
