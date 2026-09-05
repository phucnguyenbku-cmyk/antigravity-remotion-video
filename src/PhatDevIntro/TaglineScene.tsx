import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import React, { useMemo } from "react";

const CodeRain: React.FC = () => {
    const { width } = useVideoConfig();
    const columns = useMemo(() => Math.floor(width / 30), [width]);

    return (
        <AbsoluteFill style={{ overflow: "hidden", opacity: 0.15 }}>
            {Array.from({ length: columns }).map((_, i) => (
                <CodeColumn key={i} x={i * 30} />
            ))}
        </AbsoluteFill>
    );
};

const CodeColumn: React.FC<{ x: number }> = ({ x }) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();
    const speed = useMemo(() => 5 + random(`speed-${x}`) * 10, [x]);
    const offset = useMemo(() => random(`offset-${x}`) * height, [height, x]);

    const y = (frame * speed + offset) % (height + 200) - 100;

    const scrambled = useMemo(
        () =>
            "<?php echo 'Building scalable web solutions'; ?>"
                .split("")
                .map((char, i) => ({ char, order: random(`char-${x}-${i}`) }))
                .sort((a, b) => a.order - b.order)
                .map(({ char }) => char)
                .join(""),
        [x],
    );

    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                color: "#3b82f6",
                fontFamily: "monospace",
                fontSize: "14px",
                writingMode: "vertical-rl",
                textOrientation: "upright",
                whiteSpace: "nowrap",
            }}
        >
            {scrambled}
        </div>
    );
};

export const TaglineScene: React.FC = () => {
    const frame = useCurrentFrame();

    const tagline = "Building scalable web solutions with PHP, Laravel & modern tech";
    const typewriterProgress = Math.floor(interpolate(frame, [0, 90], [0, tagline.length], {
        extrapolateRight: "clamp",
    }));
    const displayedTagline = tagline.slice(0, typewriterProgress);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#0a1628",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <CodeRain />

            <div
                style={{
                    textAlign: "center",
                    maxWidth: "1200px",
                    zIndex: 1,
                }}
            >
                <h2
                    style={{
                        color: "white",
                        fontSize: "70px",
                        lineHeight: "1.3",
                        fontWeight: 700,
                        padding: "0 60px",
                        minHeight: "2.6em", // Maintain height
                    }}
                >
                    {displayedTagline}
                    {frame % 15 < 8 && typewriterProgress < tagline.length && (
                        <span style={{ color: "#3b82f6" }}>|</span>
                    )}
                </h2>

                <div
                    style={{
                        marginTop: "40px",
                        height: "4px",
                        width: "200px",
                        background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                        margin: "40px auto"
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
