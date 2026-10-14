import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { Rule } from "./Rule";
import { Reveal } from "./Reveal";

export function CtaBand({
  eyebrow = "Next step",
  title = "Bring secure, high-performance AI into production.",
  intro = "Book a 30-minute working session with our platform team. We'll map your constraints — residency, latency, compliance — to a concrete architecture.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="mt-32" aria-labelledby="cta-heading">
      <Container>
        <Rule />
        <Reveal className="grid gap-10 py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
              {eyebrow}
            </p>
            <h2
              id="cta-heading"
              className="max-w-2xl font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.04] tracking-tighter text-fg"
            >
              {title}
            </h2>
            <p className="max-w-lg text-pretty leading-relaxed text-fg-muted">
              {intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/contact" variant="primary" size="lg" arrow>
              Book a demo
            </ButtonLink>
            <ButtonLink href="/platform" variant="outline" size="lg">
              Explore the platform
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
