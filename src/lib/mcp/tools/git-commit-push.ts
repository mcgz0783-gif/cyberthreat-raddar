import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, toolError } from "../supabase";
import { gh, resolveRepo, toBase64 } from "../github";

interface RefResponse {
  object: { sha: string };
}
interface CommitResponse {
  sha: string;
  tree: { sha: string };
  html_url?: string;
}

export default defineTool({
  name: "git_commit_push",
  title: "Commit files and push",
  description:
    "Commit one or more files to the connected GitHub repository and push to a branch (default main). Creates a single commit containing every file given. Admin role required.",
  inputSchema: {
    message: z.string().min(1).describe("Commit message."),
    files: z
      .array(
        z.object({
          path: z.string().min(1).describe("Repository-relative path."),
          content: z.string().describe("Full new file content (UTF-8). Replaces the file."),
        }),
      )
      .min(1)
      .describe("Files to add or replace in this commit."),
    repo: z.string().describe("Repository as owner/name. Defaults to the configured repo.").optional(),
    branch: z.string().describe("Target branch. Defaults to main.").optional(),
    confirm: z.boolean().describe("Must be true. Guards against accidental pushes."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
  handler: async ({ message, files, repo, branch, confirm }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return toolError(denied);
    if (!confirm) return toolError("Refused: set confirm=true to push a commit.");

    try {
      const slug = resolveRepo(repo);
      const ref = branch?.trim() || "main";

      // 1. current head + base tree
      const head = await gh<RefResponse>(`/repos/${slug}/git/ref/heads/${encodeURIComponent(ref)}`);
      const baseCommit = await gh<CommitResponse>(`/repos/${slug}/git/commits/${head.object.sha}`);

      // 2. blobs
      const tree = await Promise.all(
        files.map(async (f) => {
          const blob = await gh<{ sha: string }>(`/repos/${slug}/git/blobs`, {
            method: "POST",
            body: JSON.stringify({ content: toBase64(f.content), encoding: "base64" }),
          });
          return { path: f.path.replace(/^\/+/, ""), mode: "100644", type: "blob", sha: blob.sha };
        }),
      );

      // 3. tree + commit + fast-forward the branch
      const newTree = await gh<{ sha: string }>(`/repos/${slug}/git/trees`, {
        method: "POST",
        body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }),
      });
      const commit = await gh<CommitResponse>(`/repos/${slug}/git/commits`, {
        method: "POST",
        body: JSON.stringify({ message, tree: newTree.sha, parents: [head.object.sha] }),
      });
      await gh(`/repos/${slug}/git/refs/heads/${encodeURIComponent(ref)}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false }),
      });

      const summary = `Pushed ${files.length} file(s) to ${slug}@${ref} as ${commit.sha.slice(0, 7)}`;
      return {
        content: [{ type: "text", text: summary }],
        structuredContent: { repo: slug, branch: ref, sha: commit.sha, url: commit.html_url, files: files.map((f) => f.path) },
      };
    } catch (e) {
      return toolError(`Push failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  },
});
