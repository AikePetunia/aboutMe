import "./letterBox.css";

export function LetterBox() {
  return (
    <>
      <p>
        Wanna say me something? And u are{" "}
        <span className="letterbox-accent">too shy?</span>
      </p>

      <a
        href="https://ngl.link/aike.milanesa18314"
        target="_blank"
        rel="noreferrer"
      >
        <button className="letterbox-button">Ask me anything anon</button>
      </a>

      <p>No ur not? Add me to discord:</p>
      <span className="letterbox-accent">
        <a href="https://discord.com/users/433637449307127822">venus.s.s</a>
      </span>
    </>
  );
}

export default LetterBox;
