import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";

export default function NotFound() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
          <p
            aria-hidden="true"
            className="font-display text-[clamp(6rem,16vw,13rem)] leading-[0.8] text-accent"
          >
            404
          </p>
          <div className="flex flex-col gap-8 lg:pt-4">
            <span className="index-tab">Not found</span>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] text-fg">
              We couldn&apos;t find that page.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-fg-muted">
              The page you&apos;re looking for has moved or never existed.
              Let&apos;s get you back on track.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/" variant="primary" size="lg" arrow>
                Back home
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Get started
              </ButtonLink>
            </div>
            <p className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
              Or read about{" "}
              <Link
                href="/how-it-works"
                className="link-underline text-fg"
              >
                how care works at Lumina
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
