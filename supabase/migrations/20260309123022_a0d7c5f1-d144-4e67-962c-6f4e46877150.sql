INSERT INTO storage.buckets (id, name, public) VALUES ('experiences', 'experiences', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view experience images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'experiences');
CREATE POLICY "Admins can upload experience images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'experiences' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete experience images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'experiences' AND public.has_role(auth.uid(), 'admin'));