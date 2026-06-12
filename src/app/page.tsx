import { WelcomeExperience } from "@/components/welcome/WelcomeExperience";
import { WindowIntro } from "@/components/motion/WindowIntro";

export default function Home() {
  return (
    <>
      <WindowIntro />
      <WelcomeExperience />
    </>
  );
}
