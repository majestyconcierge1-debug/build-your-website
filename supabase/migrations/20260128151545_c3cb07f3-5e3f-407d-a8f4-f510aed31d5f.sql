-- Drop existing property_type enum and create new one with expanded types
ALTER TABLE public.properties DROP COLUMN property_type;
DROP TYPE IF EXISTS public.property_type;

CREATE TYPE public.property_type AS ENUM (
  'apartment_rent',
  'apartment_sale',
  'penthouse_rent',
  'penthouse_sale',
  'villa_rent',
  'villa_sale',
  'riad_rent',
  'riad_sale'
);

-- Add property_type column back with new enum
ALTER TABLE public.properties ADD COLUMN property_type public.property_type NOT NULL DEFAULT 'apartment_rent';

-- Add country field to properties
ALTER TABLE public.properties ADD COLUMN country TEXT NOT NULL DEFAULT 'France';

-- Create index for faster country-based queries
CREATE INDEX idx_properties_country ON public.properties(country);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_status ON public.properties(status);

-- Update existing sample data with countries
UPDATE public.properties SET country = 'France' WHERE city IN ('Cannes', 'Nice', 'Monaco', 'Saint-Tropez', 'Antibes');
UPDATE public.properties SET country = 'Tunisia' WHERE city IN ('Tunis', 'Hammamet');