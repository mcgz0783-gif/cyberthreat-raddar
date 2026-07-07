import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type DbBook = {
  id: string;
  legacy_id: number | null;
  slug: string;
  title: string;
  price_cents: number;
  currency: string;
  preview_only: boolean;
  cover_path: string | null;
};

let cachePromise: Promise<DbBook[]> | null = null;
async function fetchBooks(): Promise<DbBook[]> {
  const { data } = await supabase
    .from("books")
    .select("id, legacy_id, slug, title, price_cents, currency, preview_only, cover_path")
    .eq("published", true)
    .is("deleted_at", null);
  return (data as DbBook[]) ?? [];
}
function getBooks() {
  if (!cachePromise) cachePromise = fetchBooks();
  return cachePromise;
}
export function invalidateBookCache() { cachePromise = null; }

export function useBooksCatalog() {
  const [byLegacyId, setBy] = useState<Record<number, DbBook>>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getBooks().then(books => {
      const m: Record<number, DbBook> = {};
      books.forEach(b => { if (b.legacy_id != null) m[b.legacy_id] = b; });
      setBy(m); setReady(true);
    });
  }, []);
  return { byLegacyId, ready };
}

export function usePurchases() {
  const { user } = useAuth();
  const [bookIds, setBookIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) { setBookIds(new Set()); setLoading(false); return; }
    supabase.from("purchases").select("book_id").eq("status", "active")
      .then(({ data }) => {
        setBookIds(new Set((data ?? []).map((r: any) => r.book_id)));
        setLoading(false);
      });
  }, [user?.id]);
  return { bookIds, loading };
}

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
