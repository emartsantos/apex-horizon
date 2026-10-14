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

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  cacheTag("site-settings");
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
  return [...services].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("services");
  return services.find((service) => service.slug === slug);
}

export async function getIndustries(): Promise<Industry[]> {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return industries;
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return industries.find((industry) => industry.slug === slug);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  "use cache";
  cacheLife("days");
  cacheTag("case-studies");
  return caseStudies;
}

export async function getCaseStudy(
  slug: string,
): Promise<CaseStudy | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("case-studies");
  return caseStudies.find((study) => study.slug === slug);
}

export async function getInsights(): Promise<Insight[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("insights");
  return [...insights].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("insights");
  return insights.find((insight) => insight.slug === slug);
}

export async function getLeaders(): Promise<Leader[]> {
  "use cache";
  cacheLife("days");
  cacheTag("leaders");
  return leaders;
}

export async function getLeader(slug: string): Promise<Leader | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("leaders");
  return leaders.find((leader) => leader.slug === slug);
}

export async function getJobs(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return jobs;
}

export async function getJob(slug: string): Promise<Job | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return jobs.find((job) => job.slug === slug);
}

export async function getLegalDocs(): Promise<LegalDoc[]> {
  "use cache";
  cacheLife("max");
  cacheTag("legal");
  return legalDocs;
}

export async function getLegalDoc(slug: string): Promise<LegalDoc | undefined> {
  "use cache";
  cacheLife("max");
  cacheTag("legal");
  return legalDocs.find((doc) => doc.slug === slug);
}
