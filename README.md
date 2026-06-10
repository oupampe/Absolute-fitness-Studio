# Absolute Fitness Studio

A modern, performant rebuild of the Absolute Fitness Studio website — a gym in Lawley, South Africa.
Built with the **Spotify-structured design language** (content-first near-black, pill/circle geometry,
heavy shadows) using **Spotify Green `#1ed760`** as the single functional accent.

> The authoritative design spec lives in [`docs/DESIGN.md`](docs/DESIGN.md). The original build brief
> is in [`docs/PROMPT.md`](docs/PROMPT.md).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript, `src/`) |
| Styling | Tailwind CSS v3 — tokens wired to CSS variables |
| Auth | Auth.js v5 (`next-auth@beta`) + `@auth/prisma-adapter` |
| Database | Prisma 5 + PostgreSQL (Supabase) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Email | Resend — **degrades to `console.log` when no key** |

The app **runs locally with only `DATABASE_URL`, `DIRECT_URL` and `AUTH_SECRET`**. Email/password
auth and the manual payment flow are fully functional with zero external keys. Google/Facebook OAuth
and email sending gracefully no-op until their keys are added.

## Getting started

1. **Database** — create a free Supabase project and save the DB password.
2. In Supabase → **Connect → ORM → Prisma**, copy **both** connection strings.
3. Copy the env file and fill it in:
   ```bash
   cp .env.example .env
   # DATABASE_URL → transaction pooler, port 6543 (?pgbouncer=true&connection_limit=1)
   # DIRECT_URL   → direct/session, port 5432
   npx auth secret   # writes AUTH_SECRET
   ```
4. **Install, migrate, seed, run:**
   ```bash
   npm install
   npx prisma migrate dev      # applies the schema
   npm run db:seed             # demo member: member@absolutefitness.co.za / password123
   npm run dev
   ```

Open <http://localhost:3000>. Log in with the seeded demo member to explore `/dashboard`.

## Adding optional keys (later)

- **Google / Facebook login** — set `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (and/or the Facebook
  pair). The buttons appear automatically; missing keys keep them hidden, never crash.
- **Email delivery** — set `RESEND_API_KEY`. Until then, contact + payment-request emails log to the
  server console.
- **Online card payments** — wired as a disabled "Coming soon" option. Integration point is marked
  with `// TODO: integrate payment gateway (e.g. Paystack/Stripe) here` in
  `src/components/payment/PaymentMethodCard.tsx`.

## Manual payment flow (no money moves through the site)

1. A logged-in member picks a plan + **Manual / EFT** on `/dashboard/subscribe`.
2. A modal opens with a **prefilled, editable** message requesting banking details.
3. On submit, `POST /api/payment-request`:
   - creates a `PaymentRequest` row (status `NEW`),
   - sets the member's `Subscription` to that plan, status `PENDING`, method `MANUAL_EFT`,
   - emails `PAYMENT_REQUEST_TO_EMAIL` (or logs the payload if no `RESEND_API_KEY`).
4. The dashboard reflects the `PENDING` status and the request appears under **Billing**.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | `prisma generate && next build` (production — **does not touch the DB**) |
| `npm start` | `next start -p $PORT` (binds to Hostinger's `$PORT`) |
| `npm run db:push` | `prisma db push` — sync the schema to the database (no migration history) |
| `npm run db:migrate` | `prisma migrate dev` — create + apply a migration locally |
| `npm run db:deploy` | `prisma migrate deploy` — apply existing migrations to a DB |
| `npm run db:seed` | Seed the demo member |

> **The build never connects to the database.** Schema changes are applied
> separately (`db:push` or `db:deploy`) so a deploy can't fail on DB
> connectivity. Run the schema step once against your live DB before/after the
> first deploy.

## Deployment — Hostinger Business (Node.js) + Supabase

Hostinger runs a persistent Node server (`next start`), so this is a standard long-running deploy.

1. Push to GitHub.
2. hPanel → create a Node.js web app (framework: Next.js), connect the repo + branch.
3. Node version **20.x**; build command `npm run build`, start command `npm start`.
4. Add **all** env vars from `.env.example` in the app's Environment Variables panel. Set `AUTH_URL`
   to your live domain (e.g. `https://absolutefitnessstudio.co.za`).
5. **Create the database schema once** (the build does *not* do this). From your machine, with the
   real Supabase strings in `.env`, run `npm run db:push` — this creates all the tables in Supabase.
   Optionally `npm run db:seed` to add the demo member. (You only repeat this when the schema changes.)
6. Map your domain (Hostinger handles SSL).
7. Update OAuth redirect URIs to
   `https://YOUR-DOMAIN/api/auth/callback/{google,facebook}` once you add OAuth.
8. Ship updates by pushing to the connected branch and redeploying from hPanel.

**Two connection strings:** `DATABASE_URL` uses the Supabase pooler (6543) for app runtime; `DIRECT_URL`
uses the direct connection (5432) and is only needed when you run schema commands (`db:push`/`db:deploy`).
Set both in Hostinger's env panel. Because the build no longer connects to the database, a deploy can't
fail on DB connectivity — schema is applied separately in step 5.

After the schema is created, enable **Row Level Security** on the tables in Supabase. Note the free
tier sleeps after ~1 week idle and has no auto-backups — upgrade to Pro once you have real members.

## Project structure

```
src/
  app/                 # routes: marketing, /login /signup, /dashboard/*, /api/*
  components/
    ui/                # design system (Button, Card, PlayControl ★, VideoLightbox, …)
    chrome/            # NavBar, MobileMenu, Footer, UserMenu, Wordmark
    marketing/         # Hero, sections, ClassCard, BlogCard, GalleryGrid, ContactForm
    auth/              # AuthForm, OAuthButtons, AuthShell, SessionProvider
    dashboard/         # DashboardNav, ProfileForms, StatusBadge, FeatureLock, CancelButton
    payment/           # PaymentMethodCard, ManualPaymentModal, SubscribeFlow
  lib/                 # plans, blog, legal, media, site, prisma, email, user, utils
  auth.ts              # Auth.js config (guarded OAuth + credentials)
  auth.config.ts       # edge-safe config for middleware
  middleware.ts        # protects /dashboard
prisma/                # schema.prisma + seed.ts
```
