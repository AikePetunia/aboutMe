import { ReactNode, useEffect, useRef, useState } from "react";

export type Pane = {
  key: string;
  node: ReactNode;
};

export function useRotator({
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
  const [internalIdx, setInternalIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  const activeSetIdx: React.Dispatch<React.SetStateAction<number>> =
    setIdx ?? setInternalIdx;
  const joinedPaneKeys = panes.map((p) => p.key).join("|");

  // reset
  useEffect(() => {
    activeSetIdx(0);
    setFading("in");
  }, [joinedPaneKeys, activeSetIdx]);

  const effectiveIdx = typeof idx === "number" ? idx : internalIdx;
  const safeIdx =
    panes.length === 0
      ? 0
      : Math.max(0, Math.min(effectiveIdx, panes.length - 1));
  const current = panes[safeIdx];

  useEffect(() => {
    // only use one there is more than one pane
    if (panes.length <= 1) return;

    const startVisiblePhase = () => {
      timerRef.current = window.setTimeout(() => {
        setFading("out");
        timerRef.current = window.setTimeout(() => {
          activeSetIdx((i) => (i + 1) % panes.length);
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
  }, [panes.length, showMs, fadeMs, activeSetIdx]);

  return {
    currentPane: current,
    fading,
    setIdx: activeSetIdx,
    idx: safeIdx,
    transitionMs: fadeMs,
  };
}
