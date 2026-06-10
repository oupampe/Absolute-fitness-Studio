import Link from "next/link";
import { CreditCard, Sparkles, CalendarCheck, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/user";
import { getPlan } from "@/lib/plans";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";

export default async function DashboardOverview() {
  const user = await getCurrentUser();
  const sub = user?.subscription;
  const planInfo = sub && sub.plan !== "NONE" ? getPlan(sub.plan) : null;
  const firstName = (user?.name || "there").split(" ")[0];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Overview</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm text-text-muted">Here&apos;s your training at a glance.</p>
      </header>

      {/* Current plan card */}
      <div className="rounded-card bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-label text-text-muted">Current plan</span>
            {planInfo ? (
              <>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-text-bright">{planInfo.name}</h2>
                  {sub ? <StatusBadge status={sub.status} /> : null}
                </div>
                <p className="text-sm text-text-muted">
                  {planInfo.priceLabel}
                  {planInfo.amount ? " · per session" : ""}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-text-bright">No active plan</h2>
                <p className="text-sm text-text-muted">Choose a plan to start booking sessions.</p>
              </>
            )}
          </div>
          <ButtonLink
            href={planInfo ? "/dashboard/subscription" : "/dashboard/subscribe"}
            variant="primary"
            size="md"
          >
            {planInfo ? "Manage Plan" : "Choose a Plan"}
          </ButtonLink>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <QuickAction
          href="/dashboard/subscription"
          icon={<CreditCard size={20} />}
          title="My Subscription"
          body="Change, upgrade or cancel your plan."
        />
        <QuickAction
          href="/dashboard/content"
          icon={<Sparkles size={20} />}
          title="My Content"
          body="See what your plan unlocks."
        />
        <QuickAction
          href="/dashboard/billing"
          icon={<CalendarCheck size={20} />}
          title="Billing"
          body="Track your payment requests."
        />
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-card bg-surface p-5 transition hover:bg-surface-2 hover:shadow-card"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
        {icon}
      </span>
      <h3 className="text-base font-bold text-text-bright">{title}</h3>
      <p className="text-sm text-text-muted">{body}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-label text-text-muted transition group-hover:text-accent">
        Open <ArrowRight size={13} />
      </span>
    </Link>
  );
}
