import { runtimeEnv } from "../supabase";

const API = "https://api.github.com";

export function githubToken(): string {
  const t = runtimeEnv("GITHUB_TOKEN")?.trim();
  if (!t) throw new Error("GITHUB_TOKEN is not configured on the server.");
  return t;
}

export function defaultRepo(): string | undefined {
  return runtimeEnv("GITHUB_REPO")?.trim();
}

export function resolveRepo(repo?: string): string {
  const r = (repo ?? defaultRepo() ?? "").trim();
  if (!/^[\w.-]+\/[\w.-]+$/.test(r)) {
    throw new Error("Repository must be given as `owner/name` (or set the GITHUB_REPO secret).");
  }
  return r;
}

export async function gh<T = unknown>(
  path: string,
  init: RequestInit & { method?: string } = {},
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${text.slice(0, 600)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

export function toBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export function fromBase64(input: string): string {
  const bin = atob(input.replace(/\n/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
