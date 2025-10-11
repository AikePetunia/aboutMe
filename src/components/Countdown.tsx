import { useEffect, useRef } from "react";
import "../styles/rightColumn/countdown.css";

export function Countdown({ icon, count }: { icon: string; count: string }) {
  const prevCountRef = useRef<string>("");

  useEffect(() => {
    const currentDigits = String(count).split("");
    const prevDigits = prevCountRef.current.split("");

    currentDigits.forEach((digit, index) => {
      if (prevDigits[index] !== digit) {
        const digitElement = document.querySelector(
          `.cd-numbers span:nth-child(${index + 1})`
        ) as HTMLElement;

        if (digitElement) {
          digitElement.classList.add("digit-changing");
          digitElement.innerText = digit;

          setTimeout(() => {
            digitElement.classList.remove("digit-changing");
          }, 200);
        }
      }
    });

    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="countdown-container">
      <img className="cd-icon" src={icon} alt="icono countdown" />
      <div className="cd-numbers">
        {String(count)
          .split("")
          .map((digit, index) => (
            <span key={index} className="cd-digit">
              {digit}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Countdown;
