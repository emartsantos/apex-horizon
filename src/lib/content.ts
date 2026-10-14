import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { leaders } from "@/content/leaders";
import { jobs } from "@/content/jobs";
import { legalDocs } from "@/content/legal";
import { siteSettings } from "@/content/site";
import { client, isSanityConfigured } from "@/sanity/client";
import {
  caseStudiesQuery,
  industriesQuery,
  insightsQuery,
  jobsQuery,
  leadersQuery,
  legalDocsQuery,
  servicesQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import type {
  CaseStudy,
  Industry,
  Insight,
  Job,
  Leader,
  LegalDoc,
  Service,
  SiteSettings,
} from "@/lib/types";

async function sanityOr<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query);
    if (result == null) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  cacheTag("site-settings");
  const remote = await sanityOr<SiteSettings | null>(siteSettingsQuery, null);
  if (remote && Array.isArray(remote.nav) && remote.nav.length > 0) {
    return { ...siteSettings, ...remote };
  }
  return siteSettings;
}

export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("days");
  cacheTag("services");
  const data = await sanityOr<Service[]>(servicesQuery, services);
  return [...data].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((service) => service.slug === slug);
}

export async function getIndustries(): Promise<Industry[]> {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return sanityOr<Industry[]>(industriesQuery, industries);
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  const all = await getIndustries();
  return all.find((industry) => industry.slug === slug);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  "use cache";
  cacheLife("days");
  cacheTag("case-studies");
  return sanityOr<CaseStudy[]>(caseStudiesQuery, caseStudies);
}

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  const all = await getCaseStudies();
  return all.find((study) => study.slug === slug);
}

export async function getInsights(): Promise<Insight[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("insights");
  const data = await sanityOr<Insight[]>(insightsQuery, insights);
  return [...data].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const all = await getInsights();
  return all.find((insight) => insight.slug === slug);
}

export async function getLeaders(): Promise<Leader[]> {
  "use cache";
  cacheLife("days");
  cacheTag("leaders");
  return sanityOr<Leader[]>(leadersQuery, leaders);
}

export async function getLeader(slug: string): Promise<Leader | undefined> {
  const all = await getLeaders();
  return all.find((leader) => leader.slug === slug);
}

export async function getJobs(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return sanityOr<Job[]>(jobsQuery, jobs);
}

export async function getJob(slug: string): Promise<Job | undefined> {
  const all = await getJobs();
  return all.find((job) => job.slug === slug);
}

export async function getLegalDocs(): Promise<LegalDoc[]> {
  "use cache";
  cacheLife("max");
  cacheTag("legal");
  return sanityOr<LegalDoc[]>(legalDocsQuery, legalDocs);
}

export async function getLegalDoc(slug: string): Promise<LegalDoc | undefined> {
  const all = await getLegalDocs();
  return all.find((doc) => doc.slug === slug);
}
