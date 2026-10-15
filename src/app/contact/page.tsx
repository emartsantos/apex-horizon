import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { ContactForm } from "@/components/site/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Lumina Health & Wellness. Tell us what you need and a care coordinator will help you find the right clinician and get your first virtual visit on the calendar.",
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
        eyebrow="Start a visit"
        title="Tell us what you need."
        intro="Share a little about what you're looking for. A Lumina care coordinator will help you find the right clinician and get your first virtual visit on the calendar — usually within days, not months."
      />

      <section className="mt-16">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <div>
              <Rule />
              <div className="mt-10 flex flex-col gap-3 border border-line-strong bg-ink-raised p-6">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-accent">
                  Please read first
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Please do not include medical or personal health information in
                  this form. This form is not secure messaging and is not for
                  symptoms, diagnoses, or records. If this is an emergency, call 911
                  or go to the nearest emergency department.
                </p>
              </div>
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
                  The practice
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {settings.hq}
                  <br />
                  {settings.legalName}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Where we practice
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
                  Privacy questions
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Questions about your information or our privacy practices? Email
                  our Privacy Officer at privacy@luminahealth.com.
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
