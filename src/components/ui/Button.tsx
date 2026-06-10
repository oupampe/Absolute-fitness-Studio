import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Pill button system (DESIGN.md §3–4). Every variant is a full pill; labels are
 * uppercase + wide-tracked ("label voice"). Square corners are forbidden.
 *
 * - primary   → green fill, near-black text (primary CTA)
 * - secondary → dark surface pill
 * - outline   → transparent with muted border
 * - ghost     → text only
 */

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong hover:scale-[1.02] shadow-card",
  secondary:
    "bg-surface-2 text-text hover:bg-card hover:text-text-bright",
  outline:
    "bg-transparent text-text border border-border-light hover:border-text hover:scale-[1.02]",
  ghost: "bg-transparent text-text-muted hover:text-text",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-pill font-bold uppercase tracking-label-wide transition-all duration-200 ease-out-soft focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(baseClasses, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: BaseProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external) {
    return (
      <a
        href={href}
        className={cn(baseClasses, VARIANTS[variant], SIZES[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(baseClasses, VARIANTS[variant], SIZES[size], className)}
    >
      {children}
    </Link>
  );
}
