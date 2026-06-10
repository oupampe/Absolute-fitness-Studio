"use client";

import { Landmark, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

type Method = "MANUAL_EFT" | "CARD";

export function PaymentMethodCard({
  method,
  selected,
  disabled = false,
  onSelect,
}: {
  method: Method;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  const meta =
    method === "MANUAL_EFT"
      ? {
          icon: <Landmark size={22} />,
          title: "Manual / EFT",
          body: "Bank transfer. We'll email you our banking details to complete payment.",
        }
      : {
          icon: <CreditCard size={22} />,
          title: "Card / Online Payment",
          body: "Pay instantly by card. This option is coming soon.",
        };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full items-start gap-4 rounded-card p-5 text-left transition-all duration-200",
        disabled
          ? "cursor-not-allowed bg-surface/50 opacity-60"
          : "bg-surface hover:bg-surface-2 hover:shadow-card",
        selected && !disabled && "shadow-card outline outline-2 outline-accent",
      )}
    >
      <span
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
          selected && !disabled ? "bg-accent text-on-accent" : "bg-surface-2 text-text-muted",
        )}
      >
        {meta.icon}
      </span>

      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-base font-bold text-text-bright">{meta.title}</span>
          {method === "MANUAL_EFT" ? (
            <Badge tone="active">Available</Badge>
          ) : (
            <Badge tone="neutral">Coming soon</Badge>
          )}
        </span>
        <span className="text-sm leading-relaxed text-text-muted">{meta.body}</span>
      </span>

      {selected && !disabled ? (
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
          <Check size={15} />
        </span>
      ) : null}

      {/* TODO: integrate payment gateway (e.g. Paystack/Stripe) here */}
    </button>
  );
}
