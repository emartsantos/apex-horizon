import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { EmptyState, PageHeader, Panel } from "@/components/admin/ui";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Contact enquiries" };

export default async function SubmissionsPage() {
  await requireRole(["ADMIN"]);

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Contact enquiries"
        description="Messages submitted through the public contact form. Visitors are asked not to include medical information."
      />

      <Panel
        title={`${submissions.length} entr${submissions.length === 1 ? "y" : "ies"}`}
      >
        {submissions.length === 0 ? (
          <EmptyState
            title="No enquiries yet"
            description="Submissions from the public contact form will appear here."
          />
        ) : (
          <ul className="divide-y divide-line/70">
            {submissions.map((item) => (
              <li key={item.id} className="flex flex-col gap-3 px-5 py-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm text-fg">{item.name}</span>
                    <a
                      href={`mailto:${item.email}`}
                      className="font-mono text-[0.62rem] text-accent hover:text-accent-amber"
                    >
                      {item.email}
                    </a>
                    {item.company ? (
                      <span className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                        {item.company}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-mono text-[0.6rem] text-fg-subtle">
                    {formatDateTime(item.createdAt)}
                  </span>
                </div>
                {item.subject ? (
                  <p className="font-mono text-[0.62rem] uppercase tracking-label text-fg-muted">
                    {item.subject}
                  </p>
                ) : null}
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg-muted">
                  {item.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
