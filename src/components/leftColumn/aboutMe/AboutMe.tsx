import { useActivityRotator } from "../../../hooks/useActivityRotator.ts";
import { useMemo, useRef, useEffect } from "react";
import { Stack } from "./aboutMe/Stack.tsx";
import { Setup } from "./aboutMe/Setup.tsx";
import { WhoAmI } from "./aboutMe/WhoAmI.tsx";

import "../../../styles/leftColumn/aboutMe/aboutMe.css";

type aboutMeKind = "setup" | "stack" | "whoami";
type Pane = {
  kind: aboutMeKind;
  node: React.ReactNode;
  key: string;
  idx?: number;
};

export function AboutMe() {
  const panes: Pane[] = useMemo(() => {
    const list: Pane[] = [];
    list.push({
      kind: "setup",
      key: "about-me-setup",
      node: <Setup />,
      idx: 1,
    });
    list.push({
      kind: "stack",
      key: "about-me-stack",
      node: <Stack />,
      idx: 2,
    });
    list.push({
      kind: "whoami",
      key: "about-me-whoami",
      node: <WhoAmI />,
      idx: 3,
    });
    return list;
  }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleButtons = (direction: "left" | "right") => {
    let newIndex = 0;
    const currentIndex = panes.findIndex(
      (pane) =>
        pane.key ===
        containerRef.current
          ?.querySelector(".fade-stage > div")
          ?.getAttribute("data-key")
    );
    if (direction === "left") {
      newIndex = (currentIndex - 1 + panes.length) % panes.length;
    } else {
      newIndex = (currentIndex + 1) % panes.length;
    }
  };
  return (
    <>
      <div className="about-me-container" ref={containerRef}>
        <ActivityRotator panes={panes} containerRef={containerRef} />
        {/* the truth is that this arrows it's replicated per grid */}
        <div className="buttons-container">
          <div className="next-indicator"></div>
          <button className="left-button" onClick={() => handleButtons("left")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arrow left"
              width="24"
              height="24"
            >
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>{" "}
          </button>
          <button
            className="right-button"
            onClick={() => handleButtons("right")}
          >
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
      </div>
    </>
  );
}

function ActivityRotator({
  panes,
  containerRef,
}: {
  panes: Pane[];
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { currentPane, fading, transitionMs } = useActivityRotator({
    panes,
    showMs: 100000,
    fadeMs: 500,
  });

  useEffect(() => {
    const wrapper = containerRef.current?.closest(".about-me-grid");
    if (!wrapper) return;

    const isSetup = currentPane?.kind === "setup";
    wrapper.classList.toggle("setup-active", isSetup);

    return () => wrapper.classList.remove("setup-active");
  }, [currentPane?.kind]);
  return (
    <div
      className={`fade-stage ${
        fading === "out" ? "is-fading-out" : "is-fading-in"
      }`}
      style={{ transitionDuration: `${transitionMs}ms` }}
    >
      {currentPane?.node}
    </div>
  );
}

export default AboutMe;
