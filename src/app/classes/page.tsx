import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/marketing/PageHeader";
import { CTABand } from "@/components/marketing/CTABand";
import { PLANS } from "@/lib/plans";
import { CLASS_COVERS } from "@/lib/media";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Fitness Bootcamp, Group Class and Private Session (R150) at Absolute Fitness Studio — descriptions, weekly schedule and booking.",
};

const SCHEDULE = [
  { day: "Monday", bootcamp: "06:00 · 18:00", group: "17:00", private: "By appointment" },
  { day: "Tuesday", bootcamp: "06:00", group: "17:00 · 18:30", private: "By appointment" },
  { day: "Wednesday", bootcamp: "06:00 · 18:00", group: "17:00", private: "By appointment" },
  { day: "Thursday", bootcamp: "06:00", group: "17:00 · 18:30", private: "By appointment" },
  { day: "Friday", bootcamp: "06:00 · 17:30", group: "17:00", private: "By appointment" },
  { day: "Saturday", bootcamp: "08:00", group: "09:00", private: "By appointment" },
];

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Train with us"
        title="Classes & Sessions"
        description="Three ways to train, all coached, all built around your week. Find the one that fits and book in."
      />

      {/* Detail blocks */}
      <section className="py-16">
        <Container className="flex flex-col gap-16">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.key}>
              <div
                id={plan.key.toLowerCase()}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-card">
                    {plan.key !== "NONE" ? (
                      <Image
                        src={CLASS_COVERS[plan.key]}
                        alt={plan.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                </div>

                <div className={`flex flex-col gap-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="eyebrow">{plan.pace}</span>
                    <span className="text-sm font-bold text-accent">{plan.priceLabel}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-text-bright">{plan.name}</h2>
                  <p className="text-base leading-relaxed text-text-muted">{plan.blurb}</p>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-text">
                        <Check size={16} className="shrink-0 text-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <ButtonLink href={`/dashboard/subscribe?plan=${plan.key}`} variant="primary" size="lg">
                      {plan.cta}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Schedule table */}
      <section className="border-y border-white/5 bg-surface/40 py-20">
        <Container>
          <h2 className="text-2xl font-bold tracking-tight text-text-bright">Weekly schedule</h2>
          <p className="mt-2 text-sm text-text-muted">
            Times may shift on public holidays — confirm with your coach.
          </p>

          <div className="mt-8 overflow-x-auto rounded-card bg-surface shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-label text-text-muted">
                  <th className="px-5 py-4 font-bold">Day</th>
                  <th className="px-5 py-4 font-bold">Bootcamp</th>
                  <th className="px-5 py-4 font-bold">Group Class</th>
                  <th className="px-5 py-4 font-bold">Private Session</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.day} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 font-bold text-text-bright">{row.day}</td>
                    <td className="px-5 py-4 text-text-muted">{row.bootcamp}</td>
                    <td className="px-5 py-4 text-text-muted">{row.group}</td>
                    <td className="px-5 py-4 text-text-muted">{row.private}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
