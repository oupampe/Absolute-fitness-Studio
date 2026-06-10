import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell, OrDivider } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { oauthEnabled } from "@/auth";

export const metadata: Metadata = {
  title: "Join Now",
  description: "Create your Absolute Fitness Studio member account.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Join the studio"
      subtitle="Create your account to book sessions and manage your plan."
      footer={
        <>
          Already a member?{" "}
          <Link href="/login" className="font-bold text-accent transition hover:text-accent-strong">
            Log in
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <OAuthButtons google={oauthEnabled.google} facebook={oauthEnabled.facebook} verb="Sign up" />
        {(oauthEnabled.google || oauthEnabled.facebook) && <OrDivider />}
        <Suspense fallback={null}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </AuthShell>
  );
}
