// Lightweight legal/policy copy. Plain-language placeholders — have a
// professional review before relying on these for a live business.

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2025-01-01",
    intro:
      "This policy explains what personal information Absolute Fitness Studio collects, why we collect it, and how we keep it safe.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "When you create an account or send a payment request, we collect your name, email address, phone number and the plan you're interested in. We do not collect or store card or banking details on this site — payments are arranged directly with us.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your information to manage your membership, respond to enquiries, send you the banking details you request, and keep you updated about your training. We will not sell your information to third parties.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us to access, correct or delete the personal information we hold about you at any time. Email us and we'll action your request promptly, in line with South Africa's POPIA.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    updated: "2025-01-01",
    intro:
      "We want everyone to be able to use this website, regardless of ability or the device they're on.",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "This site is built to meet WCAG 2.1 AA guidelines: keyboard navigation, visible focus states, sufficient colour contrast, descriptive alt text, and respect for reduced-motion preferences.",
        ],
      },
      {
        heading: "Ongoing work",
        body: [
          "Accessibility is never finished. If you encounter a barrier or have a suggestion, please contact us and we'll do our best to fix it quickly.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    updated: "2025-01-01",
    intro:
      "By using this website and our services, you agree to the following terms.",
    sections: [
      {
        heading: "Memberships & bookings",
        body: [
          "Plan availability, schedules and pricing may change. A payment request submitted through this site is an enquiry — your membership is confirmed once payment is arranged and received directly with the studio.",
        ],
      },
      {
        heading: "Conduct & safety",
        body: [
          "Train within your ability and follow your coach's guidance. Consult a doctor before starting any new exercise programme if you have a medical condition.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Absolute Fitness Studio takes reasonable care to provide a safe environment, but you participate in training at your own risk.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    updated: "2025-01-01",
    intro:
      "We want you to be happy with your training. This policy covers refunds and cancellations.",
    sections: [
      {
        heading: "Cancellations",
        body: [
          "You can cancel your membership at any time from your dashboard or by contacting us. Cancellation stops future billing; it does not automatically refund sessions already paid for.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Refund requests are handled case by case. If you've paid for a session you couldn't attend due to a studio cancellation, we'll credit or refund it. Contact us within 14 days to arrange.",
        ],
      },
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((d) => d.slug === slug);
