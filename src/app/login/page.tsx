import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell, OrDivider } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { oauthEnabled } from "@/auth";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Absolute Fitness Studio member account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your membership and bookings."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-bold text-accent transition hover:text-accent-strong">
            Join now
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <OAuthButtons google={oauthEnabled.google} facebook={oauthEnabled.facebook} verb="Log in" />
        {(oauthEnabled.google || oauthEnabled.facebook) && <OrDivider />}
        <Suspense fallback={null}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </AuthShell>
  );
}
