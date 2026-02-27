import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import React from "react";

const SkillBadge: React.FC<{ text: string; index: number }> = ({ text, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const delay = index * 10;
    const opacity = spring({
        frame: frame - delay,
        fps,
        config: { damping: 20 },
    });

    const translateY = interpolate(opacity, [0, 1], [20, 0]);

    return (
        <div
            style={{
                padding: "12px 24px",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                border: "2px solid #3b82f6",
                borderRadius: "12px",
                color: "white",
                fontSize: "24px",
                fontWeight: "600",
                opacity,
                transform: `translateY(${translateY}px)`,
            }}
        >
            {text}
        </div>
    );
};

export const SkillsScene: React.FC = () => {
    const frame = useCurrentFrame();

    const role = "PHP Developer";
    const company = "@ Scuti";
    const skills = ["PHP", "Laravel", "MySQL", "REST API", "Docker", "Git"];

    const roleProgress = Math.floor(interpolate(frame, [0, 30], [0, role.length], {
        extrapolateRight: "clamp",
    }));
    const companyProgress = Math.floor(interpolate(frame, [35, 65], [0, company.length], {
        extrapolateRight: "clamp",
    }));

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a1628",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "0 100px",
                }}
            >
                <div>
                    <h2
                        style={{
                            color: "#3b82f6",
                            fontSize: "40px",
                            textTransform: "uppercase",
                            letterSpacing: "4px",
                            marginBottom: "10px",
                            minHeight: "1.2em",
                        }}
                    >
                        {role.slice(0, roleProgress)}
                    </h2>
                    <h1
                        style={{
                            color: "white",
                            fontSize: "100px",
                            margin: 0,
                            fontWeight: 800,
                            minHeight: "1.2em",
                        }}
                    >
                        {company.slice(0, companyProgress)}
                    </h1>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "60px",
                    }}
                >
                    {skills.map((skill, i) => (
                        <SkillBadge key={skill} text={skill} index={i} />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
