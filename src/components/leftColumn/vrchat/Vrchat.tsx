import "./vrchat.css";
import vr1 from "./pics/vr1.png";
import vr2 from "./pics/vr2.png";
import vr3 from "./pics/vr3.png";
import vr4 from "./pics/vr4.png";
import vr5 from "./pics/vr5.png";
import vr6 from "./pics/vr6.png";
import vr7 from "./pics/vr7.png";
import vr8 from "./pics/vr8.png";

import { useRotator } from "../../../hooks/useRotator";
import { useMemo, useRef, useState } from "react";
import "./vrchat.css";
type Pane = {
  key: string;
  node: React.ReactNode;
};
export function Vrchat() {
  const [newIndex, setNewIndex] = useState<number>(0);

  const panes: Pane[] = useMemo(() => {
    const list: Pane[] = [];
    list.push({
      key: "vr1",
      node: <img className="vr-pic" src={vr7} alt="#"></img>,
    });
    list.push({
      key: "vr2",
      node: <img className="vr-pic" src={vr2} alt="#"></img>,
    });
    list.push({
      key: "vr3",
      node: <img className="vr-pic" src={vr3} alt="#"></img>,
    });
    list.push({
      key: "vr4",
      node: <img className="vr-pic" src={vr4} alt="#"></img>,
    });
    list.push({
      key: "vr5",
      node: <img className="vr-pic" src={vr5} alt="#"></img>,
    });
    list.push({
      key: "vr5",
      node: <img className="vr-pic" src={vr5} alt="#"></img>,
    });
    list.push({
      key: "vr6",
      node: <img className="vr-pic" src={vr6} alt="#"></img>,
    });
    list.push({
      key: "vr7",
      node: <img className="vr-pic" src={vr1} alt="#"></img>,
    });

    return list;
  }, []);

  const handleButtons = (direction: "left" | "right") => {
    setNewIndex((prev) => {
      if (direction === "left") {
        return (prev - 1 + panes.length) % panes.length;
      }
      return (prev + 1) % panes.length;
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Rotator panes={panes} idx={newIndex} setIdx={setNewIndex} />
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
        <button className="right-button" onClick={() => handleButtons("right")}>
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

function Rotator({
  panes,
  idx,
  setIdx,
}: {
  panes: Pane[];
  idx?: number;
  setIdx?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { currentPane, fading, transitionMs } = useRotator({
    panes,
    idx,
    setIdx,
    showMs: 5000,
    fadeMs: 500,
  });

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
export default Vrchat;
