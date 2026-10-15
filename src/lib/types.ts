export type NavItem = { label: string; href: string; description?: string };

export type NavGroup = { label: string; href: string; items?: NavItem[] };

export type Metric = { value: string; label: string; note?: string };

export type Capability = { title: string; detail: string };

export type RichBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "list"; items: string[] };

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  order: number;
  capabilities: Capability[];
  outcomes: Metric[];
  detail: RichBlock[];
};

export type Specialty = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  pressures: string[];
  approach: string[];
  outcomes: Metric[];
  detail: RichBlock[];
};

export type Story = {
  slug: string;
  client: string;
  sector: string;
  specialtySlug: string;
  title: string;
  summary: string;
  year: string;
  services: string[];
  featured: boolean;
  challenge: string;
  approach: string[];
  results: Metric[];
  quote: { text: string; author: string; role: string };
  detail: RichBlock[];
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
  authorSlug: string;
  detail: RichBlock[];
};

export type Provider = {
  slug: string;
  displayName: string;
  credentials: string;
  specialty: string;
  languages: string[];
  bio: string;
  photoUrl?: string;
  location: string;
  acceptingNew: boolean;
  order: number;
};

export type Role = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  postedAt: string;
  responsibilities: string[];
  requirements: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  summary: string;
  detail: RichBlock[];
};

export type SiteSettings = {
  name: string;
  legalName: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  hq: string;
  regions: string[];
  social: { label: string; href: string }[];
  nav: NavGroup[];
  footer: { title: string; items: NavItem[] }[];
  certifications: string[];
};
