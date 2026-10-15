"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, inputClass, textareaClass } from "@/components/admin/ui";
import { saveArticle } from "./actions";
import { initialActionState } from "@/app/admin/action-state";
import type { RichBlock } from "@/lib/types";

type ArticleValue = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  bodyJson: RichBlock[];
  authorSlug: string | null;
  readingMinutes: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

const empty: ArticleValue = {
  slug: "",
  title: "",
  category: "Prevention",
  excerpt: "",
  bodyJson: [],
  authorSlug: "",
  readingMinutes: 5,
  featured: false,
  status: "DRAFT",
};

function blocksToText(blocks: RichBlock[]): string {
  return blocks
    .map((block) => {
      if (block.kind === "h2") return `## ${block.text}`;
      if (block.kind === "list") return block.items.map((i) => `- ${i}`).join("\n");
      if (block.kind === "quote") return `> ${block.text}`;
      return block.text;
    })
    .join("\n\n");
}

const submitClass =
  "inline-flex h-10 items-center justify-center rounded-xs bg-paper px-5 font-mono text-[0.66rem] uppercase tracking-label text-ink transition-colors hover:bg-accent disabled:opacity-50";

const categories = [
  "Prevention",
  "Mental health",
  "Nutrition",
  "Sleep",
  "Heart health",
  "Family care",
];

export function ArticleForm({ article }: { article?: Partial<ArticleValue> }) {
  const value = { ...empty, ...article };
  const [state, formAction, pending] = useActionState(
    saveArticle,
    initialActionState,
  );

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {value.id ? <input type="hidden" name="id" value={value.id} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" error={state.errors?.title}>
          <input
            id="title"
            name="title"
            defaultValue={value.title}
            className={inputClass}
            placeholder="How to build a sleep routine that lasts"
          />
        </Field>
        <Field label="Slug" htmlFor="slug" error={state.errors?.slug}>
          <input
            id="slug"
            name="slug"
            defaultValue={value.slug}
            className={inputClass}
            placeholder="sleep-routine-that-lasts"
          />
        </Field>
        <Field label="Category" htmlFor="category" error={state.errors?.category}>
          <select
            id="category"
            name="category"
            defaultValue={value.category}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Author slug"
          htmlFor="authorSlug"
          hint="Optional provider slug"
          error={state.errors?.authorSlug}
        >
          <input
            id="authorSlug"
            name="authorSlug"
            defaultValue={value.authorSlug ?? ""}
            className={inputClass}
            placeholder="dr-lena-okafor"
          />
        </Field>
        <Field
          label="Reading minutes"
          htmlFor="readingMinutes"
          error={state.errors?.readingMinutes}
        >
          <input
            id="readingMinutes"
            name="readingMinutes"
            type="number"
            min={1}
            defaultValue={value.readingMinutes}
            className={inputClass}
          />
        </Field>
        <Field label="Status" htmlFor="status" error={state.errors?.status}>
          <select
            id="status"
            name="status"
            defaultValue={value.status}
            className={inputClass}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </div>

      <Field label="Excerpt" htmlFor="excerpt" error={state.errors?.excerpt}>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={value.excerpt}
          className={textareaClass}
          placeholder="A short summary shown in listings."
        />
      </Field>

      <Field
        label="Body"
        htmlFor="body"
        hint="Blank line between blocks. Start a line with ## for a heading, - for list items, > for a quote."
        error={state.errors?.body}
      >
        <textarea
          id="body"
          name="body"
          rows={16}
          defaultValue={blocksToText(value.bodyJson)}
          className={textareaClass}
          placeholder={"## Section heading\n\nA paragraph of general wellness information…"}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm text-fg-muted">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={value.featured}
          className="h-4 w-4 rounded-xs border border-control bg-ink-raised accent-accent"
        />
        Feature on the wellness hub
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className={submitClass}>
          {pending ? "Saving…" : value.id ? "Save changes" : "Create article"}
        </button>
        <Link
          href="/admin/articles"
          className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
        {state.message ? (
          <p
            role="alert"
            className="font-mono text-[0.62rem] uppercase tracking-label text-red-700"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
