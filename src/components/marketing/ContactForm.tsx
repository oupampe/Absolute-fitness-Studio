"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Contact form → POST /api/contact (console.log fallback if no email key). */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-card bg-surface p-8 shadow-card">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={24} />
        </span>
        <h3 className="text-feature-heading text-text-bright">Message sent</h3>
        <p className="text-sm text-text-muted">
          Thanks for reaching out — we&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold text-text">
          Name
        </label>
        <input id="name" required value={form.name} onChange={update("name")} className="input-pill" placeholder="Your name" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold text-text">
          Email
        </label>
        <input id="email" type="email" required value={form.email} onChange={update("email")} className="input-pill" placeholder="you@email.com" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-bold text-text">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="How can we help?"
          className="w-full rounded-card bg-surface-2 px-4 py-3 text-text placeholder:text-text-muted shadow-inset focus:outline focus:outline-1 focus:outline-accent"
        />
      </div>

      {state === "error" ? <p className="text-sm text-negative">{error}</p> : null}

      <Button type="submit" variant="primary" size="lg" disabled={state === "loading"} className="mt-2 self-start">
        {state === "loading" ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}
