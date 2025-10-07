import "../styles/rightColumn/countdown.css";
interface CountdownProps {
  icon: string;
  count?: string | number;
}
export function Countdown({ icon, count }: CountdownProps) {
  // gets de % of the year passed since last birthday
  const now = new Date();

  const lastBirthday = new Date(now.getFullYear(), 1, 21);
  const nextBirthday = new Date(now.getFullYear() + 1, 1, 21);

  const fraction =
    (now.getTime() - lastBirthday.getTime()) /
    (nextBirthday.getTime() - lastBirthday.getTime());

  console.log("%", fraction * 100);
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
