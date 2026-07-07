import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";

type BookRow = {
  id: string;
  title: string;
  slug: string;
  price_cents: number;
  currency: string;
  published: boolean;
  preview_only: boolean;
  cover_path: string | null;
  created_at: string;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const [books, setBooks] = useState<BookRow[]>([]);
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("9.99");
  const [currency, setCurrency] = useState("USD");
  const [published, setPublished] = useState(true);
  const [cover, setCover] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("books")
      .select("id, title, slug, price_cents, currency, published, preview_only, cover_path, created_at")
      .order("created_at", { ascending: false });
    if (data) setBooks(data as BookRow[]);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return <div className="container mx-auto px-6 py-24">Loading…</div>;
  if (!user) return <Navigate to="/auth?next=/admin" replace />;
  if (!isAdmin) return (
    <section className="container mx-auto px-6 py-24 text-center">
      <h1 className="font-display font-bold text-2xl text-white mb-2">Not authorized</h1>
      <p className="text-muted-foreground">Your account is not an admin.</p>
    </section>
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return toast.error("Title and book file are required");
    setBusy(true);
    try {
      const slug = slugify(title) + "-" + Math.random().toString(36).slice(2, 6);
      const priceCents = Math.round(parseFloat(price || "0") * 100);
      const ts = Date.now();

      let cover_path: string | null = null;
      if (cover) {
        const ext = cover.name.split(".").pop() || "jpg";
        cover_path = `${slug}-${ts}.${ext}`;
        const { error } = await supabase.storage.from("book-covers").upload(cover_path, cover, { upsert: false });
        if (error) throw error;
      }

      const ext = file.name.split(".").pop() || "pdf";
      const file_path = `${slug}-${ts}.${ext}`;
      const up = await supabase.storage.from("book-files").upload(file_path, file, { upsert: false });
      if (up.error) throw up.error;

      const { error: iErr } = await supabase.from("books").insert({
        title, slug, description, price_cents: priceCents,
        currency, published, cover_path, file_path,
      });
      if (iErr) throw iErr;

      toast.success("Book uploaded");
      setTitle(""); setDescription(""); setCover(null); setFile(null);
      load();
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally { setBusy(false); }
  };

  const togglePublish = async (b: BookRow) => {
    const { error } = await supabase.from("books").update({ published: !b.published }).eq("id", b.id);
    if (error) return toast.error(error.message);
    load();
  };

  const togglePreview = async (b: BookRow) => {
    const { error } = await supabase.from("books").update({ preview_only: !b.preview_only }).eq("id", b.id);
    if (error) return toast.error(error.message);
    toast.success(!b.preview_only ? "Preview-only enabled" : "Full read unlocked for purchasers");
    load();
  };

  const remove = async (b: BookRow) => {
    if (!confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("books").delete().eq("id", b.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO title="Admin · Books" description="Admin book management" path="/admin" />
      <h1 className="font-display font-bold text-white text-3xl mb-8">Admin · Books</h1>

      <form onSubmit={submit} className="card-cyber p-6 grid gap-4 mb-10">
        <h2 className="font-display font-bold text-white text-lg">Upload new book</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-xs uppercase text-muted-foreground">Title *</span>
            <input className="input-cyber" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase text-muted-foreground">Price</span>
            <div className="flex gap-2">
              <input className="input-cyber flex-1" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
              <select className="input-cyber w-24" value={currency} onChange={e => setCurrency(e.target.value)}>
                <option>USD</option><option>EUR</option><option>KES</option><option>UGX</option>
              </select>
            </div>
          </label>
        </div>
        <label className="grid gap-1">
          <span className="text-xs uppercase text-muted-foreground">Description</span>
          <textarea className="input-cyber min-h-24" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-xs uppercase text-muted-foreground">Cover image</span>
            <input type="file" accept="image/*" onChange={e => setCover(e.target.files?.[0] || null)} className="text-xs" />
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase text-muted-foreground">Book file * (PDF/EPUB)</span>
            <input type="file" accept=".pdf,.epub,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="text-xs" required />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          <span>Published (visible for purchase)</span>
        </label>
        <button disabled={busy} className="btn-cyber py-2 text-xs w-full md:w-64">
          {busy ? "Uploading…" : "UPLOAD BOOK"}
        </button>
      </form>

      <div className="card-cyber p-6">
        <h2 className="font-display font-bold text-white text-lg mb-4">All books ({books.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground text-xs uppercase border-b border-border">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Created</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-white">{b.title}</td>
                  <td className="py-2 pr-4">{(b.price_cents/100).toFixed(2)} {b.currency}</td>
                  <td className="py-2 pr-4">{b.published ? "Published" : "Draft"}{b.preview_only ? " · Preview" : " · Full"}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</td>
                  <td className="py-2 flex gap-2 justify-end flex-wrap">
                    <button className="btn-ghost-cyber text-[11px] px-3 py-1" onClick={() => togglePublish(b)}>
                      {b.published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="btn-ghost-cyber text-[11px] px-3 py-1" onClick={() => togglePreview(b)}>
                      {b.preview_only ? "Unlock full" : "Preview only"}
                    </button>
                    <button className="btn-ghost-cyber text-[11px] px-3 py-1 text-red-400" onClick={() => remove(b)}>Delete</button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No books yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
