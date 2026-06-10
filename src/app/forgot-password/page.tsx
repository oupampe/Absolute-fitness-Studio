import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Absolute Fitness Studio account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Password reset by email is coming soon."
      footer={
        <Link href="/login" className="font-bold text-accent transition hover:text-accent-strong">
          ← Back to log in
        </Link>
      }
    >
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-text-muted">
        <p>
          Self-service password reset isn&apos;t available just yet. In the meantime, email us and
          we&apos;ll help you back into your account.
        </p>
        <a
          href="mailto:absolutefitnessstudio8@gmail.com?subject=Password%20reset"
          className="font-bold text-accent transition hover:text-accent-strong"
        >
          absolutefitnessstudio8@gmail.com
        </a>
        {/* TODO: wire up email-based password reset (token + /reset-password). */}
      </div>
    </AuthShell>
  );
}
