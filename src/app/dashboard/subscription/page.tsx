import Link from "next/link";
import { getCurrentUser } from "@/lib/user";
import { getPlan } from "@/lib/plans";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { CancelButton } from "@/components/dashboard/CancelButton";
import { ButtonLink } from "@/components/ui/Button";

const METHOD_LABEL: Record<string, string> = {
  NONE: "—",
  MANUAL_EFT: "Manual / EFT (Bank transfer)",
  CARD: "Card",
};

export default async function SubscriptionPage() {
  const user = await getCurrentUser();
  const sub = user?.subscription;
  const planInfo = sub && sub.plan !== "NONE" ? getPlan(sub.plan) : null;

  const renews = sub?.renewsAt
    ? new Date(sub.renewsAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">My Subscription</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">Your plan</h1>
      </header>

      {planInfo && sub ? (
        <div className="rounded-card bg-surface shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 p-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-text-bright">{planInfo.name}</h2>
              <StatusBadge status={sub.status} />
            </div>
            <span className="text-lg font-bold text-accent">{planInfo.priceLabel}</span>
          </div>

          <dl className="divide-y divide-white/5">
            <Row label="Price">{planInfo.priceLabel}{planInfo.amount ? " per session" : ""}</Row>
            <Row label="Status">{sub.status.charAt(0) + sub.status.slice(1).toLowerCase()}</Row>
            <Row label="Payment method">{METHOD_LABEL[sub.paymentMethod] ?? "—"}</Row>
            <Row label="Renews">{renews}</Row>
          </dl>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 p-6">
            <ButtonLink href="/dashboard/subscribe" variant="primary" size="md">
              Change Plan
            </ButtonLink>
            <ButtonLink href="/dashboard/subscribe" variant="secondary" size="md">
              Upgrade
            </ButtonLink>
            {sub.status !== "CANCELLED" ? <CancelButton /> : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-card bg-surface p-8 shadow-card">
          <h2 className="text-xl font-bold text-text-bright">No active plan</h2>
          <p className="text-sm text-text-muted">
            You don&apos;t have a subscription yet. Choose a plan to start booking sessions.
          </p>
          <ButtonLink href="/dashboard/subscribe" variant="primary" size="lg">
            Choose a Plan
          </ButtonLink>
        </div>
      )}

      <p className="text-xs text-text-muted">
        Need help with your plan?{" "}
        <Link href="/contact" className="font-bold text-accent hover:text-accent-strong">
          Contact the studio
        </Link>
        .
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <dt className="text-sm text-text-muted">{label}</dt>
      <dd className="text-sm font-bold text-text">{children}</dd>
    </div>
  );
}
