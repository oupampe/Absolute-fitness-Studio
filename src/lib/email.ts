import { Resend } from "resend";

/**
 * Transactional email helper. Degrades gracefully: if RESEND_API_KEY is absent,
 * the full payload is logged to the console instead of failing (PROMPT §0, §6).
 */

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

const FROM = "Absolute Fitness Studio <onboarding@resend.dev>";

export async function sendEmail({ to, subject, text, replyTo }: SendArgs): Promise<{
  ok: boolean;
  delivered: boolean;
}> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    // No email provider configured — log and succeed so the flow continues.
    console.log(
      [
        "",
        "──────────── EMAIL (console fallback — no RESEND_API_KEY) ────────────",
        `To:       ${to}`,
        replyTo ? `Reply-To: ${replyTo}` : null,
        `Subject:  ${subject}`,
        "",
        text,
        "──────────────────────────────────────────────────────────────────────",
        "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    return { ok: true, delivered: false };
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    return { ok: true, delivered: true };
  } catch (err) {
    console.error("Resend send failed:", err);
    return { ok: false, delivered: false };
  }
}
