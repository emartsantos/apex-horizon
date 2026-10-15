"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { writeAuditEvent } from "@/lib/audit";

const roleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);

export async function updateUserRole(
  id: string,
  role: "ADMIN" | "EDITOR" | "VIEWER",
): Promise<void> {
  const session = await requireRole(["ADMIN"]);
  const parsed = roleEnum.safeParse(role);
  if (!parsed.success) return;

  if (id === session.userId && parsed.data !== "ADMIN") {
    return;
  }

  const user = await prisma.adminUser.update({
    where: { id },
    data: { role: parsed.data },
  });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: "admin.role_update",
    entity: "AdminUser",
    entityId: user.email,
    meta: { role: parsed.data },
  });

  revalidatePath("/admin/users");
}

export async function setUserActive(
  id: string,
  active: boolean,
): Promise<void> {
  const session = await requireRole(["ADMIN"]);

  if (id === session.userId) return;

  const user = await prisma.adminUser.update({
    where: { id },
    data: { active },
  });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: active ? "admin.activate" : "admin.deactivate",
    entity: "AdminUser",
    entityId: user.email,
  });

  revalidatePath("/admin/users");
}
