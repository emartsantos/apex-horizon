"use client";

import { useTransition } from "react";
import { setUserActive, updateUserRole } from "./actions";
import type { AdminRole } from "@/lib/auth/session";

export function UserRowActions({
  id,
  role,
  active,
  isSelf,
}: {
  id: string;
  role: AdminRole;
  active: boolean;
  isSelf: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <div className="flex items-center justify-end gap-3">
      <select
        value={role}
        disabled={pending || isSelf}
        onChange={(event) =>
          start(() =>
            updateUserRole(id, event.target.value as AdminRole),
          )
        }
        className="h-8 rounded-xs border border-control bg-ink-raised px-2 font-mono text-[0.6rem] uppercase tracking-label text-fg disabled:opacity-40"
      >
        <option value="ADMIN">Admin</option>
        <option value="EDITOR">Editor</option>
        <option value="VIEWER">Viewer</option>
      </select>
      <button
        type="button"
        disabled={pending || isSelf}
        onClick={() => start(() => setUserActive(id, !active))}
        className="font-mono text-[0.6rem] uppercase tracking-label text-fg-muted hover:text-fg disabled:opacity-40"
      >
        {active ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}
