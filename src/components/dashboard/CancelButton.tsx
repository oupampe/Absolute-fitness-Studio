"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { cancelSubscription } from "@/app/dashboard/subscription/actions";

/** Cancel button with an inline confirm step. */
export function CancelButton() {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <Button variant="ghost" size="md" onClick={() => setConfirming(true)} className="text-negative hover:text-negative">
        Cancel Plan
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-muted">Are you sure?</span>
      <Button
        variant="secondary"
        size="sm"
        disabled={pending}
        onClick={() => startTransition(() => void cancelSubscription())}
        className="text-negative"
      >
        {pending ? "Cancelling…" : "Yes, cancel"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
        Keep
      </Button>
    </div>
  );
}
