"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Closing call-to-action band with email capture (PROMPT §3.1.7). */
export function CTABand() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter signup",
          email,
          message: "Email capture from the home CTA band — wants to start.",
          source: "cta-band",
        }),
      });
    } catch {
      // Non-blocking: the console.log fallback on the server still records it.
    }
    setState("done");
  }

  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-surface px-6 py-14 text-center shadow-card sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
          />
          <span className="eyebrow">Ready to start?</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-text-bright sm:text-4xl">
            Your first session is the hardest. Take it with us.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-muted">
            Drop your email and we&apos;ll reach out to get you booked in — no pressure, no spam.
          </p>

          {state === "done" ? (
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-pill bg-accent/15 px-5 py-3 text-sm font-bold text-accent">
              <Check size={18} /> Thanks — we&apos;ll be in touch shortly.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="cta-email" className="sr-only">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="input-pill flex-1"
              />
              <Button type="submit" variant="primary" size="lg" disabled={state === "loading"}>
                {state === "loading" ? "Sending…" : "Join Now"}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
