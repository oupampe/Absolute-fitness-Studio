"use client";

import { signIn } from "next-auth/react";

/** Google / Facebook sign-in buttons — only rendered when the provider is configured. */
export function OAuthButtons({
  google,
  facebook,
  verb,
  callbackUrl = "/dashboard",
}: {
  google: boolean;
  facebook: boolean;
  verb: "Sign up" | "Log in";
  callbackUrl?: string;
}) {
  if (!google && !facebook) return null;

  return (
    <div className="flex flex-col gap-3">
      {google ? (
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          className="flex w-full items-center justify-center gap-3 rounded-pill border border-border-light bg-transparent px-6 py-3 text-sm font-bold text-text transition hover:border-text hover:bg-surface-2"
        >
          <GoogleIcon />
          {verb} with Google
        </button>
      ) : null}
      {facebook ? (
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl })}
          className="flex w-full items-center justify-center gap-3 rounded-pill border border-border-light bg-transparent px-6 py-3 text-sm font-bold text-text transition hover:border-text hover:bg-surface-2"
        >
          <FacebookIcon />
          {verb} with Facebook
        </button>
      ) : null}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z" />
    </svg>
  );
}
