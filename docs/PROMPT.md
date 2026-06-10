# Build: Absolute Fitness Studio — Modern Next.js Rebuild

Build a modern, performant, fully responsive website for **Absolute Fitness Studio**, a gym in
Lawley, South Africa. This is a ground-up rebuild of an existing Wix site. Keep the brand identity
(a deep green brand identity) but modernize the execution completely. Follow this document
top to bottom. Starter files (`DESIGN.md`, `schema.prisma`, `.env.example`, `plans.ts`) are included
alongside this prompt — use them as the source of truth and wire the app to match. **`DESIGN.md` is
the authoritative design spec (Spotify-structured, green accent); read it before building any UI.**

Work in this order: (1) scaffold + design system, (2) marketing pages, (3) auth + member portal,
(4) manual payment flow, (5) deployment config. **Show me the file tree before writing components.**

---

## 0. Tech Stack
- Next.js 14+ (App Router, TypeScript, `src/` directory)
- Tailwind CSS with a custom theme (tokens below)
- Auth.js (NextAuth v5 / `next-auth@beta`) with `@auth/prisma-adapter`
- Prisma ORM + PostgreSQL (Supabase)
- Framer Motion for subtle scroll/entrance animation
- `next/image` for all images, `next/font` for fonts
- Resend (or Nodemailer) for transactional email — must degrade to console.log if no key
- Accessible (WCAG AA), strong SEO (per-page metadata, OG tags, sitemap, robots)

**Hard requirement:** the app must build and run with ONLY `DATABASE_URL` + `DIRECT_URL` set.
Email/password auth and the manual payment flow must be fully functional with zero external keys.
Google/Facebook OAuth and email sending must gracefully no-op (not crash) until keys are added.

---

## 1. Brand & Design System — Spotify-structured, green accent

Adopt the **Spotify design language** (content-first darkness, pill-and-circle geometry, heavy
shadows, uppercase wide-tracked labels, compact functional type) but use the **Spotify Green `#1ed760`** as the single functional accent. The full spec lives in the companion
file **DESIGN.md** — follow it exactly. Summary below.

This is a real gym, not a template. The UI recedes into near-black so that **photos and video become
the color** — exactly Spotify's "the album art provides the color" philosophy, applied to fitness
imagery. Green is functional only (primary CTAs, play/active controls, active nav), never decorative
and never used as a background fill.

### Colors — CSS variables + Tailwind tokens (dark theme is the only theme)
```
--bg:             #121212   /* near-black — page background (Level 0) */
--surface:        #181818   /* cards, sidebar, containers (Level 1) */
--surface-2:      #1f1f1f   /* button / interactive surfaces */
--card:           #252525   /* elevated card surface */
--card-2:         #272727   /* alternate card surface */
--accent:         #1ed760   /* Green — play, active, primary CTA (functional only) */
--accent-strong:  #1db954   /* accent hover */
--text:           #ffffff   /* primary text */
--text-muted:     #b3b3b3   /* secondary / inactive */
--text-bright:    #fdfdfd   /* max-emphasis near-white */
--border:         #4d4d4d   /* button borders on dark */
--border-light:   #7c7c7c   /* outlined-button borders, muted links */
--negative:       #f3727f   /* error */
--warning:        #ffa42b   /* warning */
--info:           #539df5   /* info */
```
Accent contrast note: Green on near-black is bright — for accessible text/icons inside Green pills, use
**`#121212` (near-black) as the foreground**, never white. Reserve Green for play controls, active
states, and primary CTAs only.

### Shadows / depth (Spotify scale — heavy, because shadows must be visible on near-black)
```
--shadow-card:   rgba(0,0,0,0.3) 0px 8px 8px      /* cards, dropdowns (Level 2) */
--shadow-dialog: rgba(0,0,0,0.5) 0px 8px 24px     /* modals, menus (Level 3) */
--inset-border:  rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset  /* inputs */
```

### Geometry — pill & circle (do not break this)
- Primary buttons: full pill, radius `9999px` (small) / `500px` (large).
- Play / control buttons: circle, radius `50%`.
- Search & text inputs: pill, radius `500px`, with the inset border-shadow above.
- Cards / album-style tiles: radius `6px–8px`.
- Square-cornered buttons break the identity — avoid them.

### Typography (via `next/font`)
Spotify uses proprietary CircularSp; the closest free substitutes:
- **Display / UI / body:** **Inter** (or **Manrope**) as the SpotifyMixUI substitute across the whole
  site. Keep it compact and functional — this is an app-like interface, not a magazine.
- **Weight is the hierarchy, not size:** mostly **700 (bold)** and **400 (regular)**, **600** used
  sparingly. Range stays compact (10px–24px) for UI; the marketing hero may scale larger
  (`clamp(2.5rem, 6vw, 4.5rem)`) since it's a landing page, but keep tracking tight and weight heavy.
- **Buttons:** uppercase, weight 600–700, letter-spacing **1.4px–2px**, 14px. This systematic
  "label voice" is core to the look.
- Section title 24px/700; feature heading 18px/600; body 16px/400; caption 14px; small 12px.

### Layout & spacing
- 8px base grid; Spotify's "dark compression" — content is dense, the near-black provides the visual
  rest instead of large gaps. The marketing pages can breathe a little more than the app shell, but
  keep the member portal (`/dashboard`) tight and grid-driven like the Spotify client.
- Album-style **grid of cards** for classes, blog, and gallery (5 → 3 → 2 → 1 columns responsive).
- Max content width ~1280px.

### Signature element (the one thing the site is remembered by)
A **circular Green "play" control** as the recurring motif — the same circular play button Spotify uses
for tracks becomes the gym's call-to-action language: it sits on the hero ("Play" the intro video),
on each class card (press-to-book), and on the video section. One consistent circular Green control
threaded through the whole site ties the Spotify language to the gym. Keep everything else achromatic
and quiet so this one element carries the brand.

### Motion
- Fade + rise on scroll (Framer Motion, staggered), ~0.5s ease-out.
- Circular play controls: scale `1.06` + Green glow on hover; pills: subtle lightening of surface.
- **Always respect `prefers-reduced-motion`.**

### Copy voice
Plain, active, motivating, South-African-grounded. Buttons say exactly what happens, in the uppercase
label voice ("JOIN NOW", "BOOK NOW", "SEND REQUEST" — not "Submit"). No filler.

### Do / Don't (from the Spotify system, Spotify-green accent)
- DO use near-black surfaces (`#121212`–`#1f1f1f`); depth comes from shade + heavy shadow, not borders.
- DO keep Green functional only (play / active / primary CTA); foreground inside Green is near-black.
- DO pill all buttons, circle all play controls, uppercase + wide-track all button labels.
- DON'T use Green as a background fill or decoration. DON'T add extra brand colors — Green + achromatic
  grays is the whole palette. DON'T expose raw gray borders (use shadow/inset). DON'T use light
  backgrounds for primary surfaces. DON'T use thin shadows — they vanish on near-black.

---

## 2. Global Components & Chrome

**Sticky header**
- Wordmark: `ABSOLUTE` in `--text` (white) + `FITNESS` in `--accent` (Green).
- Nav: Home · About · Classes · Blog · Videos · Contact. Active item bold (700) white; inactive
  400 `--text-muted`.
- Right: "Log In" (outlined pill) + "Join Now" (Green pill, near-black text, uppercase wide-tracked).
  When authenticated, replace with a circular avatar + dropdown (Dashboard, Profile, Log out).
- Collapses to a slide-in mobile menu (→ bottom bar feel on mobile) with a focus trap.

**Footer**
- Studio name; phones `+27 63 877 1940 / +27 60 685 4968`;
  email `absolutefitnessstudio8@gmail.com`;
  address `879 Emperial Crescent, Lawley Ext 1, 1830`.
- Links: Privacy Policy · Accessibility Statement · Terms & Conditions · Refund Policy.
- Social icons; `© 2025 Absolute Fitness Studio`.

**Reusable components to build:** Button (primary/secondary/ghost), Card, SectionHeading, Eyebrow,
Container, NavBar, MobileMenu, Footer, BlogCard, ClassCard, GalleryGrid, VideoEmbed, CTABand,
ContactForm, AuthModal, PaymentMethodCard, ManualPaymentModal, DashboardShell, PlanBadge, FeatureLock.

---

## 3. Marketing Pages

### Home (`/`)
1. **Hero** — split layout on near-black. Left: headline **FITNESS FOR ALL** + subcopy *"Join us at
   Absolute Fitness Studio, where health meets community. Tailored fitness solutions for busy
   lifestyles."* + a **Green pill "JOIN NOW"** CTA and the **circular Green play control** (signature)
   to play the intro video. Right: athletic photo (placeholder) — the photo carries the color, UI
   stays achromatic. Subtle gradient for legibility.
2. **Mission band** — eyebrow "OUR MISSION": *"At Absolute Fitness Studio, we're dedicated to
   helping busy South Africans prioritize their health and wellness. We offer personalized fitness
   plans and expert guidance in a supportive atmosphere. Our flexible memberships fit your
   lifestyle, building a motivated community that fosters health and belonging."*
3. **Latest Tips (blog teaser)** — 3 cards with the real titles:
   - "Boost Your Health with Expert Trainers at Absolute Fitness Studio" — 4 min read
   - "Join Our Community: Flexible Memberships for Everyone" — 3 min read
   - "Stay Fit: Personalized Plans at Absolute Fitness Studio" — 4 min read
   Each: image, title, excerpt, read-time, "Read More".
4. **Classes** — album-style card grid (data from `plans.ts`); each card has cover art, title, and a
   **circular Green play/action control** (press-to-book):
   - **Fitness Bootcamp** — Plan Based — "View Course"
   - **Group Class** — Plan Based — "Book Now"
   - **Private Session** — R150 — "Book Now"
5. **Video feature** — "WATCH NOW" with a video embed placeholder fronted by the large **circular
   Green play control**.
6. **Connect with Us / Gallery** — responsive masonry grid (placeholders) + "Load More".
7. **CTA band** — "Ready to start? JOIN NOW" with email capture.

### About (`/about`)
Expanded mission; "Why Choose Us" feature grid (Expert Trainers, Flexible Memberships, Personalized
Plans, Community); trainers/team section (placeholder cards).

### Classes (`/classes`)
Full detail for Fitness Bootcamp, Group Class, Private Session (R150) — descriptions, a schedule
table, and booking CTAs that route into the payment-method selection flow.

### Blog (`/blog` + `/blog/[slug]`)
Listing grid + article template. Seed with the three posts above; write full plausible body copy in
the brand voice.

### Contact (`/contact`)
Contact form (name, email, message) → posts to `/api/contact` (console.log if no email key); plus
phones, email, address, and a Google Map embed placeholder for the Lawley address.

---

## 4. Authentication (Auth.js v5)

Three sign-in methods, mirroring the existing Wix flow exactly:
- **Google** (OAuth) — covers all Gmail/Google addresses. (Note: there is no separate "Gmail"
  method; Google sign-in handles all Gmail accounts.)
- **Facebook** (OAuth)
- **Email + password** (Credentials provider, bcrypt-hashed)

Requirements:
- `next-auth@beta` + `@auth/prisma-adapter`, App Router.
- **Guard OAuth providers** so missing env vars don't crash the build — only register Google/Facebook
  if their client IDs are present. Email/password always works.
- `/signup` and `/login` styled in the design system, mirroring the Wix layout:
  "Sign up with Google" / "Sign up with Facebook" / divider "or" / "Sign up with email".
- Protected routes redirect unauthenticated users to `/login`.
- Forgot-password placeholder route.

---

## 5. Member Portal — `/dashboard` (protected)

Sidebar/tab layout, visible only when authenticated:
1. **Overview** — greeting by name; current plan + status badge (e.g. "Private Session — PENDING");
   quick actions.
2. **My Subscription** — plan, price, status, payment method, renewal date. Buttons: Change Plan,
   Upgrade, Cancel (Cancel sets status `CANCELLED`).
3. **My Content / Features** — gated content. Features unlocked by the user's plan (class access,
   bootcamp schedule, private-session booking). Locked features show "Upgrade to unlock".
4. **Profile** — edit name, phone, avatar; change password (email accounts).
5. **Billing / Payment Requests** — history of manual payment requests + statuses.

---

## 6. Payment Method Selection + Manual Flow

On the plans step (and on dashboard "Change Plan"), show payment methods as selectable cards:
- **Manual / EFT (Bank Transfer)** — AVAILABLE.
- **Card / Online Payment** — visible but DISABLED with a "Coming soon" badge. Leave a clearly
  marked integration point: `// TODO: integrate payment gateway (e.g. Paystack/Stripe) here`.

When the user selects **Manual / EFT** + a plan, open a **modal with a pre-populated, editable
message**:

> **Subject:** Banking details request — {PlanName}
> *"Hi Absolute Fitness Studio, I'd like to subscribe to the {PlanName} plan ({Price}) via
> EFT/bank transfer. Please send me your banking details so I can complete payment. My name is
> {UserName} and my email is {UserEmail}."*

Fields: name (prefilled), email (prefilled), phone, plan (prefilled), message (prefilled, editable).

On submit (`/api/payment-request`):
1. Create a `PaymentRequest` row (status `NEW`).
2. Set the user's `Subscription` to that plan, status `PENDING`, paymentMethod `MANUAL_EFT`.
3. Send an email to `PAYMENT_REQUEST_TO_EMAIL` (`absolutefitnessstudio8@gmail.com`) via Resend.
   **If `RESEND_API_KEY` is absent, log the full payload to the console instead of failing.**
4. Show confirmation: *"Request sent — we'll email you the banking details shortly."* and reflect
   PENDING status in the dashboard.

No money moves through the site. This is a form + email only.

---

## 7. Database (Prisma + Supabase)

Use the provided `schema.prisma`. Key models: `User` (Auth.js + `phone`, `createdAt`),
`Account`, `Session`, `VerificationToken`, `Subscription`, `PaymentRequest`. Enums: `Plan`,
`SubStatus`, `PaymentMethod`, `RequestStatus`. Seed the three plans from `plans.ts`.

---

## 8. Deployment — Hostinger Business (Node.js) + Supabase

The app is hosted on **Hostinger Business plan** managed Node.js hosting (deploy from GitHub, build
and runtime handled by Hostinger). The **database stays on Supabase** — Hostinger's Node.js dashboard
has a Database Connect Wizard with Supabase as a first-class option. Hostinger runs a persistent Node
server (`next start`), so this is a standard long-running Node deployment, not serverless.

### Critical: Prisma still needs TWO connection strings
Even on a persistent server, use Supabase's pooler for app connections and a direct connection for
migrations — this avoids connection exhaustion and keeps migrations reliable.
- `DATABASE_URL` → **transaction pooler**, port **6543**, `?pgbouncer=true&connection_limit=1` (runtime).
- `DIRECT_URL` → **direct/session**, port **5432** (Prisma CLI migrations only).

Datasource block must be exactly:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### package.json scripts (Hostinger uses these)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start -p $PORT",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```
- Hostinger sets a `$PORT` env var; `next start -p $PORT` must bind to it (do NOT hardcode 3000 in prod).
- The `build` script runs Prisma generate + migrate deploy before `next build`, so the production DB
  schema is applied automatically on each deploy.
- Set Node version to an LTS (20.x) in the Hostinger Node.js settings to match local.

### Workflow
- Local: `npx prisma migrate dev` then `npm run db:seed` then `npm run dev`.
- After the first deploy migrates the DB, enable **Row Level Security** on the tables in the Supabase
  dashboard.

### Hostinger setup steps (hPanel → Node.js / Web Apps)
1. Push the repo to GitHub.
2. In hPanel, create a Node.js web app, framework = Next.js, connect the GitHub repo + branch.
3. Set the Node version to 20.x; set the build command to `npm run build` and start command to
   `npm start` (Hostinger auto-detects most of this).
4. Add ALL env vars from `.env.example` in the Node.js app's Environment Variables panel with real
   values. Set `AUTH_URL` to your live domain (e.g. `https://absolutefitness.co.za`).
5. (Optional) Use the Database Connect Wizard → Supabase to confirm the connection.
6. Map your domain in hPanel; Hostinger handles SSL.
7. After deploy, set OAuth redirect URIs in Google Cloud Console / Facebook for Developers to
   `https://absolutefitnessstudio.co.za/api/auth/callback/google` and `/api/auth/callback/facebook`.
8. To ship updates: push to the connected branch and redeploy from hPanel.

### Notes
- If you hit a 403 after a deploy, redeploy once — Hostinger regenerates the `.htaccess` that routes
  `public_html` to the Node app.
- Supabase free tier pauses after ~1 week idle and has no auto-backups — fine to start, but once you
  have real members, upgrade Supabase to Pro ($25/mo) so the DB is always-on and backed up. (Your
  Hostinger app stays up regardless; this is only about the database.)

---

## 9. Acceptance Criteria
- `npm run dev` works with only `DATABASE_URL` + `DIRECT_URL` set; email/password auth and the
  manual payment flow are fully functional; OAuth + email gracefully no-op until keys are added.
- Logged-in users see `/dashboard` with their plan + gated features; logged-out users are redirected.
- Selecting "Manual / EFT" opens the prefilled modal; submitting creates a `PaymentRequest`, sets
  the subscription to PENDING, and triggers the email/console log.
- "Card" option is visibly present but disabled with a clean placeholder for later.
- Production build succeeds on Hostinger Business with the pooled `DATABASE_URL`; `next start` binds
  to `$PORT`; migrations run against `DIRECT_URL` without hanging.
- Everything styled in the Spotify-structured / Green design system (per DESIGN.md): near-black
  surfaces, pill/circle geometry, the circular Green play control as signature; responsive to mobile;
  keyboard focus visible; reduced motion respected.

Start by scaffolding the project and the design system (Tailwind tokens from DESIGN.md + base
components + the circular Green play control signature), then show me the file tree and the Home hero
before continuing.
