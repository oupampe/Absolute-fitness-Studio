import { NextResponse } from "next/server";
import { z } from "zod";
import { Plan } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";
import { getPlan } from "@/lib/plans";
import { sendEmail } from "@/lib/email";

const PaymentRequestSchema = z.object({
  plan: z.nativeEnum(Plan).refine((p) => p !== "NONE", "Choose a plan"),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(1, "Message is required").max(4000),
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to send a request." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = PaymentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { plan, phone, message } = parsed.data;
  const planInfo = getPlan(plan);
  const amount = planInfo?.amount ?? null;

  // 1. Record the payment request (status NEW).
  await prisma.paymentRequest.create({
    data: { userId: user.id, plan, amount, message },
  });

  // 2. Set the subscription to this plan, PENDING, via manual EFT.
  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: { plan, status: "PENDING", paymentMethod: "MANUAL_EFT" },
    create: { userId: user.id, plan, status: "PENDING", paymentMethod: "MANUAL_EFT" },
  });

  // Keep the user's phone fresh if they supplied one.
  if (phone) {
    await prisma.user.update({ where: { id: user.id }, data: { phone } });
  }

  // 3. Notify the studio (Resend, or console.log fallback if no key).
  const to = process.env.PAYMENT_REQUEST_TO_EMAIL || "absolutefitnessstudio8@gmail.com";
  await sendEmail({
    to,
    subject: `Banking details request — ${planInfo?.name ?? plan}`,
    replyTo: user.email ?? undefined,
    text: [
      `New manual / EFT payment request`,
      "",
      `Plan:   ${planInfo?.name ?? plan} (${planInfo?.priceLabel ?? "—"})`,
      `Name:   ${user.name ?? "—"}`,
      `Email:  ${user.email ?? "—"}`,
      `Phone:  ${phone || user.phone || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
