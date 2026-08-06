import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, supabaseForUser, toolError } from "../supabase";

const FORBIDDEN =
  /\b(drop\s+database|alter\s+database|drop\s+schema\s+(auth|storage|realtime|vault|supabase_functions)|pg_read_file|pg_ls_dir|copy\s+.*\bfrom\s+program)\b/i;
const PROTECTED_SCHEMA = /\b(auth|storage|realtime|vault|supabase_functions)\s*\./i;

export default defineTool({
  name: "db_execute",
  title: "Run a database change or migration",
  description:
    "Run INSERT/UPDATE/DELETE or DDL (CREATE/ALTER/DROP TABLE, policies, functions, triggers) against the app database. Admin role required. Destructive — statements are executed exactly as given.",
  inputSchema: {
    sql: z
      .string()
      .min(1)
      .describe("SQL to execute. Multiple statements separated by semicolons run in one transaction."),
    confirm: z
      .boolean()
      .describe("Must be true. Guards against accidental execution of destructive SQL."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  handler: async ({ sql, confirm }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return toolError(denied);
    if (!confirm) return toolError("Refused: set confirm=true to run a database-changing statement.");

    const stmt = sql.trim();
    if (FORBIDDEN.test(stmt)) return toolError("Statement rejected by safety filter.");
    if (PROTECTED_SCHEMA.test(stmt)) {
      return toolError("Refused: managed schemas (auth, storage, realtime, vault, supabase_functions) cannot be modified.");
    }

    try {
      const supabase = supabaseForUser(ctx);
      const { data, error } = await supabase.rpc("mcp_admin_execute", { sql: stmt });
      if (error) return toolError(`Execution failed: ${error.message}`);
      return {
        content: [{ type: "text", text: `Executed successfully (${data}).` }],
        structuredContent: { status: data },
      };
    } catch (e) {
      return toolError(`Execution failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  },
});
