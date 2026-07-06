import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"checking" | "success" | "pending" | "failed">("checking");

  useEffect(() => {
    const tracking = params.get("OrderTrackingId") || params.get("orderTrackingId");
    if (!tracking) { setStatus("failed"); return; }
    supabase.functions.invoke("pesapal-verify", { body: { tracking_id: tracking } })
      .then(({ data, error }) => {
        if (error) return setStatus("failed");
        if (data?.status === "completed") setStatus("success");
        else if (data?.status === "failed") setStatus("failed");
        else setStatus("pending");
      });
  }, [params]);

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
          <p className="text-muted-foreground">We'll update your library as soon as Pesapal confirms.</p>
        </>}
        {status === "failed" && <>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Payment failed</h1>
          <p className="text-muted-foreground">Please try again or contact support.</p>
        </>}
      </div>
    </section>
  );
}
