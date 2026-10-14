import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";

export default function NotFound() {
  return (
    <section className="pt-24 lg:pt-32">
      <Container>
        <div className="flex max-w-2xl flex-col gap-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
            404 · Not found
          </p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-tightest text-fg">
            This horizon doesn’t exist.
          </h1>
          <p className="text-lg leading-relaxed text-fg-muted">
            The page you’re looking for has moved or never existed. Let’s get you
            back to solid ground.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/" variant="primary" size="lg" arrow>
              Back home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact us
            </ButtonLink>
          </div>
          <p className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
            Or try the{" "}
            <Link href="/platform" className="text-fg underline underline-offset-4">
              platform overview
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
