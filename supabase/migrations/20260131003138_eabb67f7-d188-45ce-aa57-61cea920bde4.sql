-- Create amenities table
CREATE TABLE public.amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT,
  icon TEXT NOT NULL DEFAULT 'check',
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property_amenities junction table
CREATE TABLE public.property_amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES public.amenities(id) ON DELETE CASCADE,
  UNIQUE(property_id, amenity_id)
);

-- Add new columns to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS daily_price DECIMAL,
ADD COLUMN IF NOT EXISTS weekly_price DECIMAL,
ADD COLUMN IF NOT EXISTS monthly_price DECIMAL;

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_fr TEXT,
  description TEXT,
  description_fr TEXT,
  category TEXT NOT NULL DEFAULT 'tour',
  duration TEXT,
  price DECIMAL,
  price_type TEXT DEFAULT 'per_person',
  images TEXT[] DEFAULT '{}',
  featured_image TEXT,
  location TEXT,
  city TEXT,
  country TEXT DEFAULT 'France',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity logs table
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  user_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Amenities policies (public read, admin/assistant write)
CREATE POLICY "Anyone can view amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage amenities" ON public.amenities FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Assistants can manage amenities" ON public.amenities FOR ALL USING (has_role(auth.uid(), 'assistant'::app_role));

-- Property amenities policies
CREATE POLICY "Anyone can view property amenities" ON public.property_amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage property amenities" ON public.property_amenities FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Assistants can manage property amenities" ON public.property_amenities FOR ALL USING (has_role(auth.uid(), 'assistant'::app_role));

-- Experiences policies
CREATE POLICY "Anyone can view published experiences" ON public.experiences FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all experiences" ON public.experiences FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage experiences" ON public.experiences FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Assistants can view all experiences" ON public.experiences FOR SELECT USING (has_role(auth.uid(), 'assistant'::app_role));
CREATE POLICY "Assistants can manage experiences" ON public.experiences FOR ALL USING (has_role(auth.uid(), 'assistant'::app_role));

-- Activity logs policies (admin only)
CREATE POLICY "Admins can view all activity logs" ON public.activity_logs FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins and assistants can insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'assistant'::app_role)
);

-- Update properties policies for assistants
CREATE POLICY "Assistants can view all properties" ON public.properties FOR SELECT USING (has_role(auth.uid(), 'assistant'::app_role));
CREATE POLICY "Assistants can insert properties" ON public.properties FOR INSERT WITH CHECK (has_role(auth.uid(), 'assistant'::app_role));
CREATE POLICY "Assistants can update properties" ON public.properties FOR UPDATE USING (has_role(auth.uid(), 'assistant'::app_role));
CREATE POLICY "Assistants can delete properties" ON public.properties FOR DELETE USING (has_role(auth.uid(), 'assistant'::app_role));

-- Insert default amenities
INSERT INTO public.amenities (name, name_fr, icon, category) VALUES
('WiFi', 'WiFi', 'wifi', 'essentials'),
('Air Conditioning', 'Climatisation', 'snowflake', 'climate'),
('Heating', 'Chauffage', 'flame', 'climate'),
('Kitchen', 'Cuisine', 'utensils', 'essentials'),
('Washer', 'Lave-linge', 'shirt', 'laundry'),
('Dryer', 'Sèche-linge', 'wind', 'laundry'),
('TV', 'Télévision', 'tv', 'entertainment'),
('Pool', 'Piscine', 'waves', 'outdoor'),
('Hot Tub', 'Jacuzzi', 'bath', 'outdoor'),
('Gym', 'Salle de Sport', 'dumbbell', 'fitness'),
('Parking', 'Parking', 'car', 'parking'),
('Garden', 'Jardin', 'flower-2', 'outdoor'),
('Terrace', 'Terrasse', 'umbrella', 'outdoor'),
('Sea View', 'Vue Mer', 'sunset', 'views'),
('Mountain View', 'Vue Montagne', 'mountain', 'views'),
('Concierge', 'Conciergerie', 'bell-ring', 'services'),
('Security', 'Sécurité', 'shield', 'services'),
('Elevator', 'Ascenseur', 'arrow-up-down', 'accessibility'),
('Pet Friendly', 'Animaux Acceptés', 'paw-print', 'policies'),
('Smoke Free', 'Non-Fumeur', 'cigarette-off', 'policies');

-- Create indexes for performance
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_action ON public.activity_logs(action);
CREATE INDEX idx_experiences_category ON public.experiences(category);
CREATE INDEX idx_experiences_published ON public.experiences(published);

-- Trigger for experiences updated_at
CREATE TRIGGER update_experiences_updated_at
BEFORE UPDATE ON public.experiences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();