import { Suspense } from "react";
import { isSanityConfigured } from "@/sanity/env";
import { StudioClient } from "./StudioClient";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          background: "#0a0b0d",
          color: "#ece9e2",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 560, lineHeight: 1.6 }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Sanity Studio</h1>
          <p style={{ color: "#a1a7b0" }}>
            The CMS is not configured yet. Set{" "}
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> in your environment, then
            reload this page. Until then, the site serves bundled content.
          </p>
        </div>
      </main>
    );
  }

  return (
    <Suspense
      fallback={<div style={{ minHeight: "100vh", background: "#0a0b0d" }} />}
    >
      <StudioClient />
    </Suspense>
  );
}
