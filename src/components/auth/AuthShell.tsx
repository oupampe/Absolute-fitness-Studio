import Link from "next/link";
import { Wordmark } from "@/components/chrome/Wordmark";

/** Centered, branded shell for /login and /signup. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="flex items-center justify-between px-6 py-5">
        <Wordmark />
        <Link href="/" className="text-sm text-text-muted transition hover:text-text">
          ← Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-text-bright">{title}</h1>
            <p className="text-sm text-text-muted">{subtitle}</p>
          </div>

          <div className="mt-8 rounded-card bg-surface p-6 shadow-card sm:p-8">{children}</div>

          <div className="mt-6 text-center text-sm text-text-muted">{footer}</div>
        </div>
      </main>
    </div>
  );
}

/** "or" divider between OAuth and email auth. */
export function OrDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-xs uppercase tracking-label text-text-muted">or</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}
