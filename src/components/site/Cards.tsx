import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { Insight, Provider, Service, Specialty, Story } from "@/lib/types";

function Index({ value }: { value: number }) {
  return (
    <span className="font-mono text-[0.68rem] tracking-label text-fg-subtle">
      {String(value).padStart(2, "0")}
    </span>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent",
        className,
      )}
    >
      →
    </span>
  );
}

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-6 border-t border-line py-9 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <Index value={index + 1} />
        <Arrow />
      </div>
      <div className="grid gap-x-10 gap-y-4 md:grid-cols-[1fr_1.15fr] md:items-start">
        <div className="flex flex-col gap-2.5">
          <h3 className="font-display text-[1.7rem] leading-tight text-fg">
            {service.title}
          </h3>
          <p className="font-mono text-[0.66rem] uppercase tracking-label text-accent">
            {service.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm leading-relaxed text-fg-muted">
            {service.summary}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {service.capabilities.slice(0, 3).map((cap) => (
              <li
                key={cap.title}
                className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle"
              >
                {cap.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export function SpecialtyCard({
  specialty,
  index,
}: {
  specialty: Specialty;
  index: number;
}) {
  return (
    <Link
      href={`/specialties/${specialty.slug}`}
      className="group flex flex-col justify-between gap-14 border border-line bg-ink-raised p-7 transition-colors hover:border-accent hover:bg-ink-2"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-[2.6rem] leading-none text-line-strong transition-colors duration-200 group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Arrow />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-[1.7rem] leading-tight text-fg">
          {specialty.title}
        </h3>
        <p className="font-mono text-[0.64rem] uppercase tracking-label text-accent">
          {specialty.tagline}
        </p>
        <p className="text-sm leading-relaxed text-fg-muted">
          {specialty.summary}
        </p>
      </div>
    </Link>
  );
}

export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn(
        "group flex flex-col justify-between gap-10 border-t border-line py-10 transition-colors hover:border-accent",
        featured && "lg:py-14",
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.64rem] uppercase tracking-label text-fg-subtle">
          <span className="text-accent">{story.client}</span>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <span>{story.sector}</span>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <span>{story.year}</span>
        </div>
        <h3
          className={cn(
            "max-w-3xl font-display leading-[1.06] text-fg",
            featured
              ? "text-[clamp(1.9rem,3.6vw,2.9rem)]"
              : "text-[clamp(1.5rem,2.4vw,2rem)]",
          )}
        >
          {story.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
          {story.summary}
        </p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {story.results.slice(0, 3).map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <dd className="font-display text-xl leading-none text-fg">
                {metric.value}
              </dd>
              <dt className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
        <span className="font-mono text-[0.66rem] uppercase tracking-label text-accent">
          Read story →
        </span>
      </div>
    </Link>
  );
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col gap-5 border-t border-line py-8 transition-colors hover:border-accent"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
        <span className="text-accent">{insight.category}</span>
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        <time dateTime={insight.publishedAt}>
          {formatDate(insight.publishedAt)}
        </time>
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        <span>{insight.readingMinutes} min</span>
      </div>
      <h3 className="max-w-2xl font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight text-fg transition-colors group-hover:text-accent">
        {insight.title}
      </h3>
      <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
        {insight.excerpt}
      </p>
    </Link>
  );
}

export function ProviderCard({
  provider,
  index,
}: {
  provider: Provider;
  index?: number;
}) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="group flex flex-col gap-6 border border-line bg-ink-raised p-7 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center border border-line-strong bg-ink-2 font-display text-lg text-accent">
          {initials(provider.displayName)}
        </span>
        {typeof index === "number" ? <Index value={index + 1} /> : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl leading-tight text-fg">
          {provider.displayName}
        </h3>
        <p className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
          {provider.credentials} · {provider.specialty}
        </p>
      </div>
      <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
        {provider.bio}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4 font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
        <span>{provider.location}</span>
        <span aria-hidden="true" className="text-line-strong">
          ·
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-1.5 w-1.5",
              provider.acceptingNew ? "bg-accent-moss" : "bg-line-strong",
            )}
          />
          {provider.acceptingNew ? "Accepting new patients" : "Waitlist"}
        </span>
      </div>
    </Link>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.includes("."))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
