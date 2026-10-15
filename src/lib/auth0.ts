import { Auth0Client } from "@auth0/nextjs-auth0/server";

export function isAuth0Configured(): boolean {
  return Boolean(
    process.env.AUTH0_DOMAIN &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_CLIENT_SECRET &&
      process.env.AUTH0_SECRET,
  );
}

let client: Auth0Client | undefined;

export function getAuth0(): Auth0Client {
  if (!isAuth0Configured()) {
    throw new Error(
      "Auth0 is not configured. Set AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and AUTH0_SECRET.",
    );
  }

  client ??= new Auth0Client({
    signInReturnToPath: "/admin",
    enableParallelTransactions: false,
    session: {
      rolling: true,
      absoluteDuration: 60 * 60 * 8,
      inactivityDuration: 60 * 60,
    },
  });

  return client;
}
