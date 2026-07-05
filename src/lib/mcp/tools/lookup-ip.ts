import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "lookup_ip",
  title: "IP reputation and geolocation",
  description:
    "Resolve an IPv4/IPv6 address to geolocation and ASN/org info via ipapi.co. Read-only.",
  inputSchema: {
    ip: z.string().min(1).describe("The IP address to look up."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ ip }) => {
    try {
      const r = await fetch(`https://ipapi.co/${encodeURIComponent(ip.trim())}/json/`);
      if (!r.ok) {
        return {
          content: [{ type: "text", text: `Lookup failed: ${r.status}` }],
          isError: true,
        };
      }
      const data = await r.json();
      if (data.error) {
        return {
          content: [{ type: "text", text: `Invalid IP: ${data.reason || "unknown"}` }],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: data,
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Lookup failed: ${(e as Error).message}` }],
        isError: true,
      };
    }
  },
});
