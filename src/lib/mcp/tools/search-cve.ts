import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

interface CVEItem {
  cve: {
    id: string;
    descriptions: { lang: string; value: string }[];
    metrics?: {
      cvssMetricV31?: { cvssData: { baseScore: number; baseSeverity: string } }[];
      cvssMetricV30?: { cvssData: { baseScore: number; baseSeverity: string } }[];
    };
  };
}

export default defineTool({
  name: "search_cve",
  title: "Search CVE database",
  description:
    "Search the NIST National Vulnerability Database for CVEs by ID (e.g. CVE-2024-3094) or keyword (e.g. openssh). Returns up to 10 matches with CVSS score and description.",
  inputSchema: {
    query: z.string().min(1).describe("CVE ID or free-text keyword."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ query }) => {
    const q = query.trim();
    const isCve = /^CVE-\d{4}-\d{4,}$/i.test(q);
    const url = isCve
      ? `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${encodeURIComponent(q.toUpperCase())}`
      : `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(q)}&resultsPerPage=10`;
    try {
      const r = await fetch(url);
      if (!r.ok) {
        return { content: [{ type: "text", text: `NVD request failed: ${r.status}` }], isError: true };
      }
      const data = (await r.json()) as { vulnerabilities?: CVEItem[] };
      const items = (data.vulnerabilities || []).map((v) => {
        const c = v.cve;
        const desc = c.descriptions?.find((d) => d.lang === "en")?.value || "";
        const m =
          c.metrics?.cvssMetricV31?.[0]?.cvssData || c.metrics?.cvssMetricV30?.[0]?.cvssData;
        return { id: c.id, cvss: m?.baseScore, severity: m?.baseSeverity, description: desc };
      });
      return {
        content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
        structuredContent: { results: items },
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Lookup failed: ${(e as Error).message}` }],
        isError: true,
      };
    }
  },
});
