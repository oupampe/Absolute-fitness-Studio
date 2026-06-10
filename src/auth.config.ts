import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no Prisma, no bcrypt). Imported by middleware for
 * route protection and spread into the full node config in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    // Gate /dashboard. Returning false redirects to pages.signIn (/login).
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");
      if (isProtected) return isLoggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // Providers are added in auth.ts (Credentials needs bcrypt + Prisma; OAuth is guarded there).
  providers: [],
} satisfies NextAuthConfig;
