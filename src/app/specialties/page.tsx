import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SpecialtyCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getSpecialties } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Specialties",
  description:
    "Virtual care across the specialties that matter most in daily life — family medicine, mental health, dermatology, women's health, and chronic care — from licensed clinicians in all fifty states.",
  path: "/specialties",
});

export default async function SpecialtiesPage() {
  const specialties = await getSpecialties();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/specialties", label: "Specialties" },
        ]}
        eyebrow="Specialties"
        title="The right clinician for what you're facing."
        intro="Licensed clinicians across the specialties people need most, available by secure video wherever you are."
      />

      <section className="mt-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty, i) => (
              <Reveal key={specialty.slug} delay={i * 80}>
                <SpecialtyCard specialty={specialty} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
        ])}
      />
    </>
  );
}
