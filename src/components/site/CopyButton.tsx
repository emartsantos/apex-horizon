"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="shrink-0 rounded-none border border-control bg-ink-raised px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-label text-fg transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
