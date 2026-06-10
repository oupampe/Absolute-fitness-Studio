"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

/** Email/password form for both /login and /signup. */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Could not create your account.");
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          mode === "login" ? "Invalid email or password." : "Account created — please log in.",
        );
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {mode === "signup" ? (
        <Field id="name" label="Name" value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" required />
      ) : null}

      <Field id="email" label="Email" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" autoComplete="email" required />

      {mode === "signup" ? (
        <Field id="phone" label="Phone (optional)" type="tel" value={form.phone} onChange={update("phone")} placeholder="+27 ..." autoComplete="tel" />
      ) : null}

      <Field
        id="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={update("password")}
        placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
        required
      />

      {mode === "login" ? (
        <a href="/forgot-password" className="-mt-1 self-end text-xs text-text-muted transition hover:text-text">
          Forgot password?
        </a>
      ) : null}

      {error ? <p className="text-sm text-negative">{error}</p> : null}

      <Button type="submit" variant="primary" size="lg" disabled={loading} className="mt-1 w-full">
        {loading ? "Please wait…" : mode === "signup" ? "Sign up with email" : "Log in"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-text">
        {label}
      </label>
      <input id={id} className="input-pill" {...props} />
    </div>
  );
}
