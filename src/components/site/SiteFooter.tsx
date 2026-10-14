import Link from "next/link";
import { Wordmark } from "./Logo";
import { Container } from "./Container";
import { Rule } from "./Rule";
import { TrackedLink } from "./TrackedLink";
import { getCopyrightYear } from "@/lib/content";
import type { SiteSettings } from "@/lib/types";

export async function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = await getCopyrightYear();

  return (
    <footer className="mt-32 border-t border-line bg-ink-raised">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-6">
            <Wordmark />
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-fg-muted">
              {settings.description}
            </p>
            <div className="flex flex-col gap-1 font-mono text-[0.68rem] uppercase tracking-label text-fg-subtle">
              <span>{settings.hq}</span>
              <span>{settings.regions.join(" · ")}</span>
            </div>
            <a
              href={`mailto:${settings.email}`}
              className="w-fit font-mono text-[0.72rem] uppercase tracking-label text-fg transition-colors hover:text-accent-amber"
            >
              {settings.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {settings.footer.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Rule quiet />
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {settings.certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                {cert}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.66rem] uppercase tracking-label">
              © {year} {settings.legalName}
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {settings.social.map((item) => (
                <li key={item.label}>
                  <TrackedLink
                    href={item.href}
                    label={item.label}
                    event="outbound_click"
                    location="footer"
                    className="font-mono text-[0.66rem] uppercase tracking-label transition-colors hover:text-fg"
                  >
                    {item.label}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
