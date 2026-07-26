
-- Public read for cover & blog images (private buckets, opened by policy)
CREATE POLICY "covers public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'book-covers');
CREATE POLICY "blog images public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Admin write for all three buckets
CREATE POLICY "admin write covers" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'book-covers' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'book-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin write blog" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin write files" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'book-files' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'book-files' AND public.has_role(auth.uid(), 'admin'));
