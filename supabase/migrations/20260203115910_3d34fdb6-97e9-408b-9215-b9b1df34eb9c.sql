-- Add read/replied status to inquiries table for message management
ALTER TABLE public.inquiries 
ADD COLUMN IF NOT EXISTS read_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS replied_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS reply_message TEXT DEFAULT NULL;

-- Create property_views table for analytics
CREATE TABLE IF NOT EXISTS public.property_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Enable RLS on property_views
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views (anonymous tracking)
CREATE POLICY "Anyone can track views" ON public.property_views
FOR INSERT WITH CHECK (true);

-- Only admins can read analytics
CREATE POLICY "Admins can view analytics" ON public.property_views
FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Update RLS for inquiries to allow admin updates (mark as read, reply)
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
CREATE POLICY "Admins can update inquiries" ON public.inquiries
FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- Allow assistants to view and update inquiries
CREATE POLICY "Assistants can view inquiries" ON public.inquiries
FOR SELECT USING (has_role(auth.uid(), 'assistant'));

CREATE POLICY "Assistants can update inquiries" ON public.inquiries
FOR UPDATE USING (has_role(auth.uid(), 'assistant'));

-- Update user_roles policies to allow admins to manage roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Allow admins to insert new roles
CREATE POLICY "Admins can insert roles" ON public.user_roles
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

-- Allow admins to delete roles
CREATE POLICY "Admins can delete roles" ON public.user_roles
FOR DELETE USING (has_role(auth.uid(), 'admin'));