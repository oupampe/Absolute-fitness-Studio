import { cn } from "@/lib/utils";

/** Eyebrow + section title pairing used across marketing sections (DESIGN.md §2). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-2xl font-bold tracking-tight text-text-bright sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-2xl text-base leading-relaxed text-text-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Standalone eyebrow label. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}
