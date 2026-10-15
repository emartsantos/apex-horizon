import Link from "next/link";
import { Wordmark } from "./Logo";
import { Container } from "./Container";
import { TrackedLink } from "./TrackedLink";
import { getCopyrightYear } from "@/lib/content";
import type { SiteSettings } from "@/lib/types";

export async function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = await getCopyrightYear();

  return (
    <footer className="mt-32 bg-paper text-ink">
      <div className="h-1.5 w-full" style={{ background: "var(--daylight)" }} />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-6">
            <Wordmark />
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink/65">
              {settings.description}
            </p>
            <div className="flex flex-col gap-1 font-mono text-[0.66rem] uppercase tracking-label text-ink/60">
              <span>{settings.hq}</span>
              <span>{settings.regions.join(" · ")}</span>
            </div>
            <a
              href={`mailto:${settings.email}`}
              className="link-underline w-fit font-mono text-[0.72rem] uppercase tracking-label text-ink transition-colors hover:text-ink"
            >
              {settings.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {settings.footer.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-[0.6rem] uppercase tracking-label text-ink/60">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink/70 transition-colors hover:text-ink"
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

        <div className="mt-14 h-px w-full bg-ink/15" />

        <div className="mt-8 flex flex-col gap-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {settings.certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-label text-ink/65"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 bg-accent-moss"
                />
                {cert}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 text-ink/60 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.64rem] uppercase tracking-label">
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
                    className="font-mono text-[0.64rem] uppercase tracking-label transition-colors hover:text-ink"
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
