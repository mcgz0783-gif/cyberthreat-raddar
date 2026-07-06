import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";

type Row = { id: string; book_id: string; created_at: string; books: { title: string; cover_path: string | null } | null };

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const [items, setItems] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("purchases").select("id, book_id, created_at, books(title, cover_path)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => { if (!error && data) setItems(data as any); });
  }, [user]);

  const download = async (bookId: string) => {
    setBusy(bookId);
    try {
      const { data, error } = await supabase.functions.invoke("download-book", { body: { book_id: bookId } });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      else throw new Error("No download URL returned");
    } catch (e: any) {
      toast.error(e.message || "Download failed");
    } finally { setBusy(null); }
  };

  if (loading) return <div className="container mx-auto px-6 py-24">Loading…</div>;
  if (!user) return <Navigate to="/auth?next=/dashboard" replace />;

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO title="My Dashboard" description="Your purchased books, downloads, and account." path="/dashboard" />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-3xl">My Library</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <button className="btn-ghost-cyber px-4 py-2 text-xs" onClick={signOut}>Sign out</button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">You have no purchases yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <div key={p.id} className="card-cyber p-5">
              <h3 className="font-display font-bold text-white text-base mb-2">{p.books?.title || "Untitled"}</h3>
              <p className="font-mono text-[11px] text-muted-foreground mb-4">Purchased {new Date(p.created_at).toLocaleDateString()}</p>
              <button className="btn-cyber w-full text-[11px] py-2" disabled={busy === p.book_id} onClick={() => download(p.book_id)}>
                {busy === p.book_id ? "Preparing…" : "⬇ DOWNLOAD"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
