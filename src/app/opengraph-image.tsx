import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Modern Web Systems — Build Smarter. Grow Faster.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a0a00 50%, #0A0A0A 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "#FF6B00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            MW
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            MODERN WEB SYSTEMS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "72px", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Build Smarter.
          </span>
          <span style={{ fontSize: "72px", fontWeight: 800, color: "#FF6B00", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Grow Faster.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          AI-powered websites, regulated platforms, and luxury e-commerce — 16+ projects shipped across 8 industries.
        </div>

        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,107,0,0.3)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FF6B00", fontSize: "32px", fontWeight: 800 }}>16+</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Projects</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FF6B00", fontSize: "32px", fontWeight: 800 }}>8</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Industries</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FF6B00", fontSize: "32px", fontWeight: 800 }}>200+</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Pages Built</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
