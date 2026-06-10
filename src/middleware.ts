import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge middleware: uses the edge-safe config (no Prisma/bcrypt) to read the JWT
// and enforce the `authorized` callback. Protects /dashboard.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*"],
};
