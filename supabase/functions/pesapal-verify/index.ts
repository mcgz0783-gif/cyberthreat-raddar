import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

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

async function sendReceipt(admin: any, order: any) {
  try {
    const { data: book } = await admin.from("books").select("title, file_path").eq("id", order.book_id).maybeSingle();
    const { data: profile } = await admin.from("profiles").select("email, full_name").eq("id", order.user_id).maybeSingle();
    if (!profile?.email) return;

    let downloadUrl: string | null = null;
    if (book?.file_path) {
      const { data: signed } = await admin.storage.from("book-files").createSignedUrl(book.file_path, SIGNED_URL_TTL_SECONDS, { download: true });
      downloadUrl = signed?.signedUrl ?? null;
    }

    const priceLabel = new Intl.NumberFormat("en-US", { style: "currency", currency: order.currency }).format(order.amount_cents / 100);
    // Best-effort — succeeds once email infra is configured. Does not fail the payment flow.
    await admin.functions.invoke("send-transactional-email", {
      body: {
        templateName: "purchase-receipt",
        recipientEmail: profile.email,
        idempotencyKey: `receipt-${order.id}`,
        templateData: {
          name: profile.full_name || "Reader",
          bookTitle: book?.title || "Your book",
          price: priceLabel,
          orderId: order.id,
          downloadUrl,
          downloadExpiresMinutes: Math.round(SIGNED_URL_TTL_SECONDS / 60),
          libraryUrl: `${Deno.env.get("SUPABASE_URL") ? "https://www.cyberhawk-ug.store" : ""}/dashboard`,
        },
      },
    });
  } catch (e) {
    console.warn("Receipt email skipped:", (e as Error).message);
  }
}

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
      await sendReceipt(admin, order);
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
