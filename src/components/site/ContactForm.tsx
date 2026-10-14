"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const interests = [
  "Enterprise AI",
  "Zero-trust security",
  "Compliance & governance",
  "Cloud platform",
  "Not sure yet",
];

const sizes = ["1–200", "201–1,000", "1,001–5,000", "5,000+"];

const fieldClass =
  "h-11 w-full rounded-xs border border-line-strong bg-ink px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent-amber focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError(null);
    track("demo_request", { interest: String(data.interest ?? "") });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(payload.error ?? "Something went wrong.");
      }
      setStatus("success");
      track("form_submit", { ok: true });
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      track("form_submit", { ok: false });
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col gap-4 rounded-sm border border-line-strong bg-ink-raised p-8"
      >
        <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
          Request received
        </p>
        <h3 className="font-display text-2xl font-light tracking-tight text-fg">
          Thank you — we’ll be in touch within one business day.
        </h3>
        <p className="text-sm leading-relaxed text-fg-muted">
          A member of our platform team will reach out to schedule a working
          session. For urgent matters, email enterprise@apexhorizon.com.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Jordan Lee"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jordan@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            className={fieldClass}
            placeholder="Company Inc."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="role"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Role
          </label>
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            className={fieldClass}
            placeholder="VP Engineering"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="interest"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Primary interest
          </label>
          <select
            id="interest"
            name="interest"
            required
            defaultValue=""
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="" disabled>
              Select a focus area
            </option>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="size"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Employees
          </label>
          <select
            id="size"
            name="size"
            defaultValue=""
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="" disabled>
              Select a range
            </option>
            {sizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
        >
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn(fieldClass, "h-auto py-3 leading-relaxed")}
          placeholder="Describe your workload, constraints, and timeline."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded-xs border border-line-strong bg-ink accent-[#e8623c]"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-fg-muted">
          I agree that Apex Horizon may process my details to respond to this
          enquiry, in line with the{" "}
          <Link
            href="/legal/privacy"
            className="text-fg underline underline-offset-2"
          >
            Privacy Notice
          </Link>
          .
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          arrow
          disabled={status === "submitting"}
          className="w-fit"
        >
          {status === "submitting" ? "Sending…" : "Book a demo"}
        </Button>
        <p
          role="alert"
          aria-live="polite"
          className={cn(
            "min-h-5 font-mono text-[0.66rem] uppercase tracking-label",
            status === "error" ? "text-accent-amber" : "text-transparent",
          )}
        >
          {error ?? "\u00A0"}
        </p>
      </div>
    </form>
  );
}
