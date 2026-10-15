import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { PageHeader } from "@/components/admin/ui";
import { ProviderForm } from "../ProviderForm";

export const metadata: Metadata = { title: "New provider" };

export default async function NewProviderPage() {
  await requireRole(["ADMIN", "EDITOR"]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="New provider"
        description="Create a directory record. Drafts are only visible here until published."
      />
      <ProviderForm />
    </div>
  );
}
