import "./App.css";
import RightColumn from "./rightColumn/RightColumn.tsx";
import LeftColumn from "./leftColumn/LeftColumn.tsx";
import Influence from "./influence/Influence.tsx";
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
      {/* <Influence /> */}
    </>
  );
}

export default App;

/*
hi aike ! 
https://vmfunc.re/
estaria bueno q agregues ese tipo de botones de communitys :eyes:
*/