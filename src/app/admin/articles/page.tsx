import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import {
  Badge,
  EmptyState,
  LinkButton,
  PageHeader,
  Panel,
} from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";
import { ArticleRowActions } from "./ArticleRowActions";

export const metadata: Metadata = { title: "Wellness hub" };

const statusTone = {
  PUBLISHED: "accent",
  DRAFT: "amber",
  ARCHIVED: "neutral",
} as const;

export default async function ArticlesPage(
  props: PageProps<"/admin/articles">,
) {
  const session = await requireRole(["ADMIN", "EDITOR", "VIEWER"]);
  const params = await props.searchParams;

  const q = typeof params.q === "string" ? params.q.trim() : "";
  const status = typeof params.status === "string" ? params.status : "";

  const articles = await prisma.article.findMany({
    where: {
      ...(status
        ? { status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
        : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { category: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });

  const canEdit = session.role === "ADMIN" || session.role === "EDITOR";

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Wellness hub"
        description="Educational articles shown on the public wellness hub. General wellness content only — no medical advice or patient information."
        actions={
          canEdit ? (
            <LinkButton href="/admin/articles/new">New article</LinkButton>
          ) : null
        }
      />

      <form className="flex flex-wrap items-end gap-3" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search title or category"
          className="h-10 w-64 rounded-xs border border-control bg-ink-raised px-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-10 rounded-xs border border-control bg-ink-raised px-3 text-sm text-fg focus:border-accent focus:outline-none"
        >
          <option value="">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-xs border border-line-strong px-4 font-mono text-[0.66rem] uppercase tracking-label text-fg-muted hover:text-fg"
        >
          Filter
        </button>
        {q || status ? (
          <Link
            href="/admin/articles"
            className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle hover:text-fg"
          >
            Reset
          </Link>
        ) : null}
      </form>

      <Panel
        title={`${articles.length} article${articles.length === 1 ? "" : "s"}`}
      >
        {articles.length === 0 ? (
          <EmptyState
            title="No articles found"
            description={
              q || status
                ? "No articles match these filters."
                : "Write your first wellness article to populate the hub."
            }
            action={
              canEdit ? (
                <LinkButton href="/admin/articles/new">
                  New article
                </LinkButton>
              ) : null
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left font-mono text-[0.58rem] uppercase tracking-label text-fg-subtle">
                  <th className="px-5 py-3 font-normal">Title</th>
                  <th className="px-5 py-3 font-normal">Category</th>
                  <th className="px-5 py-3 font-normal">Updated</th>
                  <th className="px-5 py-3 font-normal">Status</th>
                  <th className="px-5 py-3 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-line/70 last:border-0 hover:bg-ink-2"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-fg hover:text-accent"
                      >
                        {article.title}
                      </Link>
                      {article.featured ? (
                        <span className="ml-2 font-mono text-[0.55rem] uppercase tracking-label text-accent-amber">
                          featured
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 text-fg-muted">
                      {article.category}
                    </td>
                    <td className="px-5 py-3 text-fg-subtle">
                      {formatDate(article.updatedAt.toISOString())}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[article.status]}>
                        {article.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <ArticleRowActions
                        id={article.id}
                        slug={article.slug}
                        status={article.status}
                        canEdit={canEdit}
                        canDelete={session.role === "ADMIN"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
