import { Container } from "@/components/ui/Container";

/** Compact inner-page header used across About / Classes / Blog / Contact. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-[110px]"
      />
      <Container className="relative">
        <div className="flex max-w-2xl flex-col gap-4">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="text-4xl font-bold tracking-tight text-text-bright sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
