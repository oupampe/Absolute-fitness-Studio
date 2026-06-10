import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** The signed-in user with their subscription, or null. */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
