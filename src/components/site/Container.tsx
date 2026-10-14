import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
}) {
  return (
    <Tag
      className={cn("mx-auto w-full px-[var(--gutter)]", className)}
      style={{ maxWidth: "var(--shell-max)" }}
    >
      {children}
    </Tag>
  );
}
