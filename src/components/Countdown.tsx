export function Countdown(icon, count) {
  return (
    <div>
      <img src={icon} alt="icono countdown" />
      <span>{count || "696969"}</span>
    </div>
  );
}

export default Countdown;
