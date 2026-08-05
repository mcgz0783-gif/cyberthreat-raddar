/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />


// MCP tool files run in the Supabase Edge (Deno) runtime at deploy time.
// Declare a minimal Deno global so the Vite/browser TS build passes.
declare const Deno: {
  env: { get(key: string): string | undefined };
};
