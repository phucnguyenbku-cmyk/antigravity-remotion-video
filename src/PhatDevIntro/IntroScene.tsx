import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import React from "react";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Avatar fade-in + subtle glow
  const avatarOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  const avatarScale = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  // Typewriter effect for name
  const name = "Ly Tan Phat";
  const nameProgress = Math.floor(interpolate(frame, [45, 90], [0, name.length], {
    extrapolateRight: "clamp",
  }));
  const displayName = name.slice(0, nameProgress);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a1628",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <div
          style={{
            opacity: avatarOpacity,
            transform: `scale(${avatarScale})`,
            boxShadow: `0 0 50px rgba(59, 130, 246, ${avatarOpacity * 0.5})`,
            borderRadius: "50%",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            margin: 0,
            color: "#ffffff",
            minHeight: "1.2em",
          }}
        >
          {displayName}
          {frame % 15 < 8 && <span style={{ opacity: 0.7 }}>|</span>}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
