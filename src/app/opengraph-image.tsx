import { ImageResponse } from "next/og";

export const alt = "Lumina Health & Wellness — Telehealth, thoughtfully delivered";
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
          backgroundColor: "#f3eee3",
          padding: 72,
          borderTop: "12px solid #a8431f",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 34,
                height: 34,
                borderRadius: 17,
                border: "4px solid #a8431f",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#201b15",
              }}
            >
              Lumina Health &amp; Wellness
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a8431f",
            }}
          >
            Telehealth · All 50 states
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.02,
              color: "#201b15",
              maxWidth: 940,
            }}
          >
            Care that fits your life.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#554d42",
            }}
          >
            Unhurried virtual care, across all fifty states.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 4,
            width: "100%",
            background: "linear-gradient(90deg, #a8431f, #94601a, #4e6142)",
          }}
        />
      </div>
    ),
    size,
  );
}
