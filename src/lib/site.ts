/** Single source of truth for studio contact details, nav, and brand metadata. */

export const SITE = {
  name: "Absolute Fitness Studio",
  shortName: "Absolute Fitness",
  tagline: "Fitness for all",
  description:
    "Absolute Fitness Studio in Lawley — tailored fitness plans, group classes, bootcamps and private coaching for busy South Africans. Health meets community.",
  url: "https://absolutefitnessstudio.co.za",
  locale: "en_ZA",
  phones: ["+27 63 877 1940", "+27 60 685 4968"],
  email: "absolutefitnessstudio8@gmail.com",
  address: {
    line1: "879 Emperial Crescent",
    line2: "Lawley Ext 1, 1830",
    full: "879 Emperial Crescent, Lawley Ext 1, 1830",
  },
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LEGAL = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/accessibility", label: "Accessibility Statement" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/refund", label: "Refund Policy" },
] as const;
