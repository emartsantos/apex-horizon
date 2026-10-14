"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function TrackedLink({
  href,
  children,
  className,
  event = "cta_click",
  label,
  location,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  event?: AnalyticsEvent;
  label: string;
  location?: string;
}) {
  const external = href.startsWith("http");

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(className)}
        onClick={() => track(event, { label, location: location ?? "footer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={() => track(event, { label, location: location ?? "site" })}
    >
      {children}
    </Link>
  );
}
