import "./styles/App.css";
import RightColumn from "./sections/RightColumn.tsx";
import LeftColumn from "./sections/LeftColumn.tsx";
import Influence from "./sections/Influence.tsx";
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
      <Influence />
    </>
  );
}

export default App;
