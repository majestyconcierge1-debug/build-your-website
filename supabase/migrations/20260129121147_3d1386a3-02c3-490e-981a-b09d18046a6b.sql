-- Create news_articles table for blog/news content
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_fr TEXT,
  content TEXT NOT NULL,
  content_fr TEXT,
  excerpt TEXT,
  excerpt_fr TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table for article discussions
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.news_articles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- News articles policies
CREATE POLICY "Anyone can view published articles" 
ON public.news_articles 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can view all articles" 
ON public.news_articles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert articles" 
ON public.news_articles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update articles" 
ON public.news_articles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete articles" 
ON public.news_articles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Comments policies
CREATE POLICY "Anyone can view approved comments" 
ON public.comments 
FOR SELECT 
USING (approved = true);

CREATE POLICY "Anyone can submit comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all comments" 
ON public.comments 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update comments" 
ON public.comments 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete comments" 
ON public.comments 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_news_articles_published ON public.news_articles(published);
CREATE INDEX idx_comments_article_id ON public.comments(article_id);
CREATE INDEX idx_comments_approved ON public.comments(approved);

-- Add trigger for updated_at
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();