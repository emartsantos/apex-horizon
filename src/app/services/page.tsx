import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { getServices } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Enterprise AI, zero-trust security, compliance and governance, and sovereign cloud platform — four disciplines delivered as one governed platform.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
        eyebrow="Capabilities"
        title="Four disciplines that compound."
        intro="Each capability stands on its own, and each is stronger because the others share the same control plane, the same data boundaries, and the same evidence trail."
      />

      <section className="mt-24">
        <Container>
          <div className="flex flex-col">
            {services.map((service, i) => (
              <Reveal key={service.slug}>
                <article
                  id={service.slug}
                  className="grid gap-10 border-t border-line py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
                >
                  <div className="flex flex-col gap-5">
                    <span className="font-mono text-[0.68rem] tracking-label text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight tracking-tight text-fg">
                      {service.title}
                    </h2>
                    <p className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                      {service.tagline}
                    </p>
                    <p className="max-w-md text-sm leading-relaxed text-fg-muted">
                      {service.summary}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-2 inline-flex w-fit items-center gap-2 font-mono text-[0.68rem] uppercase tracking-label text-fg transition-colors hover:text-accent-amber"
                    >
                      Explore {service.title}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                      {service.capabilities.map((cap) => (
                        <div
                          key={cap.title}
                          className="border-t border-line pt-4"
                        >
                          <h3 className="text-sm font-medium text-fg">
                            {cap.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                            {cap.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                    <dl className="flex flex-wrap gap-x-10 gap-y-4">
                      {service.outcomes.map((metric) => (
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
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Rule quiet />
        </Container>
      </section>

      <CtaBand
        eyebrow="Working session"
        title="See how the four combine on your constraints."
        intro="Bring your residency, latency, and compliance requirements. We'll map them to a concrete architecture in a 30-minute session."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
