import { ImageResponse } from "next/og";

export const alt = "Apex Horizon Technologies — secure cloud for enterprise AI";
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
          backgroundColor: "#0a0b0d",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a1a7b0",
            }}
          >
            Apex Horizon Technologies
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f0924b",
            }}
          >
            Enterprise cloud · AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.02,
              color: "#ece9e2",
              maxWidth: 900,
            }}
          >
            The secure cloud for enterprise AI.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a1a7b0",
            }}
          >
            One control plane for compute, data, and zero-trust security.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 4,
            width: "100%",
            background: "linear-gradient(90deg, #f0a24b, #e8623c, #a03e22)",
          }}
        />
      </div>
    ),
    size,
  );
}
