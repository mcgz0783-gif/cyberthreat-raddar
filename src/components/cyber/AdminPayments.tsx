import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type EventRow = {
  id: string;
  order_id: string | null;
  tracking_id: string | null;
  source: string;
  event_status: string | null;
  created_at: string;
};

type PaymentRow = {
  order_id: string;
  status: string;
  provider: string;
  provider_reference: string | null;
  updated_at: string;
};

type OrderRow = {
  id: string;
  user_id: string;
  book_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  pesapal_tracking_id: string | null;
  pesapal_merchant_reference: string | null;
  created_at: string;
  books?: { title: string } | null;
};

type PurchaseRow = { order_id: string; status: string };

const statusColor = (s: string) =>
  s === "completed" || s === "success" || s === "active"
    ? "text-emerald-400"
    : s === "failed" || s === "invalid" || s === "revoked"
    ? "text-red-400"
    : "text-amber-300";

export function AdminPayments() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [payments, setPayments] = useState<Record<string, PaymentRow>>({});
  const [purchases, setPurchases] = useState<Record<string, PurchaseRow>>({});
  const [events, setEvents] = useState<Record<string, EventRow[]>>({});
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [o, p, pu, ev] = await Promise.all([
      supabase
        .from("orders")
        .select(
          "id, user_id, book_id, amount_cents, currency, status, pesapal_tracking_id, pesapal_merchant_reference, created_at, books(title)"
        )
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.from("payments").select("order_id, status, provider, provider_reference, updated_at"),
      supabase.from("purchases").select("order_id, status"),
      supabase
        .from("payment_events")
        .select("id, order_id, tracking_id, source, event_status, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (o.data) setOrders(o.data as unknown as OrderRow[]);
    if (p.data) {
      const map: Record<string, PaymentRow> = {};
      for (const row of p.data as PaymentRow[]) map[row.order_id] = row;
      setPayments(map);
    }
    if (pu.data) {
      const map: Record<string, PurchaseRow> = {};
      for (const row of pu.data as PurchaseRow[]) map[row.order_id] = row;
      setPurchases(map);
    }
    if (ev.data) {
      const map: Record<string, EventRow[]> = {};
      for (const row of ev.data as EventRow[]) {
        const key = row.order_id ?? `orphan:${row.tracking_id ?? "unknown"}`;
        (map[key] ||= []).push(row);
      }
      setEvents(map);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const unlockedCount = orders.filter((o) => purchases[o.id]?.status === "active").length;
  const mismatch = orders.filter(
    (o) => o.status === "completed" && purchases[o.id]?.status !== "active"
  );

  return (
    <div className="card-cyber p-6 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="font-display font-bold text-white text-lg">
          Payments &amp; fulfilment {loading ? "" : `(${orders.length} orders)`}
        </h2>
        <button className="btn-ghost-cyber text-[11px] px-3 py-1" onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-xs">
        <div className="p-3 rounded border border-border">
          <div className="text-muted-foreground uppercase">Unlocked</div>
          <div className="text-white text-base">{unlockedCount}</div>
        </div>
        <div className="p-3 rounded border border-border">
          <div className="text-muted-foreground uppercase">IPN events</div>
          <div className="text-white text-base">
            {Object.values(events).reduce((s, e) => s + e.length, 0)}
          </div>
        </div>
        <div className="p-3 rounded border border-border">
          <div className="text-muted-foreground uppercase">Paid, not unlocked</div>
          <div className={mismatch.length ? "text-red-400 text-base" : "text-white text-base"}>
            {mismatch.length}
          </div>
        </div>
        <div className="p-3 rounded border border-border">
          <div className="text-muted-foreground uppercase">Awaiting IPN</div>
          <div className="text-white text-base">
            {orders.filter((o) => !(events[o.id]?.length)).length}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground uppercase border-b border-border">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Book</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Order</th>
              <th className="py-2 pr-4">Payment</th>
              <th className="py-2 pr-4">Unlocked</th>
              <th className="py-2 pr-4">Events</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const pay = payments[o.id];
              const pur = purchases[o.id];
              const evs = events[o.id] || [];
              const isOpen = open === o.id;
              return (
                <Fragment key={o.id}>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-white">{o.books?.title || "—"}</td>
                    <td className="py-2 pr-4">
                      {(o.amount_cents / 100).toFixed(2)} {o.currency}
                    </td>
                    <td className={`py-2 pr-4 ${statusColor(o.status)}`}>{o.status}</td>
                    <td className={`py-2 pr-4 ${pay ? statusColor(pay.status) : "text-muted-foreground"}`}>
                      {pay ? pay.status : "—"}
                    </td>
                    <td className="py-2 pr-4">
                      {pur?.status === "active" ? (
                        <span className="text-emerald-400">✓ yes</span>
                      ) : o.status === "completed" ? (
                        <span className="text-red-400">✗ no</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{evs.length}</td>
                    <td className="py-2">
                      <button
                        className="btn-ghost-cyber text-[11px] px-3 py-1"
                        onClick={() => setOpen(isOpen ? null : o.id)}
                      >
                        {isOpen ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-border/50 bg-muted/20">
                      <td colSpan={8} className="py-3 px-3">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="text-[11px] font-mono space-y-1 text-muted-foreground">
                            <div>order id: {o.id}</div>
                            <div>user id: {o.user_id}</div>
                            <div>merchant ref: {o.pesapal_merchant_reference || "—"}</div>
                            <div>tracking id: {o.pesapal_tracking_id || "—"}</div>
                            <div>provider ref: {pay?.provider_reference || "—"}</div>
                            <div>purchase: {pur ? pur.status : "none"}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground uppercase text-[10px] mb-1">
                              Payment events
                            </div>
                            {evs.length === 0 ? (
                              <p className="text-muted-foreground text-[11px]">
                                No IPN or verification callbacks recorded yet.
                              </p>
                            ) : (
                              <ul className="space-y-1 text-[11px] font-mono">
                                {evs.map((e) => (
                                  <li key={e.id} className="flex gap-2">
                                    <span className="text-muted-foreground">
                                      {new Date(e.created_at).toLocaleString()}
                                    </span>
                                    <span className="uppercase">{e.source}</span>
                                    <span className={statusColor((e.event_status || "").toLowerCase())}>
                                      {e.event_status}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-muted-foreground">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
