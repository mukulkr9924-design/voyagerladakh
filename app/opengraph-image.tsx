import { ImageResponse } from "next/og";

export const alt = "Voyager Ladakh – treks, expeditions and tours from Leh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 72,
          background: "linear-gradient(160deg, #24473a 0%, #11251c 70%)",
          color: "#f4ecdc",
          position: "relative",
        }}
      >
        <svg width="1200" height="260" viewBox="0 0 1200 260" style={{ position: "absolute", left: 0, bottom: 0 }}>
          <path d="M0 260 L180 120 L300 190 L470 40 L640 170 L760 100 L930 200 L1060 110 L1200 180 L1200 260 Z" fill="#2c5645" />
          <path d="M0 260 L140 190 L330 230 L520 150 L700 230 L880 170 L1050 230 L1200 200 L1200 260 Z" fill="#18382b" />
        </svg>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#c9955c" }}>
          Voyager Ladakh
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 120 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900 }}>Where the trail meets the timeless</div>
          <div style={{ fontSize: 30, marginTop: 24, color: "#cdd6c4" }}>
            Treks · 6,000 m expeditions · Motorbike tours · Culture — from Leh
          </div>
        </div>
      </div>
    ),
    size,
  );
}
