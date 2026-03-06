
-- Create property-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to property-images
CREATE POLICY "Public read property images" ON storage.objects
FOR SELECT USING (bucket_id = 'property-images');

-- Allow authenticated users to upload to property-images
CREATE POLICY "Auth users upload property images" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to delete from property-images
CREATE POLICY "Auth users delete property images" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'property-images');

-- Allow public read access to blog-images (ensure it exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public read blog images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Public read blog images" ON storage.objects
    FOR SELECT USING (bucket_id = 'blog-images');
  END IF;
END $$;

-- Allow authenticated users to upload to blog-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Auth users upload blog images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Auth users upload blog images" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
  END IF;
END $$;
