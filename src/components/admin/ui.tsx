import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-3xl font-light tracking-tight text-fg">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  actions,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-sm border border-line bg-ink-raised/60",
        className,
      )}
    >
      {title ? (
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-mono text-[0.68rem] uppercase tracking-label text-fg-muted">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-xs text-fg-subtle">{description}</p>
            ) : null}
          </div>
          {actions}
        </header>
      ) : null}
      {children}
    </section>
  );
}

const toneMap = {
  neutral: "border-line-strong text-fg-muted",
  accent: "border-accent/40 text-accent",
  amber: "border-accent-amber/40 text-accent-amber",
  danger: "border-red-600/40 text-red-700",
} as const;

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof toneMap;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-label",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <p className="font-display text-xl font-light text-fg">{title}</p>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-fg-muted">
          {description}
        </p>
      ) : null}
      {action}
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[0.62rem] uppercase tracking-label text-fg-muted"
      >
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-fg-subtle">{hint}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "h-10 w-full rounded-xs border border-control bg-ink-raised px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none";

export const textareaClass =
  "w-full rounded-xs border border-control bg-ink-raised px-3 py-2.5 text-sm leading-relaxed text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  tone?: "primary" | "outline" | "danger";
};

export function ActionButton({
  tone = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const tones = {
    primary: "bg-paper text-ink hover:bg-accent",
    outline:
      "border border-line-strong text-fg hover:border-fg-subtle hover:bg-ink-2",
    danger: "border border-red-600/40 text-red-700 hover:bg-red-500/10",
  } as const;
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xs px-4 font-mono text-[0.66rem] uppercase tracking-label transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  tone = "primary",
  className,
  children,
}: {
  href: string;
  tone?: "primary" | "outline";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    primary: "bg-paper text-ink hover:bg-accent",
    outline:
      "border border-line-strong text-fg hover:border-fg-subtle hover:bg-ink-2",
  } as const;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xs px-4 font-mono text-[0.66rem] uppercase tracking-label transition-colors",
        tones[tone],
        className,
      )}
    >
      {children}
    </Link>
  );
}
