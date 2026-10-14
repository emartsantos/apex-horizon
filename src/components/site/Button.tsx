import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xs font-mono text-[0.72rem] uppercase tracking-label transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-paper text-ink hover:bg-paper-dim",
  accent:
    "bg-accent text-white hover:bg-[#f2734d] focus-visible:outline-ink",
  outline:
    "border border-line-strong text-fg hover:border-fg-subtle hover:bg-white/[0.03]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-13 px-7 text-[0.74rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  arrow,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  arrow,
  ...props
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "children" | "className"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}
