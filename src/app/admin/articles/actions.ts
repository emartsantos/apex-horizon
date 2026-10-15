"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { writeAuditEvent } from "@/lib/audit";
import { articleSchema, parseBodyBlocks } from "@/lib/admin/validation";
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

function normalize(formData: FormData): Record<string, unknown> {
  return {
    id: formData.get("id")?.toString() || undefined,
    slug: formData.get("slug")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    excerpt: formData.get("excerpt")?.toString() ?? "",
    body: formData.get("body")?.toString() ?? "",
    authorSlug: formData.get("authorSlug")?.toString() ?? "",
    readingMinutes: formData.get("readingMinutes")?.toString() ?? "5",
    featured: formData.get("featured") === "on",
    status: formData.get("status")?.toString() ?? "DRAFT",
  };
}

export async function saveArticle(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const parsed = articleSchema.safeParse(normalize(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: fieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;
  const bodyJson = parseBodyBlocks(data.body);
  const now = new Date();

  const payload = {
    slug: data.slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    bodyJson,
    authorSlug: data.authorSlug || null,
    readingMinutes: data.readingMinutes,
    featured: data.featured,
    status: data.status,
    authorId: session.userId,
  };

  try {
    if (data.id) {
      const before = await prisma.article.findUnique({ where: { id: data.id } });
      if (!before) return { ok: false, message: "Article not found." };
      await prisma.article.update({
        where: { id: data.id },
        data: {
          ...payload,
          publishedAt:
            data.status === "PUBLISHED"
              ? before.publishedAt ?? now
              : before.publishedAt,
        },
      });
    } else {
      await prisma.article.create({
        data: {
          ...payload,
          publishedAt: data.status === "PUBLISHED" ? now : null,
        },
      });
    }
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "That slug is already in use."
        : "Could not save the article. Please try again.";
    return { ok: false, message };
  }

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: data.id ? "article.update" : "article.create",
    entity: "Article",
    entityId: data.slug,
    meta: { slug: data.slug, status: data.status },
  });

  revalidateTag("insights", "max");
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
  redirect("/admin/articles?saved=1");
}

export async function setArticleStatus(
  id: string,
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
): Promise<void> {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.article.update({
    where: { id },
    data: {
      status,
      publishedAt:
        status === "PUBLISHED"
          ? existing.publishedAt ?? new Date()
          : existing.publishedAt,
    },
  });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: `article.${status.toLowerCase()}`,
    entity: "Article",
    entityId: existing.slug,
  });

  revalidateTag("insights", "max");
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
}

export async function deleteArticle(id: string): Promise<void> {
  const session = await requireRole(["ADMIN"]);
  const article = await prisma.article.delete({ where: { id } });

  await writeAuditEvent({
    actorSub: session.sub,
    actorEmail: session.email,
    action: "article.delete",
    entity: "Article",
    entityId: article.slug,
  });

  revalidateTag("insights", "max");
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
}
