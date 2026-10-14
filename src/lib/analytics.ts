"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | "cta_click"
  | "demo_request"
  | "form_submit"
  | "nav_open"
  | "outbound_click";

export function track(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean | undefined>,
) {
  try {
    vercelTrack(event, properties);
  } catch {
    /* analytics is best-effort; never block the UI */
  }
}
