import "server-only";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

type AuditInput = {
  actorSub: string;
  actorEmail?: string;
  action: string;
  entity: string;
  entityId?: string;
  meta?: Record<string, unknown>;
};

export async function writeAuditEvent(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorSub: input.actorSub,
        actorEmail: input.actorEmail,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        meta: input.meta
          ? (input.meta as Prisma.InputJsonValue)
          : undefined,
      },
    });
  } catch (error) {
    console.error("Failed to write audit event", error);
  }
}

export async function requestContext(): Promise<{
  ip: string | null;
  userAgent: string | null;
}> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  return {
    ip: forwarded ? forwarded.split(",")[0]?.trim() ?? null : null,
    userAgent: store.get("user-agent"),
  };
}
