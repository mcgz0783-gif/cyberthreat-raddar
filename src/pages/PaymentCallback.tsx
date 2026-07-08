import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";

type Status = "checking" | "success" | "pending" | "failed";

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("checking");
  const [bookId, setBookId] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const tracking = params.get("OrderTrackingId") || params.get("orderTrackingId");

  useEffect(() => {
    if (!tracking) { setStatus("failed"); return; }
    supabase.functions.invoke("pesapal-verify", { body: { tracking_id: tracking } })
      .then(async ({ data, error }) => {
        if (error) return setStatus("failed");
        const s: Status = data?.status === "completed" ? "success"
          : data?.status === "failed" ? "failed" : "pending";
        setStatus(s);
        // Look up the book associated with this tracking id so retry works
        const { data: order } = await supabase
          .from("orders")
          .select("book_id")
          .eq("pesapal_tracking_id", tracking)
          .maybeSingle();
        if (order?.book_id) setBookId(order.book_id);
      });
  }, [tracking]);

  const retry = async () => {
    if (!bookId) return toast.error("Original order not found. Please choose the book again.");
    setRetrying(true);
    try {
      const { data, error } = await supabase.functions.invoke("pesapal-initiate", { body: { book_id: bookId } });
      if (error) throw error;
      if (data?.redirect_url) window.location.href = data.redirect_url;
      else throw new Error(data?.error || "Could not start checkout");
    } catch (e: any) {
      toast.error(e.message || "Retry failed");
      setRetrying(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-24 max-w-lg text-center">
      <SEO title="Payment status" description="Payment verification" path="/payment/callback" />
      <div className="card-cyber p-10">
        {status === "checking" && <p>Verifying your payment…</p>}

        {status === "success" && <>
          <h1 className="font-display font-bold text-2xl text-white mb-3">✓ Payment received</h1>
          <p className="text-muted-foreground mb-6">Your book is ready in your library.</p>
          <Link to="/dashboard" className="btn-cyber inline-block px-6 py-2">Go to Library</Link>
        </>}

        {status === "pending" && <>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Payment pending</h1>
          <p className="text-muted-foreground mb-6">
            Pesapal hasn't confirmed the charge yet. Your library will unlock automatically once it does.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="btn-ghost-cyber px-5 py-2 text-xs">Go to Library</Link>
            <button className="btn-cyber px-5 py-2 text-xs" onClick={() => window.location.reload()}>Refresh status</button>
          </div>
        </>}

        {status === "failed" && <>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Payment failed</h1>
          <p className="text-muted-foreground mb-6">
            Your card was not charged and the ebook has not been unlocked. You can retry checkout below.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={retry}
              disabled={retrying || !bookId}
              className="btn-cyber px-6 py-2 text-xs disabled:opacity-50"
            >
              {retrying ? "Starting…" : "Retry payment"}
            </button>
            <button className="btn-ghost-cyber px-5 py-2 text-xs" onClick={() => navigate("/books")}>
              Back to books
            </button>
          </div>
        </>}
      </div>
    </section>
  );
}
