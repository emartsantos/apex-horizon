import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-label text-fg-subtle">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-fg-muted">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className={cn("text-line-strong")}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
