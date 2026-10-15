import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { isAuth0Configured } from "@/lib/auth0";
import { isDatabaseConfigured } from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "Admin setup",
  robots: { index: false, follow: false },
};

const steps = [
  {
    key: "database",
    title: "1. Connect PostgreSQL",
    body: "Set DATABASE_URL (pooled) and DIRECT_URL (unpooled) to a Postgres database, then run npm run db:migrate and npm run db:seed.",
    env: ["DATABASE_URL", "DIRECT_URL"],
  },
  {
    key: "auth0",
    title: "2. Connect Auth0",
    body: "Create a Regular Web Application in Auth0. Set the callback to /auth/callback and logout to /auth/logout. Add the values below.",
    env: [
      "AUTH0_DOMAIN",
      "AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET",
      "AUTH0_SECRET",
      "APP_BASE_URL",
    ],
  },
  {
    key: "admin",
    title: "3. Grant the first administrator",
    body: "After signing in once, set your Auth0 subject as BOOTSTRAP_ADMIN_SUB and run npm run db:seed to create your ADMIN record.",
    env: ["BOOTSTRAP_ADMIN_EMAIL", "BOOTSTRAP_ADMIN_AUTH0_SUB"],
  },
];

export default function SetupPage() {
  const db = isDatabaseConfigured();
  const auth0 = isAuth0Configured();

  return (
    <Container className="py-24">
      <p className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
        Administration
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-tight tracking-tight text-fg">
        Finish connecting the Lumina admin platform.
      </h1>
      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-fg-muted">
        The public website is live. The administration dashboard needs a database
        and an identity provider before staff can sign in.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <StatusPill label="PostgreSQL" ok={db} />
        <StatusPill label="Auth0" ok={auth0} />
      </div>

      <ol className="mt-12 flex flex-col divide-y divide-line border-y border-line">
        {steps.map((step) => (
          <li key={step.key} className="grid gap-4 py-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-xl font-light text-fg">
              {step.title}
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-fg-muted">{step.body}</p>
              <ul className="flex flex-wrap gap-2">
                {step.env.map((name) => (
                  <li
                    key={name}
                    className="rounded-xs border border-line-strong px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="rounded-none bg-paper px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-label text-ink transition-colors hover:bg-accent"
        >
          Retry admin
        </Link>
        <Link
          href="/"
          className="rounded-none border border-line-strong px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-label text-fg-muted transition-colors hover:border-fg hover:text-fg"
        >
          Back to website
        </Link>
      </div>
    </Container>
  );
}

function StatusPill({ label, ok }: { label: string; ok: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-none border border-line-strong px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-label text-fg-muted">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 ${ok ? "bg-accent-moss" : "bg-accent-amber"}`}
      />
      {label} {ok ? "connected" : "not configured"}
    </span>
  );
}
