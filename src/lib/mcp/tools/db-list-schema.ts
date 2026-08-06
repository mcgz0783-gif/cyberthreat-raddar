import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, supabaseForUser, toolError } from "../supabase";

export default defineTool({
  name: "db_list_schema",
  title: "List database schema",
  description:
    "List all tables, columns, types and row-level-security policies in the app's public schema. Admin role required.",
  inputSchema: {
    table: z.string().describe("Optional: limit output to a single table name.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ table }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return toolError(denied);

    const filter = table ? `AND c.table_name = ${quote(table)}` : "";
    const sql = `
      SELECT c.table_name, c.column_name, c.data_type, c.is_nullable, c.column_default
      FROM information_schema.columns c
      JOIN information_schema.tables t
        ON t.table_schema = c.table_schema AND t.table_name = c.table_name
      WHERE c.table_schema = 'public' AND t.table_type = 'BASE TABLE' ${filter}
      ORDER BY c.table_name, c.ordinal_position
    `;

    try {
      const supabase = supabaseForUser(ctx);
      const [cols, pols] = await Promise.all([
        supabase.rpc("mcp_admin_query", { sql }),
        supabase.rpc("mcp_admin_query", {
          sql: `SELECT tablename, policyname, cmd, roles, qual, with_check
                FROM pg_policies WHERE schemaname = 'public'
                ${table ? `AND tablename = ${quote(table)}` : ""}
                ORDER BY tablename, policyname`,
        }),
      ]);
      if (cols.error) return toolError(cols.error.message);
      if (pols.error) return toolError(pols.error.message);
      const payload = { columns: cols.data, policies: pols.data };
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        structuredContent: payload,
      };
    } catch (e) {
      return toolError(`Schema read failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  },
});

function quote(v: string) {
  return `'${v.replace(/'/g, "''")}'`;
}
