import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const PESAPAL_URL = Deno.env.get("PESAPAL_ENVIRONMENT") === "live"
  ? "https://pay.pesapal.com/v3/api"
  : "https://cybqa.pesapal.com/pesapalv3/api";

async function getToken() {
  const r = await fetch(`${PESAPAL_URL}/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: Deno.env.get("PESAPAL_CONSUMER_KEY"),
      consumer_secret: Deno.env.get("PESAPAL_CONSUMER_SECRET"),
    }),
  });
  const j = await r.json();
  if (!j.token) throw new Error("Pesapal auth failed: " + JSON.stringify(j));
  return j.token as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const user = userData.user;

    const { book_id } = await req.json();
    if (!book_id || typeof book_id !== "string") return json({ error: "book_id required" }, 400);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: book, error: bErr } = await admin.from("books").select("id, title, price_cents, currency, published").eq("id", book_id).maybeSingle();
    if (bErr || !book || !book.published) return json({ error: "Book unavailable" }, 404);

    const merchantRef = crypto.randomUUID();
    const { data: order, error: oErr } = await admin.from("orders").insert({
      user_id: user.id, book_id: book.id, amount_cents: book.price_cents,
      currency: book.currency, status: "pending", pesapal_merchant_reference: merchantRef,
    }).select().single();
    if (oErr) throw oErr;

    const token = await getToken();
    const origin = new URL(req.url).origin.replace(/\.supabase\.co$/, ".lovable.app"); // fallback
    const callbackUrl = (Deno.env.get("SITE_URL") || "https://www.cyberhawk-ug.store") + "/payment/callback";
    const notifId = Deno.env.get("PESAPAL_IPN_ID");

    const submit = await fetch(`${PESAPAL_URL}/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        id: merchantRef,
        currency: book.currency,
        amount: book.price_cents / 100,
        description: book.title.slice(0, 100),
        callback_url: callbackUrl,
        notification_id: notifId,
        billing_address: { email_address: user.email },
      }),
    });
    const sd = await submit.json();
    if (!sd.redirect_url) {
      await admin.from("orders").update({ status: "failed" }).eq("id", order.id);
      return json({ error: "Pesapal error", details: sd }, 502);
    }
    await admin.from("orders").update({ pesapal_tracking_id: sd.order_tracking_id }).eq("id", order.id);
    await admin.from("payments").insert({
      order_id: order.id, user_id: user.id, amount_cents: book.price_cents, currency: book.currency,
      status: "pending", provider: "pesapal", provider_reference: sd.order_tracking_id, raw_response: sd,
    });
    return json({ redirect_url: sd.redirect_url, tracking_id: sd.order_tracking_id });
  } catch (e) {
    console.error("initiate error", e);
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
