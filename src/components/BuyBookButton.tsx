import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function BuyBookButton({ bookId, className, label = "BUY NOW" }: { bookId: string; className?: string; label?: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const buy = async () => {
    if (!user) {
      navigate("/auth?next=" + encodeURIComponent(window.location.pathname));
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("pesapal-initiate", { body: { book_id: bookId } });
      if (error) throw error;
      if (data?.redirect_url) window.location.href = data.redirect_url;
      else throw new Error(data?.error || "Checkout failed");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally { setBusy(false); }
  };

  return (
    <button onClick={buy} disabled={busy} className={className || "btn-cyber text-[11px] py-2"}>
      {busy ? "Loading…" : label}
    </button>
  );
}
