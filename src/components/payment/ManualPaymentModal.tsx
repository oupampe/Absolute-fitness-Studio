"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PlanInfo } from "@/lib/plans";

/**
 * Manual / EFT request modal (PROMPT §6). Opens with a pre-populated, editable
 * message. On submit it POSTs to /api/payment-request — which records the
 * request, sets the subscription to PENDING, and emails the studio (or logs).
 */
export function ManualPaymentModal({
  open,
  onClose,
  plan,
  user,
}: {
  open: boolean;
  onClose: () => void;
  plan: PlanInfo;
  user: { name: string; email: string; phone: string };
}) {
  const router = useRouter();
  const defaultMessage = `Hi Absolute Fitness Studio, I'd like to subscribe to the ${plan.name} plan (${plan.priceLabel}) via EFT/bank transfer. Please send me your banking details so I can complete payment. My name is ${user.name || "[your name]"} and my email is ${user.email || "[your email]"}.`;

  const [phone, setPhone] = useState(user.phone);
  const [message, setMessage] = useState(defaultMessage);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  // Reset the message when the plan changes / modal reopens.
  useEffect(() => {
    if (open) {
      setMessage(defaultMessage);
      setPhone(user.phone);
      setState("idle");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, plan.key]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/payment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.key, phone, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send your request.");
      }
      setState("done");
      router.refresh();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={`Request banking details for ${plan.name}`} className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-card bg-card shadow-dialog">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h2 className="text-base font-bold text-text-bright">Request banking details</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-2 hover:text-text">
            <X size={20} />
          </button>
        </div>

        {state === "done" ? (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={28} />
            </span>
            <h3 className="text-lg font-bold text-text-bright">Request sent</h3>
            <p className="max-w-sm text-sm text-text-muted">
              We&apos;ll email you the banking details shortly. Your {plan.name} plan is now marked
              <span className="font-bold text-warning"> PENDING</span> until payment is confirmed.
            </p>
            <Button variant="primary" size="md" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6">
            <p className="text-sm text-text-muted">
              We&apos;ll send this to the studio. Edit anything before you send.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <ReadOnlyField label="Name" value={user.name || "—"} />
              <ReadOnlyField label="Email" value={user.email || "—"} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pr-phone" className="text-sm font-bold text-text">Phone</label>
              <input id="pr-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+27 ..." className="input-pill" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text">Plan</span>
              <div className="flex items-center justify-between rounded-pill bg-surface-2 px-4 py-3 text-sm shadow-inset">
                <span className="font-bold text-text">{plan.name}</span>
                <span className="font-bold text-accent">{plan.priceLabel}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pr-message" className="text-sm font-bold text-text">Message</label>
              <textarea
                id="pr-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-card bg-surface-2 px-4 py-3 text-sm text-text shadow-inset focus:outline focus:outline-1 focus:outline-accent"
              />
            </div>

            {state === "error" ? <p className="text-sm text-negative">{error}</p> : null}

            <div className="mt-1 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" disabled={state === "loading"}>
                {state === "loading" ? "Sending…" : "Send Request"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-text">{label}</span>
      <div className="truncate rounded-pill bg-surface-2 px-4 py-3 text-sm text-text-muted shadow-inset" title={value}>
        {value}
      </div>
    </div>
  );
}
