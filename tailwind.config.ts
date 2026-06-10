import type { Config } from "tailwindcss";

/**
 * Absolute Fitness Studio — Spotify-structured design system (Spotify-green accent).
 * Tokens mirror DESIGN.md. Colors are wired to CSS variables (see globals.css)
 * so the single dark theme stays the source of truth.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        card: "var(--card)",
        "card-2": "var(--card-2)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        "on-accent": "var(--on-accent)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-bright": "var(--text-bright)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        negative: "var(--negative)",
        warning: "var(--warning)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        "pill-lg": "500px",
        card: "8px",
        "card-sm": "6px",
        tag: "2px",
      },
      boxShadow: {
        card: "rgba(0,0,0,0.3) 0px 8px 8px",
        dialog: "rgba(0,0,0,0.5) 0px 8px 24px",
        inset: "rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset",
        glow: "0 0 0 6px rgba(30,215,96,0.18)",
      },
      letterSpacing: {
        label: "0.1em",
        "label-wide": "0.14em",
        tight: "-0.01em",
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "section-title": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "feature-heading": ["18px", { lineHeight: "1.3", fontWeight: "600" }],
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
