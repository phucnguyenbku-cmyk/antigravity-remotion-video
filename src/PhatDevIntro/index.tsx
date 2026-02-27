import { Series } from "remotion";
import { IntroScene } from "./IntroScene";
import { SkillsScene } from "./SkillsScene";
import { TaglineScene } from "./TaglineScene";
import { ContactScene } from "./ContactScene";

export const PhatDevIntro: React.FC = () => {
    return (
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
    );
};
