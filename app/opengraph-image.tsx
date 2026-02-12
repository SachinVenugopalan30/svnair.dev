import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Sachin Nair — Developer & Photographer";
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
          alignItems: "center",
          background: "#0a0a0b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow behind content */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "70%",
            height: "80%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(196,80,58,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-10%",
            width: "60%",
            height: "80%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(20,20,22,0.5) 0%, transparent 70%)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            position: "relative",
          }}
        >
          {/* Accent line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#c4503a",
              marginBottom: "40px",
            }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#e8e4e0",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Sachin Nair
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#8a8a8d",
              marginTop: "16px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Developer · Data Scientist · Photographer
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "20px",
              color: "#c4503a",
              marginTop: "40px",
              letterSpacing: "2px",
            }}
          >
            svnair.dev
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #c4503a, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
