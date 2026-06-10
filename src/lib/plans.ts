// Absolute Fitness Studio — plan / offering catalogue.
// Single source of truth for the Classes section, pricing cards, and DB seed.

import { Plan } from "@prisma/client";

export type PlanInfo = {
  key: Plan;                 // maps to Prisma `Plan` enum
  name: string;
  priceLabel: string;        // human-facing ("R150", "Plan Based")
  amount: number | null;     // numeric ZAR amount, or null for "plan based"
  pace: string;              // short descriptor shown on cards
  cta: "View Course" | "Book Now";
  blurb: string;
  features: string[];        // unlocked in the member portal under "My Content"
};

export const PLANS: PlanInfo[] = [
  {
    key: "BOOTCAMP",
    name: "Fitness Bootcamp",
    priceLabel: "Plan Based",
    amount: null,
    pace: "Plan Based",
    cta: "View Course",
    blurb:
      "High-energy group conditioning built for busy schedules. Strength, cardio, and mobility in one structured programme.",
    features: [
      "Full bootcamp schedule access",
      "Progressive weekly programming",
      "Group accountability check-ins",
    ],
  },
  {
    key: "GROUP",
    name: "Group Class",
    priceLabel: "Plan Based",
    amount: null,
    pace: "Plan Based",
    cta: "Book Now",
    blurb:
      "Train alongside the community. Coached group sessions that keep you moving, motivated, and consistent.",
    features: [
      "Group class booking",
      "Community events access",
      "Coach-led session plans",
    ],
  },
  {
    key: "PRIVATE",
    name: "Private Session",
    priceLabel: "R150",
    amount: 150,
    pace: "Per session",
    cta: "Book Now",
    blurb:
      "One-on-one coaching tailored to your goals. Personalized programming and undivided attention from a trainer.",
    features: [
      "1:1 private session booking",
      "Personalized training plan",
      "Direct trainer messaging",
    ],
  },
];

export const getPlan = (key: Plan) => PLANS.find((p) => p.key === key);
