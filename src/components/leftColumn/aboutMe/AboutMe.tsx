import { Stack } from "./aboutMe/Stack.tsx";
import { Setup } from "./aboutMe/Setup.tsx";
import { WhoAmI } from "./aboutMe/WhoAmI.tsx";

export function AboutMe() {
  return (
    <>
      {/*
      <Setup />
       */}
      <Stack />
      <WhoAmI />
      <p>Setup !! + stack + who am i</p>
    </>
  );
}

export default AboutMe;
