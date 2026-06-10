"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";

const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  phone: z.string().max(40).optional().or(z.literal("")),
  image: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
});

export type ActionState = { ok?: boolean; error?: string; message?: string };

export async function updateProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Not signed in." };

  const parsed = ProfileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone") ?? "",
    image: formData.get("image") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      image: parsed.data.image || null,
    },
  });

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  return { ok: true, message: "Profile updated." };
}

const PasswordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    next: z.string().min(8, "New password must be at least 8 characters"),
  });

export async function changePassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Not signed in." };
  if (!user.passwordHash) {
    return { error: "Your account uses social login, so there's no password to change." };
  }

  const parsed = PasswordSchema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const valid = await bcrypt.compare(parsed.data.current, user.passwordHash);
  if (!valid) return { error: "Your current password is incorrect." };

  const passwordHash = await bcrypt.hash(parsed.data.next, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return { ok: true, message: "Password changed." };
}
