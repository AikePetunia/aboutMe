import peak from "./peak.jpeg";
export function WhoAmI() {
  return (
    <>
      <h3>Who am I ?!?!</h3>
      <p className="my-pronouns">
        She/Her/Ella
        <a>🏳️‍⚧️</a>
        ESP/ENG
      </p>
      <br></br>
      <p>
        {" "}
        Aike --or Victoria, ©2006-- is a human. My first interaction with a
        computer and internet was at 4 years old. I started experimenting with
        programming stuff at 12 years old. Nowadays I'm studying Computer
        Science at
        <a
          href="https://github.com/AikePetunia/Famaf"
          style={{ color: "gray", margin: "0 4px" }}
          target="_blank"
          rel="noreferrer"
        >
          FAMAF
        </a>
        and working at
        <a
          href="https://inverte.com/"
          style={{ color: "green", margin: "0 2px" }}
          target="_blank"
          rel="noreferrer"
        >
          Inverte
        </a>{" "}
        as a front-end/WebGL developer, and dabbling in data analysis
      </p>
      <br></br>
      <p>Happy to say I am living, not surviving.</p>
      <img
        src={peak}
        width="200px"
        height="200px"
        style={{ display: "block", margin: "20px auto" }}
        alt="Im at my peak"
      />
    </>
  );
}

export default WhoAmI;
