"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { writeAuditEvent } from "@/lib/audit";
import { providerSchema } from "@/lib/admin/validation";
import type { ActionState } from "@/app/admin/action-state";

function fieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

function normalize(formData: FormData) {
  return {
    id: formData.get("id")?.toString() || undefined,
    slug: formData.get("slug")?.toString() ?? "",
    displayName: formData.get("displayName")?.toString() ?? "",
    credentials: formData.get("credentials")?.toString() ?? "",
    specialty: formData.get("specialty")?.toString() ?? "",
    languages: formData.get("languages")?.toString() ?? "",
    bio: formData.get("bio")?.toString() ?? "",
    photoUrl: formData.get("photoUrl")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    acceptingNew: formData.get("acceptingNew") === "on",
    sortOrder: formData.get("sortOrder")?.toString() ?? "0",
    status: formData.get("status")?.toString() ?? "DRAFT",
  };
}

export async function saveProvider(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const parsed = providerSchema.safeParse(normalize(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: fieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;
  const languages = data.languages
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  const payload = {
    slug: data.slug,
    displayName: data.displayName,
    credentials: data.credentials,
    specialty: data.specialty,
    languages,
    bio: data.bio,
    photoUrl: data.photoUrl ? data.photoUrl : null,
    location: data.location,
    acceptingNew: data.acceptingNew,
    sortOrder: data.sortOrder,
    status: data.status,
  };

  try {
    if (data.id) {
      const before = await prisma.provider.findUnique({
        where: { id: data.id },
      });
      if (!before) {
        return { ok: false, message: "Provider not found." };
      }
      await prisma.provider.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.provider.create({ data: payload });
    }
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "That slug is already in use."
        : "Could not save the provider. Please try again.";
    return { ok: false, message };
  }

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: data.id ? "provider.update" : "provider.create",
    entity: "Provider",
    entityId: data.slug,
    meta: { slug: data.slug, status: data.status },
  });

  revalidateTag("providers", "max");
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
  redirect("/admin/providers?saved=1");
}

export async function setProviderStatus(
  id: string,
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
): Promise<void> {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const provider = await prisma.provider.update({
    where: { id },
    data: { status },
  });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: `provider.${status.toLowerCase()}`,
    entity: "Provider",
    entityId: provider.slug,
  });

  revalidateTag("providers", "max");
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
}

export async function deleteProvider(id: string): Promise<void> {
  const session = await requireRole(["ADMIN"]);
  const provider = await prisma.provider.delete({ where: { id } });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: "provider.delete",
    entity: "Provider",
    entityId: provider.slug,
  });

  revalidateTag("providers", "max");
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
}
