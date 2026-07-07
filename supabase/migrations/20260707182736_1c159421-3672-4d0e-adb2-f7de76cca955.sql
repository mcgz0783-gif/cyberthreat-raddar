
-- 1. books: preview_only + legacy bridge
ALTER TABLE public.books
  ADD COLUMN IF NOT EXISTS preview_only boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS legacy_id integer UNIQUE;

-- 2. purchases: status enum
DO $$ BEGIN
  CREATE TYPE public.purchase_status AS ENUM ('active','refunded','revoked');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS status public.purchase_status NOT NULL DEFAULT 'active';

-- Admin can update / delete purchases (status management)
DROP POLICY IF EXISTS "purchases admin manage" ON public.purchases;
CREATE POLICY "purchases admin manage" ON public.purchases
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- 3. anon can read authors & categories (public browse)
GRANT SELECT ON public.authors TO anon;
GRANT SELECT ON public.categories TO anon;

DROP POLICY IF EXISTS "authors public read" ON public.authors;
CREATE POLICY "authors public read" ON public.authors
  FOR SELECT TO anon, authenticated USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "categories public read" ON public.categories;
CREATE POLICY "categories public read" ON public.categories
  FOR SELECT TO anon, authenticated USING (deleted_at IS NULL);
