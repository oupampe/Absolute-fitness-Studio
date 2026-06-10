# Absolute Fitness Studio — Design System (Spotify-structured, green accent)

Authoritative design spec. Built on the **Spotify design language** — content-first darkness,
pill-and-circle geometry, heavy shadows, compact functional type, uppercase wide-tracked labels —
with **Spotify Green `#1ed760`** as the single functional accent.

The core idea, applied to a gym: the UI recedes into near-black so **fitness photos and video become
the color source**, exactly as album art does in Spotify. Green is functional only — play/active
controls and primary CTAs. Everything else is achromatic.

---

## 1. Color tokens (dark theme only)

```css
:root {
  /* surfaces (depth via shade, not borders) */
  --bg:            #121212;  /* Level 0 — page background */
  --surface:       #181818;  /* Level 1 — cards, sidebar, containers */
  --surface-2:     #1f1f1f;  /* button / interactive surface */
  --card:          #252525;  /* elevated card */
  --card-2:        #272727;  /* alternate card */

  /* accent — FUNCTIONAL ONLY (play, active, primary CTA). Never a background fill. */
  --accent:        #1ed760;  /* Green */
  --accent-strong: #1db954;  /* accent hover */
  --on-accent:     #121212;  /* foreground ON Green — near-black, never white */

  /* text */
  --text:          #ffffff;  /* primary */
  --text-muted:    #b3b3b3;  /* secondary / inactive */
  --text-bright:   #fdfdfd;  /* max emphasis */

  /* borders (prefer shadow/inset over raw borders) */
  --border:        #4d4d4d;
  --border-light:  #7c7c7c;

  /* semantic */
  --negative:      #f3727f;
  --warning:       #ffa42b;
  --info:          #539df5;

  /* shadows — heavy, so they're visible on near-black */
  --shadow-card:   rgba(0,0,0,0.3) 0px 8px 8px;
  --shadow-dialog: rgba(0,0,0,0.5) 0px 8px 24px;
  --inset-border:  rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset;
}
```

**Accessibility note:** Green on near-black is bright and high-contrast. Text/icons placed *inside* a
Green pill or circle must use `--on-accent` (#121212), never white. Green text on `--bg` is acceptable
for small accents but prefer white/`--text-muted` for body.

---

## 2. Typography

Spotify ships proprietary CircularSp. Free substitute for the whole site: **Inter** (or Manrope),
loaded via `next/font`. Weight carries the hierarchy, not size.

| Role            | Size            | Weight | Tracking      | Notes |
|-----------------|-----------------|--------|---------------|-------|
| Hero (landing)  | clamp(2.5rem,6vw,4.5rem) | 700 | tight (-0.01em) | marketing only |
| Section title   | 24px            | 700    | normal        | |
| Feature heading | 18px            | 600    | normal        | line-height 1.3 |
| Body bold       | 16px            | 700    | normal        | |
| Body            | 16px            | 400    | normal        | |
| Button (label)  | 14px            | 600–700| 1.4px–2px     | **UPPERCASE** |
| Nav active      | 14px            | 700    | normal        | white |
| Nav inactive    | 14px            | 400    | normal        | --text-muted |
| Caption         | 14px            | 400/700| normal        | metadata |
| Small           | 12px            | 400/700| normal        | tags, counts |

Principles: bold/regular binary (700 + 400, 600 sparingly); compact range; **uppercase + wide
tracking on every button** = the systematic label voice. Keep app surfaces (dashboard) dense; the
marketing hero may scale up but stays heavy and tight.

---

## 3. Geometry — pill & circle (identity-defining, do not break)

- Primary button: full pill — `border-radius: 9999px` (small) / `500px` (large).
- Play / control button: circle — `border-radius: 50%`.
- Inputs (search, forms): pill — `border-radius: 500px`, with `--inset-border`.
- Cards / tiles: `border-radius: 6px–8px`.
- Badges/tags: `2px`. Square-cornered buttons are forbidden.

---

## 4. Components

**Primary pill (CTA)** — Green
- bg `--accent`; text `--on-accent`; padding `8px 24px`; radius `9999px`;
  14px/700 UPPERCASE, tracking 1.6px; hover bg `--accent-strong` + scale(1.02).

**Dark pill (secondary)**
- bg `--surface-2`; text `--text` or `--text-muted`; padding `8px 16px`; radius `9999px`.

**Outlined pill**
- transparent bg; text `--text`; `1px solid --border-light`; radius `9999px`; padding `4px 16px`.

**Circular play (SIGNATURE)** — the recurring motif across hero, class cards, and video section
- bg `--accent`; icon `--on-accent`; padding `12px`; radius `50%`; `--shadow-card`;
  hover scale(1.06) + Green glow `0 0 0 6px rgba(30,215,96,0.18)`.

**Card / tile**
- bg `--surface` (or `--card` elevated); radius `8px`; no visible border; `--shadow-card` on hover;
  slight bg lightening to `--surface-2` on hover. Album-style grids for classes/blog/gallery.

**Input**
- bg `--surface-2`; text `--text`; radius `500px`; padding `12px 16px` (icon-aware `12px 48px`);
  box-shadow `--inset-border`; focus: outline `1px solid var(--accent)`.

**Nav (header + dashboard sidebar)**
- bg `--bg`; active 14px/700 white; inactive 14px/400 `--text-muted`; circular icon buttons.

---

## 5. Depth / elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 | `--bg` #121212 | page background |
| 1 | `--surface` / `--surface-2` | cards, sidebar, containers |
| 2 | `--shadow-card` | dropdowns, hover cards |
| 3 | `--shadow-dialog` | modals, menus (auth modal, payment modal) |
| inset | `--inset-border` | input borders |

Shadows are intentionally heavy — on near-black, light shadows are invisible.

---

## 6. Layout & spacing

- 8px base grid. "Dark compression": dense content, near-black provides the rest between elements.
- Album-style responsive card grid: 5 → 3 → 2 → 1 columns
  (>1280 / 1024 / 768 / <576). Max content width ~1280px.
- Marketing pages may breathe more; the `/dashboard` member portal stays tight and grid-driven like
  the Spotify client (sidebar + dense content area).

Breakpoints: <425 mobile-small · 425–576 mobile · 576–768 tablet (2-col) · 768–1024 desktop-small
(sidebar visible) · 1024–1280 desktop · >1280 large.

---

## 7. Motion

- Scroll: fade + rise, staggered children, ~0.5s ease-out.
- Circular play: scale(1.06) + Green glow on hover. Pills: surface lightening.
- Respect `prefers-reduced-motion` everywhere.

---

## 8. Do / Don't

**Do:** near-black surfaces; Green functional only with near-black foreground; pill all buttons,
circle all play controls; uppercase + wide-track labels; heavy shadows; let photos/video carry color.

**Don't:** Green as background or decoration; extra brand colors; raw gray borders (use shadow/inset);
light primary surfaces; thin shadows; square buttons; relaxed line-heights on UI.
