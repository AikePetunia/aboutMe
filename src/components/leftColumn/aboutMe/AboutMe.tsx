import { useRotator } from "../../../hooks/useRotator.ts";
import { useMemo, useRef, useEffect, useState } from "react";
import { Stack } from "./Stack.tsx";
import { Setup } from "./Setup.tsx";
import { WhoAmI } from "./WhoAmI.tsx";

import "./aboutMe.css";

type aboutMeKind = "setup" | "stack" | "whoami";
type Pane = {
  kind: aboutMeKind;
  node: React.ReactNode;
  key: string;
  idx?: number;
  setIdx?: React.Dispatch<React.SetStateAction<number>>;
};

export function AboutMe() {
  const [newIndex, setNewIndex] = useState<number>(0);
  const panes: Pane[] = useMemo(() => {
    const list: Pane[] = [];
    list.push({
      kind: "setup",
      key: "about-me-setup",
      node: <Setup />,
    });
    list.push({
      kind: "stack",
      key: "about-me-stack",
      node: <Stack />,
    });
    list.push({
      kind: "whoami",
      key: "about-me-whoami",
      node: <WhoAmI />,
    });
    return list;
  }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleButtons = (direction: "left" | "right") => {
    setNewIndex((prev) => {
      if (direction === "left") {
        return (prev - 1 + panes.length) % panes.length;
      }
      return (prev + 1) % panes.length;
    });
  };

  return (
    <>
      <div className="about-me-container" ref={containerRef}>
        {/* arrows are replicated per grid */}
        <Rotator
          panes={panes}
          idx={newIndex}
          setIdx={setNewIndex}
          containerRef={containerRef}
        />
        <div className="buttons-container">
          {/* <div className="next-indicator"></div> */}
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

function Rotator({
  panes,
  containerRef,
  idx,
  setIdx,
}: {
  panes: Pane[];
  containerRef: React.RefObject<HTMLDivElement>;
  idx?: number;
  setIdx?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { currentPane, fading, transitionMs } = useRotator({
    panes,
    idx,
    setIdx,
    showMs: 20000,
    fadeMs: 500,
  });

  // diff images based on current pane
  useEffect(() => {
    const wrapper = containerRef.current?.closest(".about-me-grid");
    if (!wrapper) return;

    const isSetup = currentPane?.kind === "setup";
    wrapper.classList.toggle("setup-active", isSetup);

    const isStack = currentPane?.kind === "stack";
    wrapper.classList.toggle("stack-active", isStack);

    return () => {
      wrapper.classList.remove("setup-active");
      wrapper.classList.remove("stack-active");
    };
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
