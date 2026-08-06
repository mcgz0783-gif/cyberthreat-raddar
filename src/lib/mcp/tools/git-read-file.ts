import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, toolError } from "../supabase";
import { fromBase64, gh, resolveRepo } from "../github";

export default defineTool({
  name: "git_read_file",
  title: "Read a file from the repository",
  description:
    "Read a file's text content from a branch of the connected GitHub repository. Admin role required.",
  inputSchema: {
    path: z.string().min(1).describe("Repository-relative file path, e.g. src/App.tsx"),
    repo: z.string().describe("Repository as owner/name. Defaults to the configured repo.").optional(),
    branch: z.string().describe("Branch name. Defaults to main.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ path, repo, branch }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return toolError(denied);
    try {
      const slug = resolveRepo(repo);
      const ref = branch?.trim() || "main";
      const data = await gh<{ content?: string; sha: string; type: string }>(
        `/repos/${slug}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`,
      );
      if (!data.content) return toolError(`Not a file: ${path}`);
      const text = fromBase64(data.content);
      return {
        content: [{ type: "text", text }],
        structuredContent: { path, sha: data.sha, branch: ref },
      };
    } catch (e) {
      return toolError(`Read failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  },
});
