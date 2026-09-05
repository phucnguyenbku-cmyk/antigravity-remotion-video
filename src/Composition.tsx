import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface VideoProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  bgGradient?: string;
  accentColor?: string;
}

export const MyComposition: React.FC<VideoProps> = ({
  title = "Sản Xuất Video Hàng Loạt",
  subtitle = "Tự động hóa hoàn toàn với Antigravity & Remotion",
  badgeText = "AI VIDEO GENERATOR",
  bgGradient = "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  accentColor = "#818cf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const decorRotation = interpolate(frame, [0, 180], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Dynamic background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}44 0%, transparent 70%)`,
          filter: "blur(80px)",
          transform: `scale(${1 + 0.1 * Math.sin(frame / 15)})`,
          pointerEvents: "none",
        }}
      />

      {/* Rotating decorative ring */}
      <div
        style={{
          position: "absolute",
          width: "750px",
          height: "750px",
          borderRadius: "50%",
          border: `2px dashed ${accentColor}33`,
          transform: `rotate(${decorRotation}deg)`,
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          transform: `scale(${badgeScale})`,
          opacity: badgeScale,
          backgroundColor: `${accentColor}25`,
          border: `1px solid ${accentColor}80`,
          borderRadius: "9999px",
          padding: "10px 24px",
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: "32px",
          boxShadow: `0 0 20px ${accentColor}40`,
        }}
      >
        {badgeText}
      </div>

      {/* Main Title */}
      <h1
        style={{
          transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
          opacity: titleOpacity,
          fontSize: "64px",
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.2,
          margin: "0 0 24px 0",
          maxWidth: "900px",
          background: "linear-gradient(to right, #ffffff, #e2e8f0, #cbd5e1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [30, 0])}px)`,
          opacity: subtitleOpacity,
          fontSize: "32px",
          fontWeight: 400,
          color: "#94a3b8",
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: "800px",
          margin: 0,
        }}
      >
        {subtitle}
      </p>

      {/* Footer bar */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#64748b",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        <span style={{ color: accentColor }}>✦</span>
        <span>Rendered with Google Antigravity & Remotion</span>
        <span style={{ color: accentColor }}>✦</span>
      </div>
    </AbsoluteFill>
  );
};

