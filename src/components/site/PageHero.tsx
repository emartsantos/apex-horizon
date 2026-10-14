import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  aside,
  className,
}: {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pt-16 lg:pt-24", className)}>
      <Container>
        <Breadcrumbs items={breadcrumbs} className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.98] tracking-tightest text-fg">
              {title}
            </h1>
            {intro ? (
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
                {intro}
              </p>
            ) : null}
          </div>
          {aside ? <div className="lg:pb-2">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
