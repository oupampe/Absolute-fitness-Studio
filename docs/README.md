# Absolute Fitness Studio — Claude Code build bundle

Hand all four files to Claude Code. `PROMPT.md` is the brief; the other three are the source-of-truth
starter files it references.

## Files
- **PROMPT.md** — the full build brief (design system, pages, auth, member portal, manual payment
  flow, deployment). Paste this into Claude Code first.
- **DESIGN.md** — the authoritative design spec: Spotify-structured (content-first darkness,
  pill/circle geometry, heavy shadows) with your Green `#1ed760` as the single accent. Keep at repo
  root; Claude Code reads it before building any UI.
- **schema.prisma** — drop into `prisma/schema.prisma`.
- **.env.example** — copy to `.env` and fill in.
- **plans.ts** — drop into `src/lib/plans.ts`.

## How to run it (after Claude Code generates the app)
1. Create a free Supabase project; save the DB password.
2. Supabase dashboard → **Connect → ORM tab → Prisma**; copy BOTH connection strings.
3. `cp .env.example .env`, paste in `DATABASE_URL` (port 6543) and `DIRECT_URL` (port 5432),
   then run `npx auth secret` and paste the result into `AUTH_SECRET`.
4. `npx prisma migrate dev` → `npm run db:seed` → `npm run dev`.
5. The site runs fully on email/password + manual payments with no other keys.

## Add later (optional)
- **Google / Facebook login:** create OAuth apps, paste the IDs into `.env`. Buttons activate automatically.
- **Email delivery:** add `RESEND_API_KEY`. Until then, payment requests log to the console.
- **Online card payments:** wired as a disabled "Coming soon" option; integrate Paystack/Stripe later.

## Going live (Hostinger Business + Supabase)
- Push to GitHub → in hPanel create a Node.js web app, framework Next.js, connect the repo + branch.
- Set Node to 20.x. Build command `npm run build` (runs `prisma generate && prisma migrate deploy &&
  next build`); start command `npm start` (`next start -p $PORT`).
- Add all env vars in the Node.js app's Environment Variables panel; set `AUTH_URL` to your live domain.
- Map your domain in hPanel (SSL handled automatically). Update OAuth redirect URIs to
  `https://YOUR-DOMAIN/api/auth/callback/{google,facebook}`.
- To ship updates: push to the connected branch and redeploy from hPanel.
- Note: Supabase free tier sleeps after ~1 week idle and has no auto-backups. The Hostinger app stays
  up regardless; upgrade Supabase to Pro ($25/mo) once you have real members so the database is
  always-on and backed up.
