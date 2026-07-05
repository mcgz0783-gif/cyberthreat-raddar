import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

async function sha1Hex(text: string) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default defineTool({
  name: "check_password_breach",
  title: "Check password against breach database",
  description:
    "Check whether a password appears in known breaches using the HaveIBeenPwned k-anonymity API. Only the first 5 chars of the SHA-1 hash leave the server.",
  inputSchema: {
    password: z.string().min(1).describe("Password to check. Never logged; only its hash prefix is sent."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ password }) => {
    try {
      const h = (await sha1Hex(password)).toUpperCase();
      const r = await fetch(`https://api.pwnedpasswords.com/range/${h.slice(0, 5)}`);
      if (!r.ok) {
        return { content: [{ type: "text", text: `Breach lookup failed: ${r.status}` }], isError: true };
      }
      const body = await r.text();
      const suffix = h.slice(5);
      const hit = body.split("\n").find((l) => l.startsWith(suffix));
      const count = hit ? parseInt(hit.split(":")[1], 10) : 0;
      const msg =
        count > 0
          ? `Password found in ${count.toLocaleString()} known breaches. Do NOT use it.`
          : "Password not found in known breach corpora.";
      return {
        content: [{ type: "text", text: msg }],
        structuredContent: { breached: count > 0, count },
      };
    } catch (e) {
      return { content: [{ type: "text", text: `Lookup failed: ${(e as Error).message}` }], isError: true };
    }
  },
});
