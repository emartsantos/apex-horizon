import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
      fill="none"
    >
      <circle
        cx="16"
        cy="16"
        r="9"
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <path
        d="M3.5 16h25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.4" fill="var(--color-accent)" />
    </svg>
  );
}

export function Wordmark({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark ? <Logomark /> : null}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.28rem] leading-none text-fg">
          Lumina
        </span>
        <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-fg-subtle">
          Health &amp; Wellness
        </span>
      </span>
    </span>
  );
}

export function Logo({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Lumina Health & Wellness — home"
      className={cn("inline-flex rounded-xs", className)}
    >
      <Wordmark showMark={showMark} />
    </Link>
  );
}
