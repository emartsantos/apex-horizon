import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import type { CaseStudy, Industry, Insight, Service } from "@/lib/types";

function Index({ value }: { value: number }) {
  return (
    <span className="font-mono text-[0.68rem] tracking-label text-fg-subtle">
      {String(value).padStart(2, "0")}
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
      className="group flex flex-col gap-6 border-t border-line py-8 transition-colors hover:border-line-strong"
    >
      <div className="flex items-center justify-between">
        <Index value={index + 1} />
        <span
          aria-hidden="true"
          className="text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
        >
          →
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-light tracking-tight text-fg">
          {service.title}
        </h3>
        <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
          {service.tagline}
        </p>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-fg-muted">
        {service.summary}
      </p>
      <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
        {service.capabilities.slice(0, 2).map((cap) => (
          <li
            key={cap.title}
            className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle"
          >
            {cap.title}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function IndustryCard({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex flex-col justify-between gap-10 rounded-sm border border-line bg-ink-raised p-8 transition-colors hover:border-line-strong"
    >
      <div className="flex items-start justify-between">
        <Index value={index + 1} />
        <span
          aria-hidden="true"
          className="text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
        >
          →
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-[1.75rem] font-light tracking-tight text-fg">
          {industry.title}
        </h3>
        <p className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
          {industry.tagline}
        </p>
        <p className="text-sm leading-relaxed text-fg-muted">
          {industry.summary}
        </p>
      </div>
    </Link>
  );
}

export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group flex flex-col justify-between gap-10 border-t border-line py-10 transition-colors hover:border-line-strong",
        featured && "lg:py-14",
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
          <span className="text-fg-muted">{study.client}</span>
          <span aria-hidden="true">/</span>
          <span>{study.sector}</span>
          <span aria-hidden="true">/</span>
          <span>{study.year}</span>
        </div>
        <h3
          className={cn(
            "max-w-3xl font-display font-light leading-tight tracking-tight text-fg",
            featured
              ? "text-[clamp(1.8rem,3.4vw,2.6rem)]"
              : "text-[clamp(1.5rem,2.4vw,2rem)]",
          )}
        >
          {study.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
          {study.summary}
        </p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {study.results.slice(0, 3).map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <dd className="font-display text-xl font-light tracking-tight text-fg">
                {metric.value}
              </dd>
              <dt className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
        <span className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
          Read case study →
        </span>
      </div>
    </Link>
  );
}

export function InsightCard({
  insight,
}: {
  insight: Insight;
}) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col gap-5 border-t border-line py-8 transition-colors hover:border-line-strong"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.64rem] uppercase tracking-label text-fg-subtle">
        <span className="text-accent-amber">{insight.category}</span>
        <span aria-hidden="true">/</span>
        <time dateTime={insight.publishedAt}>
          {formatDate(insight.publishedAt)}
        </time>
        <span aria-hidden="true">/</span>
        <span>{insight.readingMinutes} min</span>
      </div>
      <h3 className="max-w-2xl font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-tight tracking-tight text-fg transition-colors group-hover:text-accent-amber">
        {insight.title}
      </h3>
      <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
        {insight.excerpt}
      </p>
    </Link>
  );
}
