// Minimal SMTP sender for transactional notifications.
// Reads credentials from env — never hardcode.
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export async function sendSmtpEmail(input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const host = Deno.env.get("SMTP_HOST");
    const port = Number(Deno.env.get("SMTP_PORT") || "587");
    const user = Deno.env.get("SMTP_USER");
    const pass = Deno.env.get("SMTP_PASSWORD");
    const fromEmail = input.from || Deno.env.get("SMTP_FROM_EMAIL") || user || "";
    const fromName = Deno.env.get("SMTP_FROM_NAME") || "CyberHawk UG";
    const secure = (Deno.env.get("SMTP_SECURE") || "false").toLowerCase() === "true" || port === 465;

    if (!host || !user || !pass || !fromEmail) {
      return { ok: false, error: "smtp_not_configured" };
    }

    const client = new SMTPClient({
      connection: { hostname: host, port, tls: secure, auth: { username: user, password: pass } },
    });

    await client.send({
      from: `${fromName} <${fromEmail}>`,
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      content: input.text || input.html.replace(/<[^>]+>/g, ""),
      html: input.html,
    });
    await client.close();
    return { ok: true };
  } catch (e) {
    console.error("smtp send failed", e);
    return { ok: false, error: (e as Error).message };
  }
}
