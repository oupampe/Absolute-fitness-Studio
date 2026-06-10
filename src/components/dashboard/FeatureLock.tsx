import Link from "next/link";
import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** A single plan feature, shown unlocked (current plan) or locked (upgrade prompt). */
export function FeatureItem({ label, unlocked }: { label: string; unlocked: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-card-sm px-3 py-3 text-sm",
        unlocked ? "bg-surface text-text" : "bg-surface/50 text-text-muted",
      )}
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          unlocked ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-muted",
        )}
      >
        {unlocked ? <Check size={15} /> : <Lock size={13} />}
      </span>
      <span className="flex-1">{label}</span>
      {!unlocked ? (
        <Link
          href="/dashboard/subscription"
          className="shrink-0 text-xs font-bold uppercase tracking-label text-text-muted transition hover:text-accent"
        >
          Upgrade to unlock
        </Link>
      ) : null}
    </li>
  );
}
