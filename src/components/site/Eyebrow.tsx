import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-label text-fg-muted",
        className,
      )}
    >
      {index ? (
        <span className="text-accent-amber">{index}</span>
      ) : (
        <span
          aria-hidden="true"
          className="inline-block h-px w-6"
          style={{ background: "var(--horizon)" }}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
