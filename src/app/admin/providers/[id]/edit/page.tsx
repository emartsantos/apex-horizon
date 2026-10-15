import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/session";
import { PageHeader } from "@/components/admin/ui";
import { ProviderForm } from "../../ProviderForm";

export const metadata: Metadata = { title: "Edit provider" };

export default async function EditProviderPage(
  props: PageProps<"/admin/providers/[id]/edit">,
) {
  await requireRole(["ADMIN", "EDITOR"]);
  const { id } = await props.params;

  const provider = await prisma.provider.findUnique({ where: { id } });
  if (!provider) notFound();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={provider.displayName}
        description="Update the public directory record."
      />
      <ProviderForm
        provider={{
          id: provider.id,
          slug: provider.slug,
          displayName: provider.displayName,
          credentials: provider.credentials,
          specialty: provider.specialty,
          languages: provider.languages,
          bio: provider.bio,
          photoUrl: provider.photoUrl,
          location: provider.location,
          acceptingNew: provider.acceptingNew,
          sortOrder: provider.sortOrder,
          status: provider.status,
        }}
      />
    </div>
  );
}
