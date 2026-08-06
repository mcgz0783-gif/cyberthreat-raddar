import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, supabaseForUser, toolError } from "../supabase";

const FORBIDDEN = /\b(drop\s+database|alter\s+database|pg_read_file|pg_ls_dir|copy\s+.*\bfrom\s+program)\b/i;

export default defineTool({
  name: "db_query",
  title: "Run a read-only database query",
  description:
    "Run a single SELECT (or WITH ... SELECT) statement against the app database and return rows as JSON. Admin role required. Use db_execute for changes.",
  inputSchema: {
    sql: z.string().min(1).describe("A single SELECT or WITH ... SELECT statement. No semicolon needed."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ sql }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return toolError(denied);

    const stmt = sql.trim().replace(/;\s*$/, "");
    if (!/^(select|with)\b/i.test(stmt)) {
      return toolError("db_query only accepts SELECT or WITH ... SELECT. Use db_execute for writes.");
    }
    if (stmt.includes(";")) return toolError("Only one statement allowed.");
    if (FORBIDDEN.test(stmt)) return toolError("Statement rejected by safety filter.");

    try {
      const supabase = supabaseForUser(ctx);
      const { data, error } = await supabase.rpc("mcp_admin_query", { sql: stmt });
      if (error) return toolError(`Query failed: ${error.message}`);
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: { rows: data },
      };
    } catch (e) {
      return toolError(`Query failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  },
});
