import type { Metadata } from "next";
import Image from "next/image";
import { Dumbbell, CalendarClock, UserCog, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/marketing/CTABand";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Absolute Fitness Studio helps busy South Africans prioritise health with expert trainers, flexible memberships and personalised plans in a supportive community.",
};

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Expert Trainers",
    body: "Qualified coaches who teach you to move well and push safely — not just count reps.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Memberships",
    body: "Plans that bend around shift work, school runs and month-end. Consistency made realistic.",
  },
  {
    icon: UserCog,
    title: "Personalized Plans",
    body: "Programming built around your goals, history and the time you actually have.",
  },
  {
    icon: Users,
    title: "Community",
    body: "A welcoming floor where people know your name and cheer your wins. No judgement.",
  },
];

const TEAM = [
  { name: "Coach Shaz", role: "Head Trainer", img: "/coaches/coach-shaz.jpg" },
  { name: "Coach Siya", role: "Group & Bootcamp", img: "/coaches/coach-siya.jpg" },
  { name: "Coach Less", role: "Strength & Private", img: "/coaches/coach-less.png" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Where health meets community"
        description="We're a Lawley studio built for busy lives — expert guidance, flexible plans, and a community that keeps you coming back."
      />

      {/* Expanded mission */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow">Our Mission</span>
            <h2 className="text-3xl font-bold tracking-tight text-text-bright">
              Fitness that fits your life — not the other way around
            </h2>
            <p className="text-base leading-relaxed text-text-muted">
              At Absolute Fitness Studio, we&apos;re dedicated to helping busy South Africans
              prioritize their health and wellness. We offer personalized fitness plans and expert
              guidance in a supportive atmosphere.
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              Our flexible memberships fit your lifestyle, building a motivated community that
              fosters health and belonging. Whether you&apos;re starting out or coming back after a
              break, we meet you where you are and walk the road with you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1100&q=80"
              alt="Coaching on the studio floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="border-y border-white/5 bg-surface/40 py-20">
        <Container>
          <SectionHeading
            eyebrow="Why choose us"
            title="Built around four promises"
            align="center"
            className="mx-auto items-center text-center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-4 rounded-card bg-surface p-6 transition hover:bg-surface-2 hover:shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <f.icon size={22} />
                  </span>
                  <h3 className="text-feature-heading text-text-bright">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="The team" title="Coaches in your corner" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-card bg-surface shadow-card">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-5">
                    <h3 className="text-base font-bold text-text-bright">{member.name}</h3>
                    <p className="text-xs uppercase tracking-label text-text-muted">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
