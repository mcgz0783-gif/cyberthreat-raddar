import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

/**
 * Helper to get a Google OAuth2 access token for a service account in Deno/Edge Functions.
 */
async function getAccessToken(serviceAccountKey: any, scopes: string[]) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccountKey.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedClaim = btoa(JSON.stringify(claim));
  const stringToSign = `${encodedHeader}.${encodedClaim}`;

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    new Uint8Array(
      atob(serviceAccountKey.private_key.replace(/-----(BEGIN|END) PRIVATE KEY-----|\n/g, ""))
        .split("")
        .map((c) => c.charCodeAt(0))
    ),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(stringToSign)
  );

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${stringToSign}.${encodedSignature}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json();
  if (data.error) throw new Error(`OAuth failed: ${data.error_description || data.error}`);
  return data.access_token;
}

export default defineTool({
  name: "send_email",
  title: "Send Email (Gmail)",
  description: "Send an email via the Gmail API using a service account. Note: Requires domain-wide delegation or a configured admin user.",
  inputSchema: {
    to: z.string().email().describe("Recipient email address."),
    subject: z.string().min(1).describe("Email subject."),
    body: z.string().min(1).describe("Email body (text)."),
    from: z.string().email().optional().describe("Sender email (if using domain-wide delegation)."),
  },
  handler: async ({ to, subject, body, from }) => {
    try {
      const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
      if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured in environment.");
      const key = JSON.parse(keyJson);

      const token = await getAccessToken(key, ["https://www.googleapis.com/auth/gmail.send"]);

      // Gmail API expects a base64url encoded raw message
      const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
      const email = [
        `To: ${to}`,
        from ? `From: ${from}` : "",
        `Subject: ${utf8Subject}`,
        "Content-Type: text/plain; charset=utf-8",
        "",
        body,
      ].join("\n").trim();

      const encodedEmail = btoa(unescape(encodeURIComponent(email)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(from || "me")}/messages/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: encodedEmail }),
      });

      if (!response.ok) {
        const err = await response.json();
        return { content: [{ type: "text", text: `Gmail API Error: ${JSON.stringify(err)}` }], isError: true };
      }

      return { content: [{ type: "text", text: `✅ Email sent successfully to ${to}` }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `Failed to send email: ${e.message}` }], isError: true };
    }
  },
});
