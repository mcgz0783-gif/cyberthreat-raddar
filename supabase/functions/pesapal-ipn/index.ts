import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const PESAPAL_URL = Deno.env.get("PESAPAL_ENVIRONMENT") === "live"
  ? "https://pay.pesapal.com/v3/api"
  : "https://cybqa.pesapal.com/pesapalv3/api";

async function getToken() {
  const r = await fetch(`${PESAPAL_URL}/Auth/RequestToken`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: Deno.env.get("PESAPAL_CONSUMER_KEY"), consumer_secret: Deno.env.get("PESAPAL_CONSUMER_SECRET") }),
  });
  return (await r.json()).token as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const tracking = url.searchParams.get("OrderTrackingId");
    const merchantRef = url.searchParams.get("OrderMerchantReference");
    if (!tracking) return new Response("ok", { headers: corsHeaders });

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = await getToken();
    const sr = await fetch(`${PESAPAL_URL}/Transactions/GetTransactionStatus?orderTrackingId=${tracking}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    const status = await sr.json();

    const { data: order } = await admin.from("orders").select("*").eq("pesapal_tracking_id", tracking).maybeSingle();
    if (!order) return new Response("ok", { headers: corsHeaders });

    const paymentStatus = (status.payment_status_description || "").toUpperCase();
    if (paymentStatus === "COMPLETED") {
      await admin.from("orders").update({ status: "completed" }).eq("id", order.id);
      await admin.from("payments").update({ status: "success", raw_response: status }).eq("order_id", order.id);
      await admin.from("purchases").upsert({ user_id: order.user_id, book_id: order.book_id, order_id: order.id, status: 'active' }, { onConflict: "user_id,book_id" });
    } else if (paymentStatus === "FAILED" || paymentStatus === "INVALID") {
      await admin.from("orders").update({ status: "failed" }).eq("id", order.id);
      await admin.from("payments").update({ status: "failed", raw_response: status }).eq("order_id", order.id);
    }
    return new Response(JSON.stringify({ orderNotificationType: "IPNCHANGE", orderTrackingId: tracking, orderMerchantReference: merchantRef, status: 200 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ipn error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
