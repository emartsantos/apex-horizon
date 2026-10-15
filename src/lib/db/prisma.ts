import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    return Reflect.get(getClient(), property, receiver);
  },
});

function looksLikePlaceholder(url: string): boolean {
  return (
    url.includes("user:password@") ||
    url.includes("johndoe") ||
    url.includes("host/db")
  );
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url || looksLikePlaceholder(url)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "postgresql:" || parsed.protocol === "postgres:";
  } catch {
    return false;
  }
}
