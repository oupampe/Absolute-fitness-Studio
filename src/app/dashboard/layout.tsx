import { redirect } from "next/navigation";
import { Wordmark } from "@/components/chrome/Wordmark";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { getCurrentUser } from "@/lib/user";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/dashboard");

  const displayName = user.name || user.email || "Member";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-dvh bg-bg lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="hidden border-r border-white/5 bg-surface/50 lg:flex lg:flex-col lg:gap-6 lg:p-5">
        <div className="px-1">
          <Wordmark />
        </div>

        <div className="flex items-center gap-3 rounded-card bg-surface p-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-text">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-text">{displayName}</p>
            <p className="truncate text-xs text-text-muted">{user.email}</p>
          </div>
        </div>

        <DashboardNav />
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b border-white/5 px-5 py-4 lg:hidden">
          <Wordmark />
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-text">
            {initial}
          </span>
        </header>

        {/* Mobile nav (horizontal scroll) */}
        <div className="border-b border-white/5 px-3 py-2 lg:hidden">
          <DashboardNav />
        </div>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
