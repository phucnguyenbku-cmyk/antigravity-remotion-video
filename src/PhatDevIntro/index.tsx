import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { IntroScene } from "./IntroScene";
import { SkillsScene } from "./SkillsScene";
import { TaglineScene } from "./TaglineScene";
import { ContactScene } from "./ContactScene";

export const PhatDevIntro: React.FC = () => {
    return (
        <AbsoluteFill>
            <Audio src={staticFile("bgm.mp3")} volume={0.3} />
            <Series>
                <Series.Sequence durationInFrames={150}>
                    <IntroScene />
                </Series.Sequence>
                <Series.Sequence durationInFrames={210}>
                    <SkillsScene />
                </Series.Sequence>
                <Series.Sequence durationInFrames={180}>
                    <TaglineScene />
                </Series.Sequence>
                <Series.Sequence durationInFrames={60}>
                    <ContactScene />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
