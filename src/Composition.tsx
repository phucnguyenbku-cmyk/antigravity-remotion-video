import React from "react";
import { Caption, parseSrt } from "@remotion/captions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type VideoProps = {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  bgGradient?: string;
  accentColor?: string;
  voiceFile?: string;
  captionFile?: string;
  captions?: Caption[];
};

// Stretch the composition to fit the voiceover, plus one second of tail, and
// load the subtitles up front so the component can render them synchronously.
export const calculateMetadata: CalculateMetadataFunction<VideoProps> = async ({ props }) => {
  const captions = props.captionFile
    ? parseSrt({ input: await (await fetch(staticFile(props.captionFile))).text() })
        .captions
    : undefined;

  if (!props.voiceFile) {
    return { props: { ...props, captions } };
  }

  const seconds = await getAudioDurationInSeconds(staticFile(props.voiceFile));
  return {
    durationInFrames: Math.ceil(seconds * 30) + 30,
    props: { ...props, captions },
  };
};

export const MyComposition: React.FC<VideoProps> = ({
  title = "Sản Xuất Video Hàng Loạt",
  subtitle = "Tự động hóa hoàn toàn với Antigravity & Remotion",
  badgeText = "AI VIDEO GENERATOR",
  bgGradient = "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  accentColor = "#818cf8",
  voiceFile,
  captions,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Spread the entrance over the clip so a long voiceover is not left with a
  // static frame after the first second.
  const stagger = durationInFrames / 12;

  // Entrance spring animations
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const titleProgress = spring({
    frame: frame - stagger,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [stagger, stagger + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleProgress = spring({
    frame: frame - stagger * 2,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const subtitleOpacity = interpolate(
    frame,
    [stagger * 2, stagger * 2 + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // One full turn, a slow push-in and a fade-out, all keyed to the clip length.
  const decorRotation = interpolate(frame, [0, durationInFrames], [0, 360]);

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.05]);

  // The last cue that has started wins, so overlapping timestamps never stack.
  const timeMs = (frame / fps) * 1000;
  const shown =
    captions?.filter(
      (caption) => timeMs >= caption.startMs && timeMs <= caption.endMs,
    ) ?? [];
  const activeCaption = shown[shown.length - 1];

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

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
        transform: `scale(${zoom})`,
        opacity: exitOpacity,
      }}
    >
      {voiceFile ? <Audio src={staticFile(voiceFile)} /> : null}
      <Audio src={staticFile("bgm.mp3")} volume={0.15} />

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

      {/* Burned-in subtitle */}
      {activeCaption ? (
        <div
          style={{
            position: "absolute",
            bottom: "160px",
            maxWidth: "880px",
            padding: "18px 32px",
            borderRadius: "16px",
            backgroundColor: "rgba(2, 6, 23, 0.72)",
            border: `1px solid ${accentColor}40`,
            color: "#f8fafc",
            fontSize: "34px",
            fontWeight: 600,
            lineHeight: 1.4,
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {activeCaption.text}
        </div>
      ) : null}

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

