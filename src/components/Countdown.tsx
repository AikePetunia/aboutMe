import "../styles/countdown.css";
interface CountdownProps {
  icon: string;
  count?: string | number;
}
export function Countdown({ icon, count }: CountdownProps) {
  return (
    <div className="countdown-container">
      {" "}
      <img className="cd-icon" src={icon} alt="icono countdown" />{" "}
      <div className="cd-numbers">
        {" "}
        <span className="cd-numbers">{count || "696969"}</span>{" "}
        <span className="cd-numbers">{count || "696969"}</span>{" "}
        <span className="cd-numbers">{count || "696969"}</span>{" "}
        <span className="cd-numbers">{count || "696969"}</span>{" "}
        <span className="cd-numbers">{count || "696969"}</span>{" "}
      </div>{" "}
    </div>
  );
}

export default Countdown;
