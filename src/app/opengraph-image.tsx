import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social card in the kanso look: warm paper, the name, one marigold highlight.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f6f5f4",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", height: 22, background: "#005db0", margin: "-80px -80px 0" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: -4 }}>kanso</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 44, color: "#171717" }}>
            Tasks, notes and habits in one
            <span style={{ background: "#ffb110", color: "#000", borderRadius: 9999, padding: "4px 28px" }}>calm</span>
            place.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#615d59" }}>Try the demo, no signup needed</div>
      </div>
    ),
    size,
  );
}
