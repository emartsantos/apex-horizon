import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { PageHeader } from "@/components/admin/ui";
import { ArticleForm } from "../ArticleForm";

export const metadata: Metadata = { title: "New article" };

export default async function NewArticlePage() {
  await requireRole(["ADMIN", "EDITOR"]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="New article"
        description="Drafts stay private until published to the wellness hub."
      />
      <ArticleForm />
    </div>
  );
}
