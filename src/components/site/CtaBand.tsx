import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

export function CtaBand({
  eyebrow = "Next step",
  title = "Care that fits your life, starting this week.",
  intro = "Tell us a little about what you need. A Lumina care coordinator will help you find the right clinician and get your first virtual visit on the calendar — usually within days, not months.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="mt-32" aria-labelledby="cta-heading">
      <div className="bg-paper text-ink">
        <div className="h-1.5 w-full" style={{ background: "var(--daylight)" }} />
        <Container className="py-20 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div className="flex flex-col gap-6">
              <p className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-label text-ink/70">
                <span aria-hidden="true" className="inline-block h-px w-6 bg-accent" />
                {eyebrow}
              </p>
              <h2
                id="cta-heading"
                className="max-w-2xl font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02] text-ink"
              >
                {title}
              </h2>
              <p className="max-w-lg text-pretty leading-relaxed text-ink/70">
                {intro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/contact" variant="accent" size="lg" arrow>
                Get started
              </ButtonLink>
              <ButtonLink
                href="/how-it-works"
                variant="outline"
                size="lg"
                className="border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper"
              >
                How it works
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
