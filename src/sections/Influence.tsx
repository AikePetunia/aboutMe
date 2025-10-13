import "../styles/influence.css";
import { PeopleCard } from "../components/PeopleCard.tsx";
export function Influence() {
  return (
    <>
      <h1> my loved ones </h1>
      <div className="lovedPeople-container">
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
      </div>
    </>
  );
}

export default Influence;
