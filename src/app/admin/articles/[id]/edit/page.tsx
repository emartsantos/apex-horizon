import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { PageHeader } from "@/components/admin/ui";
import type { RichBlock } from "@/lib/types";
import { ArticleForm } from "../../ArticleForm";

export const metadata: Metadata = { title: "Edit article" };

export default async function EditArticlePage(
  props: PageProps<"/admin/articles/[id]/edit">,
) {
  await requireRole(["ADMIN", "EDITOR"]);
  const { id } = await props.params;

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={article.title}
        description="Update the wellness hub article."
      />
      <ArticleForm
        article={{
          id: article.id,
          slug: article.slug,
          title: article.title,
          category: article.category,
          excerpt: article.excerpt,
          bodyJson: article.bodyJson as RichBlock[],
          authorSlug: article.authorSlug,
          readingMinutes: article.readingMinutes,
          featured: article.featured,
          status: article.status,
        }}
      />
    </div>
  );
}
