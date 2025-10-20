import "../styles/influence.css";
import { PeopleCard } from "../components/PeopleCard.tsx";
export function Influence() {
  return (
    <>
      <h1 className="loved-people">my loved ones &lt;3</h1>
      <div className="lovedPeople-container">
        <PeopleCard />
      </div>
    </>
  );
}

export default Influence;
