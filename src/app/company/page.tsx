import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ButtonLink } from "@/components/site/Button";
import { ProviderCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getProviders, getSiteSettings } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Lumina Health & Wellness is a nationwide virtual practice built around licensed clinicians, unhurried visits, and care that is easier to reach and easier to trust.",
  path: "/company",
});

const delivery = [
  {
    title: "Virtual by design",
    body: "Care is delivered by secure video, so you can be seen from home without taking a day off or sitting in a waiting room.",
  },
  {
    title: "One record, one team",
    body: "Your history, medications, and care plan stay connected with your clinician, so every visit builds on the last.",
  },
  {
    title: "Licensed in all 50 states",
    body: "Our clinicians are licensed and credentialed across the country, with appointments in the evenings and on weekends.",
  },
];

const values = [
  {
    title: "Care comes first",
    body: "Every decision starts with the person in front of us, not the metric behind them.",
  },
  {
    title: "Plain language",
    body: "We explain what is going on and what to do about it, clearly, without jargon.",
  },
  {
    title: "Privacy as a promise",
    body: "Your health information is treated as a medical record, handled with the safeguards it deserves.",
  },
  {
    title: "Calm by default",
    body: "Good care does not have to feel rushed. We protect the time it takes to listen.",
  },
];

export default async function CompanyPage() {
  const [providers, settings] = await Promise.all([
    getProviders(),
    getSiteSettings(),
  ]);

  const featured = providers.slice(0, 4);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/company", label: "About" },
        ]}
        eyebrow="About"
        title="Healthcare that is easier to reach and easier to trust."
        intro="Lumina is a nationwide telehealth practice founded by clinicians and operators who wanted care to feel human again — unhurried, respectful, and close to home, wherever home is."
      />

      <section className="mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tighter text-fg">
              Most people put off care because it is hard to reach. We built a
              practice where licensed clinicians, honest time, and connected
              records make care feel simple again.
            </h2>
            <div className="flex flex-col gap-4 lg:pt-2">
              <p className="text-sm leading-relaxed text-fg-muted">
                Our clinicians serve members across {settings.regions.length}{" "}
                regions, from {settings.hq} and beyond. We care for families,
                working adults, and people managing ongoing conditions — anyone
                who wants a clinician who knows them and time to be heard.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <ButtonLink href="/roles" variant="ghost" size="md" arrow>
                  Join the practice
                </ButtonLink>
                <ButtonLink href="/trust" variant="ghost" size="md" arrow>
                  Trust &amp; safety
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <Rule />
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="How care is delivered"
              title="What a modern practice should look like."
              align="wide"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-3">
            {delivery.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Our clinicians"
              title="Clinicians you'll actually see again."
              intro="A few of the licensed clinicians who care for our members. Meet the whole team in the provider directory."
              align="wide"
              action={
                <ButtonLink href="/providers" variant="ghost" size="md" arrow>
                  Provider directory
                </ButtonLink>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((provider, i) => (
              <Reveal key={provider.slug} delay={(i % 2) * 80}>
                <ProviderCard provider={provider} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Principles"
              title="How we practice."
              align="wide"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-t border-line pt-5">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/company" },
        ])}
      />
    </>
  );
}
