import { ReactNode, useEffect, useRef, useState } from "react";

export type Pane = {
  key: string;
  node: ReactNode;
};

export function useActivityRotator({
  panes,
  idx,
  setIdx,
  showMs = 20000, // visible time
  fadeMs = 500, // fade duration
}: {
  panes: Pane[];
  idx?: number;
  setIdx?: React.Dispatch<React.SetStateAction<number>>;
  showMs?: number;
  fadeMs?: number;
}) {
  const [fading, setFading] = useState<"in" | "out">("in");
  const timerRef = useRef<number | null>(null);

  // reset
  useEffect(() => {
    setIdx?.(0);
    setFading("in");
  }, [panes.map((p) => p.key).join("|")]);

  const effectiveIdx = typeof idx === "number" ? idx : 0;
  const safeIdx = Math.min(effectiveIdx, panes.length);
  const current = panes[safeIdx] || panes[0];

  useEffect(() => {
    // only use one there is more than one pane
    if (panes.length <= 1) return;

    const startVisiblePhase = () => {
      timerRef.current = window.setTimeout(() => {
        setFading("out");
        timerRef.current = window.setTimeout(() => {
          setIdx((i) => (i + 1) % panes.length);
          setFading("in");
          startVisiblePhase();
        }, fadeMs);
      }, showMs);
    };

    startVisiblePhase();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [panes.length, showMs, fadeMs]);

  return {
    currentPane: current,
    fading,
    setIdx,
    idx: safeIdx,
    transitionMs: fadeMs,
  };
}
