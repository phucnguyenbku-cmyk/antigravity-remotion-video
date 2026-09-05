import "./index.css";
import { Composition } from "remotion";
import { MyComposition, VideoProps } from "./Composition";
import { PhatDevIntro } from "./PhatDevIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Sản Xuất Video Hàng Loạt",
          subtitle: "Tự động hóa hoàn toàn với Antigravity & Remotion",
          badgeText: "AI AUTOMATION",
          bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          accentColor: "#818cf8",
        }}
      />
      <Composition
        id="PhatDevIntro"
        component={PhatDevIntro}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

