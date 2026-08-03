import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

/**
 * Helper to get a Google OAuth2 access token for a service account in Deno/Edge Functions.
 * Reused from send-email.ts logic.
 */
async function getAccessToken(serviceAccountKey: ServiceAccountKey, scopes: string[]) {
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
  name: "create_calendar_event",
  title: "Create Calendar Event",
  description: "Create a new event in Google Calendar. Note: Requires calendar access.",
  inputSchema: {
    summary: z.string().min(1).describe("Event title/summary."),
    description: z.string().optional().describe("Event description."),
    startDateTime: z.string().describe("Start time in ISO 8601 format (e.g., 2024-07-15T10:00:00Z)."),
    endDateTime: z.string().describe("End time in ISO 8601 format."),
    calendarId: z.string().default("primary").describe("Calendar ID (default is 'primary')."),
  },
  handler: async ({ summary, description, startDateTime, endDateTime, calendarId }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated: sign in via OAuth to use this tool." }], isError: true };
    }
    try {
      const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
      if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured.");
      const key = JSON.parse(keyJson);

      const token = await getAccessToken(key, ["https://www.googleapis.com/auth/calendar.events"]);

      const event = {
        summary,
        description,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime },
      };

      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const err = await response.json();
        return { content: [{ type: "text", text: `Calendar API Error: ${JSON.stringify(err)}` }], isError: true };
      }

      const result = await response.json();
      return { content: [{ type: "text", text: `✅ Event created: ${result.htmlLink}` }] };
    } catch (e: unknown) {
      return { 
        content: [{ type: "text", text: `Failed to create event: ${e instanceof Error ? e.message : String(e)}` }], 
        isError: true 
      };
    }
  },
});
