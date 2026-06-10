import { cn } from "@/lib/utils";

/** Album-style tile (DESIGN.md §4). No visible border; depth via shade + shadow. */
export function Card({
  className,
  children,
  interactive = false,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card bg-surface p-4",
        interactive &&
          "group cursor-pointer transition-all duration-300 ease-out-soft hover:bg-surface-2 hover:shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
