import "dotenv/config";
import { PrismaClient, type Role, type PublishStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { providers } from "../src/content/providers";
import { insights } from "../src/content/insights";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function seedAdmin() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim();
  const sub = process.env.BOOTSTRAP_ADMIN_AUTH0_SUB?.trim();
  if (!email || !sub) {
    console.warn(
      "[seed] Skipping admin bootstrap — set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_AUTH0_SUB.",
    );
    return;
  }

  const admin = await prisma.adminUser.upsert({
    where: { auth0Sub: sub },
    update: { email, role: "ADMIN" as Role, active: true },
    create: {
      auth0Sub: sub,
      email,
      name: "Lumina Administrator",
      role: "ADMIN" as Role,
      active: true,
    },
  });
  console.log(`[seed] Administrator ready: ${admin.email}`);
}

async function seedProviders() {
  for (const provider of providers) {
    await prisma.provider.upsert({
      where: { slug: provider.slug },
      update: {
        displayName: provider.displayName,
        credentials: provider.credentials,
        specialty: provider.specialty,
        languages: provider.languages,
        bio: provider.bio,
        photoUrl: provider.photoUrl ?? null,
        location: provider.location,
        acceptingNew: provider.acceptingNew,
        sortOrder: provider.order,
        status: "PUBLISHED" as PublishStatus,
      },
      create: {
        slug: provider.slug,
        displayName: provider.displayName,
        credentials: provider.credentials,
        specialty: provider.specialty,
        languages: provider.languages,
        bio: provider.bio,
        photoUrl: provider.photoUrl ?? null,
        location: provider.location,
        acceptingNew: provider.acceptingNew,
        sortOrder: provider.order,
        status: "PUBLISHED" as PublishStatus,
      },
    });
  }
  console.log(`[seed] Providers seeded: ${providers.length}`);
}

async function seedArticles() {
  for (const insight of insights) {
    await prisma.article.upsert({
      where: { slug: insight.slug },
      update: {
        title: insight.title,
        category: insight.category,
        excerpt: insight.excerpt,
        bodyJson: insight.detail,
        authorSlug: insight.authorSlug || null,
        readingMinutes: insight.readingMinutes,
        featured: insight.featured,
        status: "PUBLISHED" as PublishStatus,
        publishedAt: new Date(insight.publishedAt),
      },
      create: {
        slug: insight.slug,
        title: insight.title,
        category: insight.category,
        excerpt: insight.excerpt,
        bodyJson: insight.detail,
        authorSlug: insight.authorSlug || null,
        readingMinutes: insight.readingMinutes,
        featured: insight.featured,
        status: "PUBLISHED" as PublishStatus,
        publishedAt: new Date(insight.publishedAt),
      },
    });
  }
  console.log(`[seed] Articles seeded: ${insights.length}`);
}

async function main() {
  await seedAdmin();
  await seedProviders();
  await seedArticles();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("[seed] failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
