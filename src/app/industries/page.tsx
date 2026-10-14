import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { IndustryCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getIndustries } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Apex Horizon serves regulated sectors where resilience, sovereignty, and assurance are non-negotiable: financial services, healthcare, and the public sector.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
        ]}
        eyebrow="Sectors"
        title="Where failure is expensive."
        intro="We build for environments where an outage, a data breach, or an unproven control carries consequences beyond the balance sheet."
      />

      <section className="mt-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={i * 80}>
                <IndustryCard industry={industry} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </>
  );
}
