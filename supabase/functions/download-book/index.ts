import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: u } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!u.user) return json({ error: "Unauthorized" }, 401);

    const { book_id } = await req.json();
    if (!book_id) return json({ error: "book_id required" }, 400);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    // Verify purchase
    const { data: purchase } = await admin.from("purchases").select("id").eq("user_id", u.user.id).eq("book_id", book_id).maybeSingle();
    if (!purchase) return json({ error: "Not purchased" }, 403);

    const { data: book } = await admin.from("books").select("file_path, title").eq("id", book_id).maybeSingle();
    if (!book?.file_path) return json({ error: "File unavailable" }, 404);

    // 1 hour window — matches the emailed receipt link so both share the same lifetime.
    const { data: signed, error: sErr } = await admin.storage.from("book-files").createSignedUrl(book.file_path, 3600, { download: true });
    if (sErr || !signed) return json({ error: "Could not sign URL" }, 500);

    await admin.from("downloads").insert({
      user_id: u.user.id, book_id,
      ip: req.headers.get("x-forwarded-for") || null,
      user_agent: req.headers.get("user-agent") || null,
    });
    return json({ url: signed.signedUrl });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
