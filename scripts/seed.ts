import { existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { getCliClient } from "sanity/cli";
import type { Capability, Metric, NavGroup, NavItem, RichBlock } from "@/lib/types";

function loadLocalEnv() {
  const load = (process as unknown as { loadEnvFile?: (path: string) => void })
    .loadEnvFile;
  if (!load) return;
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    try {
      load(file);
    } catch {
      // Ignore malformed env files; explicit environment variables still apply.
    }
  }
}

loadLocalEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01";
const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim() || undefined;
const clean = process.argv.includes("--clean") || process.env.SEED_CLEAN === "1";

if (!projectId) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local or the environment before seeding.",
  );
  process.exit(1);
}

const { services } = await import("@/content/services");
const { industries } = await import("@/content/industries");
const { caseStudies } = await import("@/content/case-studies");
const { insights } = await import("@/content/insights");
const { leaders } = await import("@/content/leaders");
const { jobs } = await import("@/content/jobs");
const { legalDocs } = await import("@/content/legal");
const { siteSettings } = await import("@/content/site");

const client = getCliClient({
  apiVersion,
  projectId,
  dataset,
  token: writeToken,
});

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

const slugRef = (current: string) => ({ _type: "slug", current });

const richBlocks = (blocks: RichBlock[]) =>
  blocks.map((block) => {
    if (block.kind === "list") {
      return {
        _type: "richBlock",
        _key: key(),
        kind: block.kind,
        items: block.items,
      };
    }
    if (block.kind === "quote") {
      return {
        _type: "richBlock",
        _key: key(),
        kind: block.kind,
        text: block.text,
        ...(block.attribution ? { attribution: block.attribution } : {}),
      };
    }
    return {
      _type: "richBlock",
      _key: key(),
      kind: block.kind,
      text: block.text,
    };
  });

const metrics = (list: Metric[]) =>
  list.map((metric) => ({
    _type: "metric",
    _key: key(),
    value: metric.value,
    label: metric.label,
    ...(metric.note ? { note: metric.note } : {}),
  }));

const capabilities = (list: Capability[]) =>
  list.map((item) => ({
    _type: "capability",
    _key: key(),
    title: item.title,
    detail: item.detail,
  }));

const navItems = (list: NavItem[] = []) =>
  list.map((item) => ({
    _type: "navItem",
    _key: key(),
    label: item.label,
    href: item.href,
    ...(item.description ? { description: item.description } : {}),
  }));

const navGroups = (list: NavGroup[]) =>
  list.map((group) => ({
    _type: "navGroup",
    _key: key(),
    label: group.label,
    href: group.href,
    ...(group.items ? { items: navItems(group.items) } : {}),
  }));

type SeedDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const managedTypes = [
  "siteSettings",
  "service",
  "industry",
  "caseStudy",
  "insight",
  "leader",
  "job",
  "legalDoc",
];

const documents: SeedDocument[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteSettings.name,
    legalName: siteSettings.legalName,
    description: siteSettings.description,
    url: siteSettings.url,
    email: siteSettings.email,
    phone: siteSettings.phone,
    hq: siteSettings.hq,
    regions: siteSettings.regions,
    certifications: siteSettings.certifications,
    social: siteSettings.social.map((item) => ({
      _type: "socialLink",
      _key: key(),
      label: item.label,
      href: item.href,
    })),
    nav: navGroups(siteSettings.nav),
    footer: siteSettings.footer.map((column) => ({
      _type: "footerColumn",
      _key: key(),
      title: column.title,
      items: navItems(column.items),
    })),
  },
  ...services.map((service) => ({
    _id: `service-${service.slug}`,
    _type: "service",
    slug: slugRef(service.slug),
    title: service.title,
    tagline: service.tagline,
    summary: service.summary,
    order: service.order,
    capabilities: capabilities(service.capabilities),
    outcomes: metrics(service.outcomes),
    detail: richBlocks(service.detail),
  })),
  ...industries.map((industry) => ({
    _id: `industry-${industry.slug}`,
    _type: "industry",
    slug: slugRef(industry.slug),
    title: industry.title,
    tagline: industry.tagline,
    summary: industry.summary,
    pressures: industry.pressures,
    approach: industry.approach,
    outcomes: metrics(industry.outcomes),
    detail: richBlocks(industry.detail),
  })),
  ...caseStudies.map((study) => ({
    _id: `caseStudy-${study.slug}`,
    _type: "caseStudy",
    slug: slugRef(study.slug),
    client: study.client,
    sector: study.sector,
    industrySlug: study.industrySlug,
    title: study.title,
    summary: study.summary,
    year: study.year,
    services: study.services,
    featured: study.featured,
    challenge: study.challenge,
    approach: study.approach,
    results: metrics(study.results),
    quote: {
      text: study.quote.text,
      author: study.quote.author,
      role: study.quote.role,
    },
    detail: richBlocks(study.detail),
  })),
  ...insights.map((insight) => ({
    _id: `insight-${insight.slug}`,
    _type: "insight",
    slug: slugRef(insight.slug),
    title: insight.title,
    category: insight.category,
    excerpt: insight.excerpt,
    publishedAt: insight.publishedAt,
    readingMinutes: insight.readingMinutes,
    featured: insight.featured,
    authorSlug: insight.authorSlug,
    detail: richBlocks(insight.detail),
  })),
  ...leaders.map((leader) => ({
    _id: `leader-${leader.slug}`,
    _type: "leader",
    slug: slugRef(leader.slug),
    name: leader.name,
    role: leader.role,
    focus: leader.focus,
    bio: leader.bio,
  })),
  ...jobs.map((job) => ({
    _id: `job-${job.slug}`,
    _type: "job",
    slug: slugRef(job.slug),
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    summary: job.summary,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
  })),
  ...legalDocs.map((doc) => ({
    _id: `legalDoc-${doc.slug}`,
    _type: "legalDoc",
    slug: slugRef(doc.slug),
    title: doc.title,
    updated: doc.updated,
    summary: doc.summary,
    detail: richBlocks(doc.detail),
  })),
];

async function run() {
  if (clean) {
    console.log(`Removing existing ${managedTypes.join(", ")} documents...`);
    await client.delete({
      query: "*[_type in $types]",
      params: { types: managedTypes },
    });
  }

  const transaction = client.transaction();
  for (const document of documents) {
    transaction.createOrReplace(document);
  }
  await transaction.commit();

  console.log(
    `Seeded ${documents.length} documents into ${projectId}/${dataset}.`,
  );
}

run().catch((error: unknown) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  console.error(
    "Ensure SANITY_API_WRITE_TOKEN (or a Sanity login with `--with-user-token`) has write access.",
  );
  process.exit(1);
});
