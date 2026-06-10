"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  updateProfile,
  changePassword,
  type ActionState,
} from "@/app/dashboard/profile/actions";

const initial: ActionState = {};

export function ProfileForms({
  defaults,
  hasPassword,
}: {
  defaults: { name: string; phone: string; image: string; email: string };
  hasPassword: boolean;
}) {
  const [profileState, profileAction] = useFormState(updateProfile, initial);
  const [pwState, pwAction] = useFormState(changePassword, initial);

  return (
    <div className="flex flex-col gap-8">
      {/* Profile details */}
      <form action={profileAction} className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-card sm:p-8">
        <h2 className="text-feature-heading text-text-bright">Profile details</h2>

        <Field id="name" name="name" label="Name" defaultValue={defaults.name} required />
        <Field id="email" name="email" label="Email" defaultValue={defaults.email} disabled />
        <Field id="phone" name="phone" label="Phone" defaultValue={defaults.phone} placeholder="+27 ..." />
        <Field id="image" name="image" label="Avatar URL" defaultValue={defaults.image} placeholder="https://…" />

        <FormFeedback state={profileState} />
        <SubmitButton label="Save Changes" />
      </form>

      {/* Change password */}
      <form action={pwAction} className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-card sm:p-8">
        <h2 className="text-feature-heading text-text-bright">Change password</h2>
        {hasPassword ? (
          <>
            <Field id="current" name="current" label="Current password" type="password" autoComplete="current-password" required />
            <Field id="next" name="next" label="New password" type="password" autoComplete="new-password" required />
            <FormFeedback state={pwState} />
            <SubmitButton label="Update Password" />
          </>
        ) : (
          <p className="text-sm text-text-muted">
            Your account uses social login, so there&apos;s no password to change.
          </p>
        )}
      </form>
    </div>
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
      <input id={id} className="input-pill disabled:opacity-60" {...props} />
    </div>
  );
}

function FormFeedback({ state }: { state: ActionState }) {
  if (state.error) return <p className="text-sm text-negative">{state.error}</p>;
  if (state.message)
    return (
      <p className="inline-flex items-center gap-1.5 text-sm text-accent">
        <Check size={15} /> {state.message}
      </p>
    );
  return null;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="md" disabled={pending} className="self-start">
      {pending ? "Saving…" : label}
    </Button>
  );
}
