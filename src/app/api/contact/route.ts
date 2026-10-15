import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { prisma, isDatabaseConfigured } from "@/lib/db/prisma";
import { requestContext } from "@/lib/audit";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please provide a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  reason: z.string().trim().min(1, "Please tell us how we can help.").max(120),
  insurance: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(4000),
  consent: z.literal("on", {
    message: "Please agree to the Privacy Notice.",
  }),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.REVALIDATE_SECRET ?? "lumina";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex").slice(0, 32);
}

async function sendNotification(fields: {
  name: string;
  email: string;
  phone?: string;
  state?: string;
  reason: string;
  insurance?: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL ?? "Lumina Website <onboarding@resend.dev>";

  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.phone ? `Phone: ${fields.phone}` : null,
    fields.state ? `State: ${fields.state}` : null,
    `Reason: ${fields.reason}`,
    fields.insurance ? `Payment: ${fields.insurance}` : null,
    "",
    "Message:",
    fields.message,
  ].filter(Boolean);

  await resend.emails.send({
    from,
    to,
    replyTo: fields.email,
    subject: `New website enquiry — ${fields.reason}`,
    text: lines.join("\n"),
  });
}

export async function POST(request: Request) {
  const { ip, userAgent } = await requestContext();

  if (rateLimited(ip ?? "unknown")) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (isDatabaseConfigured()) {
    try {
      await prisma.contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.reason,
          message: [data.phone && `Phone: ${data.phone}`, data.state && `State: ${data.state}`, data.insurance && `Payment: ${data.insurance}`, data.message]
            .filter(Boolean)
            .join("\n\n"),
          ipHash: hashIp(ip),
          userAgent: userAgent ?? null,
        },
      });
    } catch (error) {
      console.error("[contact] failed to persist submission", error);
    }
  }

  try {
    await sendNotification({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      state: data.state || undefined,
      reason: data.reason,
      insurance: data.insurance || undefined,
      message: data.message,
    });
  } catch (error) {
    console.error("[contact] failed to send notification", error);
  }

  return NextResponse.json({ ok: true });
}
