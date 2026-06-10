import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="eyebrow">404</span>
        <h1 className="text-4xl font-bold tracking-tight text-text-bright sm:text-5xl">
          This page took a rest day
        </h1>
        <p className="max-w-md text-base text-text-muted">
          We couldn&apos;t find what you were looking for. Let&apos;s get you back to training.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="lg">
            Back Home
          </ButtonLink>
          <ButtonLink href="/classes" variant="outline" size="lg">
            View Classes
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
