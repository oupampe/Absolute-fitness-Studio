import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ClassCard } from "./ClassCard";
import { PLANS } from "@/lib/plans";

/** Album-style classes grid (PROMPT §3.1.4). */
export function ClassesSection() {
  return (
    <section id="classes" className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Train with us"
            title="Classes & Sessions"
            description="Pick the format that fits your week. Press play on any session to get started."
          />
          <ButtonLink href="/classes" variant="secondary" size="sm">
            All Classes
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.key} delay={i * 0.08}>
              <ClassCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
