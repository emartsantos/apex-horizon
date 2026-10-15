import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "wide";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "wide"
          ? "md:flex-row md:items-end md:justify-between"
          : "max-w-3xl",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-6", align === "wide" && "max-w-2xl")}>
        {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
        <h2 className="font-display text-balance text-[clamp(2.1rem,5vw,3.8rem)] leading-[0.99] text-fg">
          {title}
        </h2>
        {intro ? (
          <p className="max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted">
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
