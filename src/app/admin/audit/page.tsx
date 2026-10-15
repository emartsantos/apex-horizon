import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { EmptyState, PageHeader, Panel } from "@/components/admin/ui";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Audit log" };

export default async function AuditPage() {
  await requireRole(["ADMIN"]);

  const events = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Audit log"
        description="Immutable record of content and administrative actions across the platform."
      />

      <Panel title={`${events.length} event${events.length === 1 ? "" : "s"}`}>
        {events.length === 0 ? (
          <EmptyState title="No events recorded" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left font-mono text-[0.58rem] uppercase tracking-label text-fg-subtle">
                  <th className="px-5 py-3 font-normal">When</th>
                  <th className="px-5 py-3 font-normal">Actor</th>
                  <th className="px-5 py-3 font-normal">Action</th>
                  <th className="px-5 py-3 font-normal">Entity</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-line/70 last:border-0">
                    <td className="whitespace-nowrap px-5 py-3 text-fg-subtle">
                      {formatDateTime(event.createdAt)}
                    </td>
                    <td className="px-5 py-3 text-fg-muted">
                      {event.actorEmail ?? event.actorSub}
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-[0.62rem] uppercase tracking-label text-fg">
                        {event.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-fg-subtle">
                      {event.entity}
                      {event.entityId ? `/${event.entityId}` : ""}
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
