import { BOOKS, type BookItem } from "@/data/cybersec";

export function useBooksCatalog() {
  const byLegacyId: Record<number, BookItem> = {};
  BOOKS.forEach(b => { byLegacyId[b.id] = b; });
  return { byLegacyId, ready: true };
}

export function usePurchases() {
  return { bookIds: new Set<string>(), loading: false };
}

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
