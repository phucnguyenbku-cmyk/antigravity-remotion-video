import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const ContactScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const fadeDuration = Math.min(30, (durationInFrames - 0.1) / 2);
    const opacity = interpolate(
        frame,
        [0, fadeDuration, durationInFrames - fadeDuration, durationInFrames],
        [0, 1, 1, 0]
    );

    const scale = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a1628",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontFamily: "Inter, sans-serif",
                opacity,
            }}
        >
            <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
                <h1 style={{ fontSize: "100px", fontWeight: 800, marginBottom: "40px" }}>
                    Let's connect!
                </h1>

                <div style={{ display: "flex", justifyContent: "center", gap: "60px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <div style={{ width: "60px", height: "60px", background: "white", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {/* Simplified GitHub Icon placeholder */}
                            <div style={{ width: "30px", height: "30px", background: "#0a1628", borderRadius: "50%" }} />
                        </div>
                        <span style={{ fontSize: "30px", fontWeight: 500 }}>GitHub</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <div style={{ width: "60px", height: "60px", background: "#0077b5", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <span style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>in</span>
                        </div>
                        <span style={{ fontSize: "30px", fontWeight: 500 }}>LinkedIn</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
