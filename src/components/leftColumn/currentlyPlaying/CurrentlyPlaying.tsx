import { fetchSteam } from "../../../hooks/useSteam";

export function CurrentlyPlaying() {
  fetchSteam().then((data) => {
    console.log(data);
  });
  return (
    <>
      {" "}
      <p>
        {" "}
        que estoy jugando actualmete, y si no, mis juegos recientes? fav? !!ç
      </p>
    </>
  );
}

export default CurrentlyPlaying;
