-- 1. Add validation trigger for comments to limit field lengths
CREATE OR REPLACE FUNCTION public.validate_comment_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF length(NEW.author_name) > 100 THEN
    RAISE EXCEPTION 'Author name too long';
  END IF;
  IF length(NEW.author_email) > 255 THEN
    RAISE EXCEPTION 'Author email too long';
  END IF;
  IF length(NEW.content) > 2000 THEN
    RAISE EXCEPTION 'Comment content too long';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_comment_before_insert
BEFORE INSERT ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.validate_comment_input();

-- 2. Add validation trigger for inquiries
CREATE OR REPLACE FUNCTION public.validate_inquiry_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name too long';
  END IF;
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email too long';
  END IF;
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Phone number too long';
  END IF;
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message too long';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_inquiry_before_insert
BEFORE INSERT ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.validate_inquiry_input();