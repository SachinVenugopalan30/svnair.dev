import { ImageResponse } from "next/og";
import { MOUNTAINS, drawContours } from "@/lib/contours";

export const dynamic = "force-static";
export const alt = "Sachin Nair: data scientist, learner, gamer and hobby photographer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Young Serif for the name. Built once at build time; if the font can't be
// fetched (offline build) the card falls back to the default face.
async function youngSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Young+Serif")
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  // A fixed map (the Matterhorn, fixed terrain) so the card never changes between builds.
  const { width: W, height: H } = size;
  const { lines } = drawContours(MOUNTAINS[0], [0.4, 2.1, 4.3, 1.2, 5.6], W, H, {
    left: 300,
    right: 900,
    top: 200,
    bottom: 430,
  });
  const map = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${lines
    .map(
      (l) =>
        `<path d="${l.d}" fill="none" stroke="${l.index ? "#5d6a55" : "#8a9a73"}" stroke-width="${l.index ? 2 : 1.3}"/>`,
    )
    .join("")}<defs><radialGradient id="halo"><stop offset="0.68" stop-color="#dfe5d8"/><stop offset="1" stop-color="#dfe5d8" stop-opacity="0"/></radialGradient></defs><ellipse cx="${W / 2}" cy="${H / 2}" rx="560" ry="250" fill="url(#halo)"/></svg>`;
  const font = await youngSerif();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#dfe5d8",
        fontFamily: font ? "Young Serif" : undefined,
        position: "relative",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(map)}`}
        width={W}
        height={H}
        alt=""
        style={{ position: "absolute", inset: 0 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            color: "#22301f",
            lineHeight: 1.05,
          }}
        >
          Sachin Nair
        </div>
        <div style={{ fontSize: 32, color: "#22301f", marginTop: 20 }}>
          Data scientist, learner, gamer and hobby photographer
        </div>
        <div style={{ fontSize: 26, color: "#0f5e63", marginTop: 28 }}>
          svnair.dev
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: font ? [{ name: "Young Serif", data: font, weight: 400, style: "normal" }] : [],
    },
  );
}
