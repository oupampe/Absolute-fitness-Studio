"use client";

import { SessionProvider } from "next-auth/react";

/** Client wrapper so client components can read the session via useSession(). */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
