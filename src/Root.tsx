import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { PhatDevIntro } from "./PhatDevIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PhatDevIntro"
        component={PhatDevIntro}
        durationInFrames={600} // 20 seconds * 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
