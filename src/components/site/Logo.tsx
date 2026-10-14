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
      <defs>
        <linearGradient id="ah-horizon" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#f0a24b" />
          <stop offset="52%" stopColor="#e8623c" />
          <stop offset="100%" stopColor="#a03e22" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="2" stroke="#2c323c" />
      <path d="M7 21.5 16 9l9 12.5" stroke="url(#ah-horizon)" strokeWidth="1.75" />
      <line x1="4" y1="25" x2="28" y2="25" stroke="#e8623c" strokeWidth="1.5" />
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
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.34em] text-fg-muted">
          Apex Horizon
        </span>
        <span className="mt-0.5 font-display text-[0.98rem] font-medium tracking-tight text-fg">
          Technologies
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
      aria-label="Apex Horizon Technologies — home"
      className={cn("inline-flex rounded-xs", className)}
    >
      <Wordmark showMark={showMark} />
    </Link>
  );
}
