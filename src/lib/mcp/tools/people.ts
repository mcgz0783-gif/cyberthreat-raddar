import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

/**
 * Helper to get a Google OAuth2 access token for a service account in Deno/Edge Functions.
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
  name: "list_contacts",
  title: "List Contacts (People API)",
  description: "Retrieve a list of contacts from Google People API.",
  inputSchema: {
    pageSize: z.number().min(1).max(100).default(10).describe("Number of contacts to retrieve."),
  },
  handler: async ({ pageSize }) => {
    try {
      const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
      if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured.");
      const key = JSON.parse(keyJson);

      const token = await getAccessToken(key, ["https://www.googleapis.com/auth/contacts.readonly"]);

      const response = await fetch(`https://people.googleapis.com/v1/people/me/connections?pageSize=${pageSize}&personFields=names,emailAddresses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        return { content: [{ type: "text", text: `People API Error: ${JSON.stringify(err)}` }], isError: true };
      }

      const result = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(result.connections || [], null, 2) }],
        structuredContent: result,
      };
    } catch (e: unknown) {
      return { 
        content: [{ type: "text", text: `Failed to list contacts: ${e instanceof Error ? e.message : String(e)}` }], 
        isError: true 
      };
    }
  },
});
