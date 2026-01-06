import "./App.css";
import RightColumn from "./rightColumn/RightColumn.tsx";
import LeftColumn from "./leftColumn/LeftColumn.tsx";
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

