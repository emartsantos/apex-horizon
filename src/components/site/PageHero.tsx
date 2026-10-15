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
    <section className={cn("pt-14 lg:pt-20", className)}>
      <Container>
        <Breadcrumbs items={breadcrumbs} className="mb-10" />
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="flex flex-col gap-7">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-balance font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.94] tracking-tightest text-fg">
              {title}
            </h1>
          </div>
          <div className="flex flex-col gap-6 lg:pb-3">
            {intro ? (
              <p className="text-pretty text-lg leading-relaxed text-fg-muted">
                {intro}
              </p>
            ) : null}
            {aside}
          </div>
        </div>
        <div className="mt-14 horizon-rule" />
      </Container>
    </section>
  );
}
