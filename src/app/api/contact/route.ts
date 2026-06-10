import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { SITE } from "@/lib/site";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("A valid email is required"),
  message: z.string().min(1, "Message is required").max(4000),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { name, email, message, source } = parsed.data;

  const result = await sendEmail({
    to: SITE.email,
    subject: `New ${source === "cta-band" ? "lead" : "contact message"} — ${name}`,
    replyTo: email,
    text: [
      `Name:   ${name}`,
      `Email:  ${email}`,
      source ? `Source: ${source}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Could not send right now. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
