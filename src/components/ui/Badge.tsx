import { cn } from "@/lib/utils";

/** Small status / metadata tag — 2px radius per DESIGN.md §3. */
type Tone = "neutral" | "accent" | "pending" | "active" | "cancelled" | "info";

const TONES: Record<Tone, string> = {
  neutral: "bg-surface-2 text-text-muted",
  accent: "bg-accent text-on-accent",
  pending: "bg-warning/15 text-warning",
  active: "bg-accent/15 text-accent",
  cancelled: "bg-negative/15 text-negative",
  info: "bg-info/15 text-info",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-tag px-2 py-1 text-[11px] font-bold uppercase tracking-label",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
