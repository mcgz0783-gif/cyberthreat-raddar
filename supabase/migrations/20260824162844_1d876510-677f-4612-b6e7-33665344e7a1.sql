CREATE TABLE IF NOT EXISTS public.payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  tracking_id text,
  merchant_reference text,
  source text NOT NULL,
  event_status text,
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.payment_events TO authenticated;
GRANT ALL ON public.payment_events TO service_role;

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payment_events admin read" ON public.payment_events
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "payment_events no client insert" ON public.payment_events
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "payment_events no client update" ON public.payment_events
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "payment_events no client delete" ON public.payment_events
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE INDEX IF NOT EXISTS payment_events_order_idx ON public.payment_events(order_id, created_at DESC);
CREATE INDEX IF NOT EXISTS payment_events_tracking_idx ON public.payment_events(tracking_id);