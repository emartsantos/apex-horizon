import { defineQuery } from "next-sanity";

const richBlockFields = `kind, text, attribution, items`;
const metricFields = `value, label, note`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  name, legalName, description, url, email, phone, hq,
  regions, certifications,
  social[]{ label, href },
  nav[]{ label, href, items[]{ label, href, description } },
  footer[]{ title, items[]{ label, href, description } }
}`);

export const servicesQuery = defineQuery(`*[_type == "service"] | order(order asc){
  "slug": slug.current, title, tagline, summary, order,
  capabilities[]{ title, detail },
  outcomes[]{ ${metricFields} },
  detail[]{ ${richBlockFields} }
}`);

export const industriesQuery = defineQuery(`*[_type == "industry"]{
  "slug": slug.current, title, tagline, summary, pressures, approach,
  outcomes[]{ ${metricFields} },
  detail[]{ ${richBlockFields} }
}`);

export const caseStudiesQuery = defineQuery(`*[_type == "caseStudy"]{
  "slug": slug.current, client, sector, industrySlug,
  title, summary, year, services, featured, challenge, approach,
  results[]{ ${metricFields} },
  quote{ text, author, role },
  detail[]{ ${richBlockFields} }
}`);

export const insightsQuery = defineQuery(`*[_type == "insight"] | order(publishedAt desc){
  "slug": slug.current, title, category, excerpt, publishedAt,
  readingMinutes, featured, authorSlug,
  detail[]{ ${richBlockFields} }
}`);

export const leadersQuery = defineQuery(`*[_type == "leader"]{
  "slug": slug.current, name, role, focus, bio
}`);

export const jobsQuery = defineQuery(`*[_type == "job"]{
  "slug": slug.current, title, department, location, type,
  summary, responsibilities, requirements
}`);

export const legalDocsQuery = defineQuery(`*[_type == "legalDoc"]{
  "slug": slug.current, title, updated, summary,
  detail[]{ ${richBlockFields} }
}`);
