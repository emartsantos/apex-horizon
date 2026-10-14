import type { Metadata } from "next";
import { siteSettings } from "@/content/site";

export const SITE_URL = siteSettings.url;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${siteSettings.name}`,
      description,
      url,
      siteName: siteSettings.name,
      type,
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteSettings.name}`,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.name,
    legalName: siteSettings.legalName,
    url: SITE_URL,
    description: siteSettings.description,
    email: siteSettings.email,
    telephone: siteSettings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.hq,
      addressCountry: "SG",
    },
    sameAs: siteSettings.social.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.name,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: siteSettings.name },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: siteSettings.name },
    url: absoluteUrl(path),
    areaServed: "Global",
  };
}

export function jobPostingJsonLd({
  title,
  description,
  datePosted,
  location,
}: {
  title: string;
  description: string;
  datePosted: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    employmentType: "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: siteSettings.name },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: location },
    },
  };
}
