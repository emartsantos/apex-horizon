"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/types";

export function SiteHeader({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div
        className="mx-auto flex h-[76px] w-full items-center justify-between px-[var(--gutter)]"
        style={{ maxWidth: "var(--shell-max)" }}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {nav.map((group) =>
              group.items ? (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => openMenu(group.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={open === group.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpen(open === group.label ? null : group.label)
                    }
                    className={cn(
                      "flex items-center gap-1.5 py-2 text-[0.92rem] transition-colors",
                      isActive(group.href) || open === group.label
                        ? "text-fg"
                        : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {group.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-[0.5rem] transition-transform duration-200",
                        open === group.label && "rotate-180",
                      )}
                    >
                      ▾
                    </span>
                  </button>

                  <div
                    className={cn(
                      "absolute left-0 top-full w-[21rem] origin-top-left pt-4 transition duration-200",
                      open === group.label
                        ? "visible opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="overflow-hidden border border-line bg-ink-raised shadow-[0_24px_60px_-24px_rgba(32,27,21,0.35)]">
                      <div className="horizon-rule" />
                      <ul>
                        <li>
                          <Link
                            href={group.href}
                            className="flex flex-col gap-0.5 border-b border-line px-5 py-3.5 transition-colors hover:bg-ink-2"
                          >
                            <span className="font-mono text-[0.6rem] uppercase tracking-label text-accent">
                              View all
                            </span>
                            <span className="text-[0.95rem] text-fg">
                              {group.label} overview
                            </span>
                          </Link>
                        </li>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex flex-col gap-0.5 px-5 py-3 transition-colors hover:bg-ink-2"
                            >
                              <span className="text-[0.95rem] text-fg">
                                {item.label}
                              </span>
                              {item.description ? (
                                <span className="text-xs text-fg-subtle">
                                  {item.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={group.label}>
                  <Link
                    href={group.href}
                    className={cn(
                      "text-[0.92rem] transition-colors",
                      isActive(group.href)
                        ? "text-accent"
                        : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {group.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          <Link
            href="/contact"
            className="link-underline hidden text-[0.92rem] text-fg-muted transition-colors hover:text-fg xl:inline"
          >
            Contact
          </Link>
          <ButtonLink href="/contact" variant="primary" size="sm" arrow>
            Start a visit
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-line-strong lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMobileOpen((v) => !v);
            if (!mobileOpen) track("nav_open", { location: "mobile" });
          }}
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 block h-px w-5 bg-fg transition-transform duration-200",
                mobileOpen ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-px w-5 bg-fg transition-opacity duration-200",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-5 bg-fg transition-transform duration-200",
                mobileOpen ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex min-h-full flex-col px-[var(--gutter)] py-8"
          style={{ maxWidth: "var(--shell-max)" }}
        >
          <ul className="flex flex-col">
            {nav.map((group, i) => (
              <li key={group.label} className="border-b border-line py-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.62rem] tracking-label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={group.href}
                    className="font-display text-[2rem] leading-none text-fg"
                  >
                    {group.label}
                  </Link>
                </div>
                {group.items ? (
                  <ul className="mt-4 flex flex-col gap-2.5 pl-9">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-[0.95rem] text-fg-muted transition-colors hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink
              href="/contact"
              variant="accent"
              size="lg"
              className="w-full"
              arrow
            >
              Start a visit
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
