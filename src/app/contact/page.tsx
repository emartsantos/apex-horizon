import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { ContactForm } from "@/components/site/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact & demo",
  description:
    "Book a 30-minute working session with the Apex Horizon platform team. Map your residency, latency, and compliance constraints to a concrete architecture.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
        eyebrow="Book a demo"
        title="Start with your constraints."
        intro="Tell us what you're accountable for. We'll come prepared with an architecture that respects it — not a slide deck."
      />

      <section className="mt-16">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <div>
              <Rule />
              <div className="pt-12">
                <ContactForm />
              </div>
            </div>

            <aside className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Direct
                </h2>
                <a
                  href={`mailto:${settings.email}`}
                  className="font-display text-xl font-light tracking-tight text-fg transition-colors hover:text-accent-amber"
                >
                  {settings.email}
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="font-mono text-[0.72rem] uppercase tracking-label text-fg-muted transition-colors hover:text-fg"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Headquarters
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {settings.hq}
                  <br />
                  {settings.legalName}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Regions
                </h2>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {settings.regions.map((region) => (
                    <li
                      key={region}
                      className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Security disclosure
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Report vulnerabilities to security@apexhorizon.com. We operate a
                  coordinated disclosure programme.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <div className="mt-24">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])}
        />
      </div>
    </>
  );
}
