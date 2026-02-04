-- Security hardening (error-level findings): activity_logs & inquiries
-- 1) Ensure sensitive tables are never readable by unauthenticated/public users
-- 2) Keep staff access working (admins for activity_logs; admins+assistants for inquiries)

BEGIN;

-- -----------------------------------------------------------------------------
-- activity_logs: admin-only read
-- -----------------------------------------------------------------------------
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs FORCE ROW LEVEL SECURITY;

-- Replace any SELECT policy that targets PUBLIC with authenticated-scoped policies
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Deny public read of activity logs" ON public.activity_logs;

CREATE POLICY "Deny public read of activity logs"
  ON public.activity_logs
  FOR SELECT
  TO public
  USING (false);

CREATE POLICY "Admins can view all activity logs"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Make sure inserts can only come from authenticated staff
DROP POLICY IF EXISTS "Admins and assistants can insert activity logs" ON public.activity_logs;

CREATE POLICY "Admins and assistants can insert activity logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'assistant'::app_role)
  );

-- -----------------------------------------------------------------------------
-- inquiries: explicit public DENY SELECT + staff-only read
-- -----------------------------------------------------------------------------
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Assistants can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public cannot read inquiries" ON public.inquiries;

CREATE POLICY "Public cannot read inquiries"
  ON public.inquiries
  FOR SELECT
  TO public
  USING (false);

CREATE POLICY "Admins can view all inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Assistants can view inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'assistant'::app_role));

COMMIT;