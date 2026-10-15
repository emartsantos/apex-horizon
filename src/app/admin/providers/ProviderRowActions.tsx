"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  deleteProvider,
  setProviderStatus,
} from "./actions";

export function ProviderRowActions({
  id,
  slug,
  status,
  canEdit,
  canDelete,
}: {
  id: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  canEdit: boolean;
  canDelete: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <div className="flex items-center justify-end gap-3 font-mono text-[0.6rem] uppercase tracking-label">
      <Link
        href={`/providers/${slug}`}
        target="_blank"
        className="text-fg-subtle hover:text-fg"
      >
        View
      </Link>
      {canEdit ? (
        <>
          <Link
            href={`/admin/providers/${id}/edit`}
            className="text-fg-muted hover:text-fg"
          >
            Edit
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              start(() =>
                setProviderStatus(
                  id,
                  status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                ),
              )
            }
            className="text-accent hover:text-accent-amber disabled:opacity-50"
          >
            {status === "PUBLISHED" ? "Unpublish" : "Publish"}
          </button>
        </>
      ) : null}
      {canDelete ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (
              window.confirm(
                "Delete this provider permanently? This cannot be undone.",
              )
            ) {
              start(() => deleteProvider(id));
            }
          }}
          className="text-red-700 hover:text-red-600 disabled:opacity-50"
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}
