import "../styles/rightColumn/countdown.css";

export function Countdown({ icon, count }: CountdownProps) {
  // js date is weird
  // gets de % of the year passed since last birthday
  const now = new Date();
  const lastBirthday = new Date(now.getFullYear(), 1, 21);
  const nextBirthday = new Date(now.getFullYear() + 1, 1, 21);
  const fraction =
    (now.getTime() - lastBirthday.getTime()) /
    (nextBirthday.getTime() - lastBirthday.getTime());

  let age = now.getFullYear() - new Date(2006, 1, 21).getFullYear();

  let totalTimeAlive = (age + fraction).toFixed(7);
  let timeSplitting = String(totalTimeAlive).split("");

  timeSplitting.map((digit) => console.log(digit));
  console.log(timeSplitting);

  /// visit counter
  const API_KEY = process.env.REACT_APP_API_KEY;
  const slug = "aike";
  const BASE_URL = "https://api.counterapi.dev/v2";

  /*
  curl -X GET https://api.counterapi.dev/v2/aike/aike/up \
  -H "Authorization: Bearer API_KEY" // increase counter

  curl -X GET https://api.counterapi.dev/v2/aike/aike/down \
  -H "Authorization: Bearer API_KEY" // decrease counter
  */
  console.log("API_KEY:", API_KEY);
  return (
    <div className="countdown-container">
      {" "}
      <img className="cd-icon" src={icon} alt="icono countdown" />{" "}
      <div className="cd-numbers">
        {timeSplitting.map((digit, index) => (
          <span key={index} className="cd-numbers">
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Countdown;
