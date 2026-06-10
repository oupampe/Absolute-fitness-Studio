"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";

/** Cancel the current subscription (sets status CANCELLED). */
export async function cancelSubscription() {
  const user = await getCurrentUser();
  if (!user) return { error: "Not signed in." };
  if (!user.subscription) return { error: "No subscription to cancel." };

  await prisma.subscription.update({
    where: { userId: user.id },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/dashboard/subscription");
  revalidatePath("/dashboard");
  return { ok: true };
}
