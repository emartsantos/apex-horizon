"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/lib/auth/session";

type Item = {
  href: string;
  label: string;
  roles: AdminRole[];
  hint?: string;
};

const groups: { label: string; items: Item[] }[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", roles: ["ADMIN", "EDITOR", "VIEWER"] },
    ],
  },
  {
    label: "Content",
    items: [
      {
        href: "/admin/providers",
        label: "Providers",
        roles: ["ADMIN", "EDITOR", "VIEWER"],
        hint: "Directory records",
      },
      {
        href: "/admin/articles",
        label: "Wellness articles",
        roles: ["ADMIN", "EDITOR", "VIEWER"],
        hint: "Blog and guides",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        href: "/admin/submissions",
        label: "Contact enquiries",
        roles: ["ADMIN"],
      },
      { href: "/admin/audit", label: "Audit log", roles: ["ADMIN"] },
    ],
  },
  {
    label: "Administration",
    items: [{ href: "/admin/users", label: "Users & roles", roles: ["ADMIN"] }],
  },
];

export function AdminNav({ role }: { role: AdminRole }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="admin-rail"
        className="fixed bottom-4 right-4 z-40 inline-flex h-11 items-center rounded-none border border-line-strong bg-ink-raised px-5 font-mono text-[0.66rem] uppercase tracking-label text-fg lg:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      <nav
        id="admin-rail"
        aria-label="Admin"
        className={cn(
          "border-line bg-ink-raised/70 lg:sticky lg:top-0 lg:block lg:h-dvh lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r",
          open
            ? "fixed inset-x-0 bottom-0 top-0 z-30 overflow-y-auto border-t bg-ink"
            : "hidden",
        )}
      >
        <div className="flex flex-col gap-8 px-5 py-6">
          {groups.map((group) => {
            const visible = group.items.filter((item) =>
              item.roles.includes(role),
            );
            if (visible.length === 0) return null;
            return (
              <div key={group.label} className="flex flex-col gap-1.5">
                <p className="px-3 font-mono text-[0.58rem] uppercase tracking-label text-fg-subtle">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {visible.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-xs px-3 py-2 text-sm transition-colors",
                          isActive(item.href)
                            ? "bg-ink-2 text-fg"
                            : "text-fg-muted hover:bg-ink-2 hover:text-fg",
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive(item.href) ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 bg-accent"
                          />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
