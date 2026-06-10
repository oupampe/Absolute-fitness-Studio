/**
 * Seed script — creates a demo member so the dashboard + manual payment flow
 * can be exercised immediately after `npm run db:seed`.
 *
 * The plan catalogue itself lives in code (src/lib/plans.ts) and is referenced
 * by the `Plan` enum, so there is no "plans table" to seed — instead we create a
 * demo user with an ACTIVE subscription to showcase the member portal.
 *
 * Demo login:  member@absolutefitness.co.za  /  password123
 */
import { PrismaClient, Plan, SubStatus, PaymentMethod } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "member@absolutefitness.co.za";
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Demo Member",
      phone: "+27 63 877 1940",
      passwordHash,
    },
  });

  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      plan: Plan.PRIVATE,
      status: SubStatus.ACTIVE,
      paymentMethod: PaymentMethod.MANUAL_EFT,
      startedAt: new Date(),
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`✅ Seeded demo member: ${email} / password123`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
