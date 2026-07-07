
-- 1) Books: remove file_path from public exposure. Only service_role (edge fn) reads it.
REVOKE SELECT (file_path) ON public.books FROM anon, authenticated;

-- 2) Admin write policies for books/authors/categories
DROP POLICY IF EXISTS "books admin write" ON public.books;
CREATE POLICY "books admin write" ON public.books FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "authors admin write" ON public.authors;
CREATE POLICY "authors admin write" ON public.authors FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "categories admin write" ON public.categories;
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3) user_roles: only admins can manage roles
DROP POLICY IF EXISTS "user_roles admin manage" ON public.user_roles;
CREATE POLICY "user_roles admin manage" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4) Storage: admin-only access to database export bucket
DROP POLICY IF EXISTS "db export admin all" ON storage.objects;
CREATE POLICY "db export admin all" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'database_export_06_07_26' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'database_export_06_07_26' AND public.has_role(auth.uid(), 'admin'));

-- 5) Storage: admins can manage book-files and book-covers uploads
DROP POLICY IF EXISTS "book files admin all" ON storage.objects;
CREATE POLICY "book files admin all" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'book-files' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'book-files' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "book covers admin all" ON storage.objects;
CREATE POLICY "book covers admin all" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'book-covers' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'book-covers' AND public.has_role(auth.uid(), 'admin'));

-- 6) book-covers public read (so cover images display on the site)
DROP POLICY IF EXISTS "book covers public read" ON storage.objects;
CREATE POLICY "book covers public read" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'book-covers');
