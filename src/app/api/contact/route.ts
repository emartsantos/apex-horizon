import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  interest?: string;
  size?: string;
  message?: string;
  consent?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const required: (keyof Payload)[] = [
    "name",
    "email",
    "company",
    "interest",
    "message",
    "consent",
  ];
  const missing = required.filter((key) => !payload[key]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 422 },
    );
  }

  if (!EMAIL.test(payload.email ?? "")) {
    return NextResponse.json(
      { error: "Please provide a valid work email address." },
      { status: 422 },
    );
  }

  const record = {
    ...payload,
    receivedAt: new Date().toISOString(),
    source: "website:contact",
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      // Do not fail the visitor's submission if CRM forwarding is unavailable.
      console.error("[contact] CRM forward failed");
    }
  } else {
    console.info("[contact] enquiry received", {
      company: record.company,
      interest: record.interest,
    });
  }

  return NextResponse.json({ ok: true });
}
