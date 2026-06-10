"use client";

import { Play, Plus, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SIGNATURE element (DESIGN.md §4) — the circular green "play" control.
 * One consistent motif threaded through hero, class cards, and the video
 * section. Green circle, near-black icon, heavy shadow, scale + glow on hover.
 */

type PlayControlProps = {
  /** Visual size of the circle. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Which glyph sits inside the circle. */
  icon?: "play" | "plus" | "arrow" | "lock";
  /** Accessible label — required, describes the action. */
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const SIZES = {
  sm: { box: "h-10 w-10", icon: 16 },
  md: { box: "h-12 w-12", icon: 20 },
  lg: { box: "h-16 w-16", icon: 26 },
  xl: { box: "h-20 w-20 md:h-24 md:w-24", icon: 34 },
} as const;

const ICONS = { play: Play, plus: Plus, arrow: ArrowRight, lock: Lock };

export function PlayControl({
  size = "md",
  icon = "play",
  label,
  className,
  onClick,
  type = "button",
  disabled = false,
}: PlayControlProps) {
  const { box, icon: iconSize } = SIZES[size];
  const Icon = ICONS[icon];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "group inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-on-accent shadow-card",
        "transition-all duration-300 ease-out-soft",
        "hover:scale-[1.06] hover:bg-accent-strong hover:shadow-glow",
        "focus-visible:scale-[1.06] focus-visible:shadow-glow",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-card",
        box,
        className,
      )}
    >
      <Icon
        size={iconSize}
        strokeWidth={2.5}
        // Play glyph reads better nudged right and filled
        className={cn(icon === "play" && "translate-x-[1px] fill-on-accent")}
        aria-hidden
      />
    </button>
  );
}
