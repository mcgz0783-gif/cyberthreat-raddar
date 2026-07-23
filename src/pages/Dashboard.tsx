import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";

type Row = {
  id: string;
  book_id: string;
  created_at: string;
  status: string;
  books: { title: string; slug: string; cover_path: string | null } | null;
};

const PAGE_SIZE = 9;

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const [items, setItems] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    supabase.from("purchases")
      .select("id, book_id, created_at, status, books(title, slug, cover_path)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => { if (!error && data) setItems(data as Row[]); });
  }, [user]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p => (p.books?.title || "").toLowerCase().includes(q));
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [search]);

  const download = async (bookId: string) => {
    setBusy(bookId);
    try {
      const { data, error } = await supabase.functions.invoke("download-book", { body: { book_id: bookId } });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
      else throw new Error("No download URL returned");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Download failed");
    } finally { setBusy(null); }
  };

  if (loading) return <div className="container mx-auto px-6 py-24">Loading…</div>;
  if (!user) return <Navigate to="/auth?next=/dashboard" replace />;

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO title="My Library · CyberHawk UG" description="Your purchased books, downloads, and account." path="/dashboard" />
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-white text-3xl">My Library</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <button className="btn-ghost-cyber px-4 py-2 text-xs" onClick={signOut}>Sign out</button>
      </div>

      <div className="mb-6">
        <input
          className="input-cyber w-full md:max-w-md"
          placeholder="Search your library…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">{items.length === 0 ? "You have no purchases yet." : "No books match your search."}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map(p => {
              const revoked = p.status !== "active";
              return (
                <div key={p.id} className="card-cyber p-5">
                  <h3 className="font-display font-bold text-white text-base mb-2">{p.books?.title || "Untitled"}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground mb-4">
                    Purchased {new Date(p.created_at).toLocaleDateString()}
                    {revoked && <span className="ml-2 text-warning uppercase">· {p.status}</span>}
                  </p>
                  <div className="flex gap-2">
                    <a href={`/books/${p.books?.slug || p.book_id}`} className="btn-ghost-cyber flex-1 text-[11px] py-2 text-center">📖 Read</a>
                    <button
                      className="btn-cyber flex-1 text-[11px] py-2 disabled:opacity-50"
                      disabled={busy === p.book_id || revoked}
                      onClick={() => download(p.book_id)}
                    >
                      {busy === p.book_id ? "…" : "⬇ Download"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 font-mono text-xs">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-ghost-cyber px-3 py-1.5 disabled:opacity-40">← Prev</button>
              <span className="text-muted-foreground">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn-ghost-cyber px-3 py-1.5 disabled:opacity-40">Next →</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
