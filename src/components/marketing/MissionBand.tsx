import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** OUR MISSION band (PROMPT §3.1.2). */
export function MissionBand() {
  return (
    <section className="border-y border-white/5 bg-surface/40 py-20">
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span className="eyebrow">Our Mission</span>
          <p className="text-balance text-xl font-bold leading-relaxed text-text-bright sm:text-2xl sm:leading-relaxed">
            At Absolute Fitness Studio, we&apos;re dedicated to helping busy South Africans
            prioritize their health and wellness. We offer personalized fitness plans and expert
            guidance in a supportive atmosphere. Our flexible memberships fit your lifestyle,
            building a motivated community that fosters health and belonging.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
