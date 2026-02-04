-- Fix: Create a public view for comments that excludes the author_email
-- This prevents email harvesting while keeping comments publicly readable

-- Create a public view that excludes sensitive email data
CREATE VIEW public.comments_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    article_id,
    author_name,
    content,
    approved,
    created_at
  FROM public.comments
  WHERE approved = true;

-- Comment on the view
COMMENT ON VIEW public.comments_public IS 'Public view of comments that excludes email addresses to prevent harvesting';

-- Drop the existing overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.comments;

-- Create a restrictive policy that only allows admins/assistants to directly query the table
-- Public access should go through the comments_public view
CREATE POLICY "Only staff can view comments directly" 
  ON public.comments 
  FOR SELECT 
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'assistant'::app_role)
  );