import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { Badge, PageHeader, Panel } from "@/components/admin/ui";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const session = await requireAdmin();

  const [providers, publishedProviders, articles, publishedArticles, submissions, recentAudit] =
    await Promise.all([
      prisma.provider.count(),
      prisma.provider.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.contactSubmission.count(),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    ]);

  const tiles = [
    {
      label: "Providers",
      value: providers,
      detail: `${publishedProviders} published`,
      href: "/admin/providers",
    },
    {
      label: "Wellness articles",
      value: articles,
      detail: `${publishedArticles} published`,
      href: "/admin/articles",
    },
    {
      label: "Contact enquiries",
      value: submissions,
      detail: session.role === "ADMIN" ? "View inbox" : "Admin only",
      href: session.role === "ADMIN" ? "/admin/submissions" : undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Welcome, ${session.name}`}
        description="Content, directory, and operations for the Lumina public website."
        actions={<Badge tone="accent">{session.role}</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => {
          const body = (
            <>
              <p className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                {tile.label}
              </p>
              <p className="mt-3 font-display text-4xl font-light text-fg">
                {tile.value}
              </p>
              <p className="mt-1 text-xs text-fg-muted">{tile.detail}</p>
            </>
          );
          const className =
            "flex flex-col rounded-sm border border-line bg-ink-raised/60 px-5 py-5 transition-colors" +
            (tile.href ? " hover:border-line-strong" : "");
          return tile.href ? (
            <Link key={tile.label} href={tile.href} className={className}>
              {body}
            </Link>
          ) : (
            <div key={tile.label} className={className}>
              {body}
            </div>
          );
        })}
      </div>

      <Panel
        title="Recent activity"
        actions={
          session.role === "ADMIN" ? (
            <Link
              href="/admin/audit"
              className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle hover:text-fg"
            >
              Full log
            </Link>
          ) : null
        }
      >
        {recentAudit.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-fg-muted">
            No activity recorded yet.
          </p>
        ) : (
          <ul className="divide-y divide-line/70">
            {recentAudit.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
              >
                <div className="flex flex-col">
                  <span className="text-fg">{event.action}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                    {event.actorEmail ?? event.actorSub} · {event.entity}
                    {event.entityId ? `/${event.entityId}` : ""}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[0.6rem] text-fg-subtle">
                  {formatDateTime(event.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
