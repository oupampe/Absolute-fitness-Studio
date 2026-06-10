import Link from "next/link";
import { cn } from "@/lib/utils";

/** ABSOLUTE (white) + FITNESS (green) + STUDIO (muted) wordmark. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Absolute Fitness Studio — home"
      className={cn(
        "inline-flex items-baseline gap-1.5 text-lg font-bold uppercase tracking-label",
        className,
      )}
    >
      <span className="text-text">Absolute</span>
      <span className="text-accent">Fitness</span>
      <span className="text-text-muted">Studio</span>
    </Link>
  );
}
