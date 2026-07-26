import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sendSmtpEmail } from "../_shared/send-smtp-email.ts";


const PESAPAL_URL = Deno.env.get("PESAPAL_ENVIRONMENT") === "live"
  ? "https://pay.pesapal.com/v3/api"
  : "https://cybqa.pesapal.com/pesapalv3/api";

const SIGNED_URL_TTL_SECONDS = 3600; // 1 hour — same window used by /download-book

async function getToken() {
  const r = await fetch(`${PESAPAL_URL}/Auth/RequestToken`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: Deno.env.get("PESAPAL_CONSUMER_KEY"), consumer_secret: Deno.env.get("PESAPAL_CONSUMER_SECRET") }),
  });
  return (await r.json()).token as string;
}

// Email notifications intentionally deferred. Delivery is handled purely via in-app
// library unlock + signed download URLs from the /download-book function.

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { tracking_id } = await req.json();
    if (!tracking_id) return json({ error: "tracking_id required" }, 400);
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = await getToken();
    const sr = await fetch(`${PESAPAL_URL}/Transactions/GetTransactionStatus?orderTrackingId=${tracking_id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    const status = await sr.json();
    const desc = (status.payment_status_description || "").toUpperCase();

    const { data: order } = await admin.from("orders").select("*").eq("pesapal_tracking_id", tracking_id).maybeSingle();
    if (order && desc === "COMPLETED" && order.status !== "completed") {
      await admin.from("orders").update({ status: "completed" }).eq("id", order.id);
      await admin.from("payments").update({ status: "success", raw_response: status }).eq("order_id", order.id);
      await admin.from("purchases").upsert(
        { user_id: order.user_id, book_id: order.book_id, order_id: order.id, status: "active" },
        { onConflict: "user_id,book_id" }
      );
      // Fire-and-forget email notifications; never crash the flow if SMTP fails.
      try {
        const { data: book } = await admin.from("books").select("title,price_cents,currency").eq("id", order.book_id).maybeSingle();
        const { data: userRes } = await admin.auth.admin.getUserById(order.user_id);
        const buyerEmail = userRes?.user?.email;
        const site = Deno.env.get("SITE_URL") || "https://www.cyberhawk-ug.store";
        const amount = book ? `${(book.price_cents / 100).toFixed(2)} ${book.currency}` : "";
        if (buyerEmail && book) {
          await sendSmtpEmail({
            to: buyerEmail,
            subject: `Your CyberHawk UG receipt — ${book.title}`,
            html: `<h2>Thanks for your purchase</h2><p>Your payment of <b>${amount}</b> for <b>${book.title}</b> was received.</p><p>Access your ebook anytime from your <a href="${site}/dashboard">library</a>.</p><hr/><p style="font-size:12px;color:#666">Order ref: ${order.pesapal_merchant_reference}</p>`,
            from: Deno.env.get("PAYMENTS_EMAIL") || Deno.env.get("SMTP_FROM_EMAIL"),
            replyTo: Deno.env.get("SUPPORT_EMAIL"),
          });
        }
        const admin_to = Deno.env.get("ADMIN_EMAIL");
        if (admin_to && book) {
          await sendSmtpEmail({
            to: admin_to,
            subject: `[CyberHawk] New sale: ${book.title} (${amount})`,
            html: `<p>New completed order.</p><ul><li>Book: ${book.title}</li><li>Amount: ${amount}</li><li>Buyer: ${buyerEmail || order.user_id}</li><li>Tracking: ${tracking_id}</li></ul>`,
          });
        }
      } catch (e) {
        console.error("email notify failed (non-fatal)", e);
      }
    }
    const mapped = desc === "COMPLETED" ? "completed" : desc === "FAILED" || desc === "INVALID" ? "failed" : "pending";
    return json({ status: mapped, raw: status });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
