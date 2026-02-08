
-- Add new columns to experiences table for the expanded tours module
ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS short_description_fr TEXT,
  ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'EUR',
  ADD COLUMN IF NOT EXISTS max_participants INTEGER,
  ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'Medium',
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS start_point TEXT,
  ADD COLUMN IF NOT EXISTS end_point TEXT,
  ADD COLUMN IF NOT EXISTS included TEXT,
  ADD COLUMN IF NOT EXISTS included_fr TEXT,
  ADD COLUMN IF NOT EXISTS not_included TEXT,
  ADD COLUMN IF NOT EXISTS not_included_fr TEXT,
  ADD COLUMN IF NOT EXISTS cancellation_policy TEXT,
  ADD COLUMN IF NOT EXISTS cancellation_policy_fr TEXT,
  ADD COLUMN IF NOT EXISTS what_to_bring TEXT,
  ADD COLUMN IF NOT EXISTS what_to_bring_fr TEXT,
  ADD COLUMN IF NOT EXISTS accessibility BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS best_seller BOOLEAN DEFAULT false;

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_experiences_slug ON public.experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON public.experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_country ON public.experiences(country);
