import "./App.css";
import RightColumn from "./rightColumn/RightColumn";
import LeftColumn from "./leftColumn/LeftColumn";
export function App() {
  return (
    <>
      <div className="parent-grid">
        <section className="left">
          <LeftColumn />
        </section>
        <section className="right">
          <RightColumn />
        </section>
      </div>
    </>
  );
}

export default App;

