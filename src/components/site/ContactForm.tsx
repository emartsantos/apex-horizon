"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const reasons = [
  "Find a clinician",
  "Primary & preventive care",
  "Mental health",
  "Chronic condition support",
  "Women's health",
  "Something else",
];

const insurers = [
  "Paying out of pocket",
  "Using insurance",
  "Not sure yet",
];

const fieldClass =
  "h-11 w-full rounded-none border border-control bg-ink-raised px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError(null);
    track("visit_request", { reason: String(data.reason ?? "") });

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
        className="flex flex-col gap-4 border border-line-strong bg-ink-raised p-8"
      >
        <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent">
          Request received
        </p>
        <h3 className="font-display text-2xl leading-tight text-fg">
          Thank you — a care coordinator will reach out within one business day.
        </h3>
        <p className="text-sm leading-relaxed text-fg-muted">
          We&rsquo;ll help you find the right clinician and get your first virtual
          visit on the calendar. If this is an emergency, call 911 or go to the
          nearest emergency department.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate={false}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jordan@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(555) 012-3456"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="state"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            State you live in
          </label>
          <input
            id="state"
            name="state"
            autoComplete="address-level1"
            className={fieldClass}
            placeholder="California"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reason"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            How can we help?
          </label>
          <select
            id="reason"
            name="reason"
            required
            defaultValue=""
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {reasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="insurance"
            className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
          >
            Payment preference
          </label>
          <select
            id="insurance"
            name="insurance"
            defaultValue=""
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {insurers.map((item) => (
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
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn(fieldClass, "h-auto py-3 leading-relaxed")}
          placeholder="Please do not include medical or personal health information."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded-none border border-control bg-ink-raised accent-accent"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-fg-muted">
          I agree that Lumina Health &amp; Wellness may contact me about this
          request, in line with the{" "}
          <Link
            href="/legal/privacy"
            className="text-fg underline underline-offset-2"
          >
            Privacy Notice
          </Link>
          . I understand this form is not for medical information.
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
          {status === "submitting" ? "Sending…" : "Start a visit"}
        </Button>
        <p
          role="alert"
          aria-live="polite"
          className={cn(
            "min-h-5 font-mono text-[0.66rem] uppercase tracking-label",
            status === "error" ? "text-red-700" : "text-transparent",
          )}
        >
          {error ?? "\u00A0"}
        </p>
      </div>
    </form>
  );
}
