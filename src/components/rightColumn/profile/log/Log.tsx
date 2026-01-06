import { useEffect, useState } from "react";
import logData from "./log.json";
import "./log.css";

interface LogEntry {
  date: string;
  message: string;
}

interface LogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Log({ isOpen, onClose }: LogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`log-overlay ${isAnimating ? "show" : ""}`}>
      <div className={`log-container ${isAnimating ? "show" : ""}`}>
        <button className="log-close-button" onClick={onClose}>
          <span>CLOSE !</span>
        </button>
        <div className="log-entries">
          {(logData as LogEntry[]).map((entry, index) => (
            <div className="log-message" key={index}>
              <h6>{entry.date}</h6>
              <p>{entry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
