import { getCurrentUser } from "@/lib/user";
import { PLANS, getPlan } from "@/lib/plans";
import { FeatureItem } from "@/components/dashboard/FeatureLock";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";

export default async function ContentPage() {
  const user = await getCurrentUser();
  const sub = user?.subscription;
  // Features are unlocked only when the plan is the user's and the sub is ACTIVE.
  const activePlan = sub && sub.status === "ACTIVE" && sub.plan !== "NONE" ? sub.plan : null;
  const currentPlanInfo = activePlan ? getPlan(activePlan) : null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">My Content</span>
        <h1 className="text-3xl font-bold tracking-tight text-text-bright">Your features</h1>
        <p className="text-sm text-text-muted">
          {currentPlanInfo
            ? "Everything your plan unlocks — plus what you'd get by upgrading."
            : "Your plan isn't active yet. Here's what each plan unlocks."}
        </p>
      </header>

      {sub && sub.plan !== "NONE" && sub.status !== "ACTIVE" ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card bg-surface p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">Your {getPlan(sub.plan)?.name} plan is</span>
            <StatusBadge status={sub.status} />
          </div>
          <span className="text-xs text-text-muted">
            Features unlock once your payment is confirmed and the plan is active.
          </span>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const unlocked = plan.key === activePlan;
          return (
            <div key={plan.key} className="flex flex-col gap-4 rounded-card bg-surface/50 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-feature-heading text-text-bright">{plan.name}</h2>
                {unlocked ? (
                  <span className="text-xs font-bold uppercase tracking-label text-accent">Active</span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-label text-text-muted">Locked</span>
                )}
              </div>
              <ul className="flex flex-col gap-2">
                {plan.features.map((feat) => (
                  <FeatureItem key={feat} label={feat} unlocked={unlocked} />
                ))}
              </ul>
              {!unlocked ? (
                <ButtonLink href={`/dashboard/subscribe?plan=${plan.key}`} variant="secondary" size="sm" className="self-start">
                  Get {plan.name}
                </ButtonLink>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
