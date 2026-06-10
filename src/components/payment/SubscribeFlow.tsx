"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS, getPlan } from "@/lib/plans";
import type { Plan } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { ManualPaymentModal } from "./ManualPaymentModal";

type Method = "MANUAL_EFT" | "CARD";

export function SubscribeFlow({
  initialPlan,
  user,
}: {
  initialPlan: Plan | null;
  user: { name: string; email: string; phone: string };
}) {
  const validInitial = initialPlan && initialPlan !== "NONE" ? initialPlan : PLANS[0].key;
  const [planKey, setPlanKey] = useState<Plan>(validInitial);
  const [method, setMethod] = useState<Method>("MANUAL_EFT");
  const [modalOpen, setModalOpen] = useState(false);

  const plan = getPlan(planKey)!;

  return (
    <div className="flex flex-col gap-10">
      {/* Step 1 — plan */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <StepDot n={1} />
          <h2 className="text-feature-heading text-text-bright">Choose your plan</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {PLANS.map((p) => {
            const selected = p.key === planKey;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPlanKey(p.key)}
                aria-pressed={selected}
                className={cn(
                  "flex flex-col gap-2 rounded-card p-5 text-left transition-all duration-200",
                  selected
                    ? "bg-surface shadow-card outline outline-2 outline-accent"
                    : "bg-surface/60 hover:bg-surface-2",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-text-bright">{p.name}</span>
                  {selected ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Check size={13} />
                    </span>
                  ) : null}
                </div>
                <span className="text-sm font-bold text-accent">{p.priceLabel}</span>
                <span className="text-xs uppercase tracking-label text-text-muted">{p.pace}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2 — payment method */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <StepDot n={2} />
          <h2 className="text-feature-heading text-text-bright">Choose a payment method</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <PaymentMethodCard method="MANUAL_EFT" selected={method === "MANUAL_EFT"} onSelect={() => setMethod("MANUAL_EFT")} />
          <PaymentMethodCard method="CARD" selected={false} disabled onSelect={() => {}} />
        </div>
      </section>

      {/* Continue */}
      <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-6">
        <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
          Continue
        </Button>
        <p className="text-sm text-text-muted">
          You&apos;ll review an editable message before anything is sent. No money moves through this
          site.
        </p>
      </div>

      <ManualPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} plan={plan} user={user} />
    </div>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent">
      {n}
    </span>
  );
}
