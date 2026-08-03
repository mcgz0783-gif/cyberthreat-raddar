-- Consolidate book-covers storage policies (remove duplicates)
DROP POLICY IF EXISTS "admin write covers" ON storage.objects;
DROP POLICY IF EXISTS "covers public read" ON storage.objects;
-- remaining: "book covers admin all" (ALL, admin) + "book covers public read" (SELECT)

-- Consolidate book-files storage policies; admin-only, no public/authenticated SELECT.
-- End-user downloads go through server-side signed URLs generated after verification.
DROP POLICY IF EXISTS "admin write files" ON storage.objects;
-- remaining: "book files admin all" (ALL, admin only) — no SELECT policy for anon/authenticated

-- Orders: explicitly block client-side writes; only service role (server code) may insert/update/delete.
CREATE POLICY "orders no client insert"
ON public.orders
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "orders no client update"
ON public.orders
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "orders no client delete"
ON public.orders
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);