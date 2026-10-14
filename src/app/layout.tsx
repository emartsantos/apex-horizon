import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteHeaderFallback } from "@/components/site/SiteHeaderFallback";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://apex-horizon.vercel.app",
  ),
  title: {
    default: "Apex Horizon Technologies — Secure cloud for enterprise AI",
    template: "%s · Apex Horizon Technologies",
  },
  description:
    "Apex Horizon Technologies engineers enterprise cloud for secure, high-performance AI: one control plane for compute, data, zero-trust security, and continuous compliance.",
  applicationName: "Apex Horizon Technologies",
  keywords: [
    "enterprise cloud",
    "enterprise AI",
    "zero-trust security",
    "AI governance",
    "data sovereignty",
    "compliance automation",
    "secure inference",
  ],
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default async function RootLayout(props: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-ink text-fg antialiased">
        <a href="#main" className="skip-link">
          <span className="inline-flex h-10 items-center rounded-xs bg-paper px-4 font-mono text-[0.7rem] uppercase tracking-label text-ink">
            Skip to content
          </span>
        </a>
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader nav={settings.nav} />
        </Suspense>
        <main id="main">{props.children}</main>
        <SiteFooter settings={settings} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
