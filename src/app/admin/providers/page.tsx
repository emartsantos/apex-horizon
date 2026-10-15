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
import { ProviderRowActions } from "./ProviderRowActions";

export const metadata: Metadata = { title: "Providers" };

const statusTone = {
  PUBLISHED: "accent",
  DRAFT: "amber",
  ARCHIVED: "neutral",
} as const;

export default async function ProvidersPage({
  searchParams,
}: PageProps<"/admin/providers">) {
  const session = await requireRole(["ADMIN", "EDITOR", "VIEWER"]);
  const params = await searchParams;

  const q = typeof params.q === "string" ? params.q.trim() : "";
  const status = typeof params.status === "string" ? params.status : "";

  const providers = await prisma.provider.findMany({
    where: {
      ...(status
        ? { status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" }
        : {}),
      ...(q
        ? {
            OR: [
              { displayName: { contains: q, mode: "insensitive" } },
              { specialty: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { sortOrder: "asc" },
  });

  const canEdit = session.role === "ADMIN" || session.role === "EDITOR";

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Provider directory"
        description="Clinicians shown on the public directory. Only publish public professional details — never private contact information or patient data."
        actions={
          canEdit ? (
            <LinkButton href="/admin/providers/new">New provider</LinkButton>
          ) : null
        }
      />

      <form className="flex flex-wrap items-end gap-3" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or specialty"
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
            href="/admin/providers"
            className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle hover:text-fg"
          >
            Reset
          </Link>
        ) : null}
      </form>

      <Panel title={`${providers.length} provider${providers.length === 1 ? "" : "s"}`}>
        {providers.length === 0 ? (
          <EmptyState
            title="No providers found"
            description={
              q || status
                ? "No providers match these filters."
                : "Add your first clinician to populate the public directory."
            }
            action={
              canEdit ? (
                <LinkButton href="/admin/providers/new">
                  New provider
                </LinkButton>
              ) : null
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left font-mono text-[0.58rem] uppercase tracking-label text-fg-subtle">
                  <th className="px-5 py-3 font-normal">Name</th>
                  <th className="px-5 py-3 font-normal">Specialty</th>
                  <th className="px-5 py-3 font-normal">Location</th>
                  <th className="px-5 py-3 font-normal">Status</th>
                  <th className="px-5 py-3 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr
                    key={provider.id}
                    className="border-b border-line/70 last:border-0 hover:bg-ink-2"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/providers/${provider.id}/edit`}
                        className="text-fg hover:text-accent"
                      >
                        {provider.displayName}
                      </Link>
                      <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                        {provider.credentials}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-fg-muted">
                      {provider.specialty}
                    </td>
                    <td className="px-5 py-3 text-fg-subtle">
                      {provider.location}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[provider.status]}>
                        {provider.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <ProviderRowActions
                        id={provider.id}
                        slug={provider.slug}
                        status={provider.status}
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
