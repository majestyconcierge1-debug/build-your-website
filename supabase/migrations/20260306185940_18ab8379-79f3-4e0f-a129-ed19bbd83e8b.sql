
-- Fix news_articles: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can view all articles" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can insert articles" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can update articles" ON public.news_articles;
DROP POLICY IF EXISTS "Admins can delete articles" ON public.news_articles;

CREATE POLICY "Anyone can view published articles" ON public.news_articles FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all articles" ON public.news_articles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert articles" ON public.news_articles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update articles" ON public.news_articles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete articles" ON public.news_articles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix properties: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can view properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
DROP POLICY IF EXISTS "Assistants can view all properties" ON public.properties;
DROP POLICY IF EXISTS "Assistants can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Assistants can update properties" ON public.properties;
DROP POLICY IF EXISTS "Assistants can delete properties" ON public.properties;

CREATE POLICY "Anyone can view properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Admins can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update properties" ON public.properties FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete properties" ON public.properties FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can view all properties" ON public.properties FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Assistants can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Assistants can update properties" ON public.properties FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Assistants can delete properties" ON public.properties FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'assistant'));

-- Fix experiences: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published experiences" ON public.experiences;
DROP POLICY IF EXISTS "Admins can view all experiences" ON public.experiences;
DROP POLICY IF EXISTS "Admins can manage experiences" ON public.experiences;
DROP POLICY IF EXISTS "Assistants can view all experiences" ON public.experiences;
DROP POLICY IF EXISTS "Assistants can manage experiences" ON public.experiences;

CREATE POLICY "Anyone can view published experiences" ON public.experiences FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all experiences" ON public.experiences FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage experiences" ON public.experiences FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can view all experiences" ON public.experiences FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Assistants can manage experiences" ON public.experiences FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'assistant')) WITH CHECK (public.has_role(auth.uid(), 'assistant'));

-- Fix amenities: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can view amenities" ON public.amenities;
DROP POLICY IF EXISTS "Admins can manage amenities" ON public.amenities;
DROP POLICY IF EXISTS "Assistants can manage amenities" ON public.amenities;

CREATE POLICY "Anyone can view amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage amenities" ON public.amenities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can manage amenities" ON public.amenities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'assistant')) WITH CHECK (public.has_role(auth.uid(), 'assistant'));

-- Fix property_amenities: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can view property amenities" ON public.property_amenities;
DROP POLICY IF EXISTS "Admins can manage property amenities" ON public.property_amenities;
DROP POLICY IF EXISTS "Assistants can manage property amenities" ON public.property_amenities;

CREATE POLICY "Anyone can view property amenities" ON public.property_amenities FOR SELECT USING (true);
CREATE POLICY "Admins can manage property amenities" ON public.property_amenities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can manage property amenities" ON public.property_amenities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'assistant')) WITH CHECK (public.has_role(auth.uid(), 'assistant'));

-- Fix inquiries: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Assistants can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public cannot read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Assistants can view inquiries" ON public.inquiries;

CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can view inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Admins can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assistants can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'assistant'));
CREATE POLICY "Admins can delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix property_views
DROP POLICY IF EXISTS "Anyone can track views" ON public.property_views;
DROP POLICY IF EXISTS "Admins can view analytics" ON public.property_views;

CREATE POLICY "Anyone can track views" ON public.property_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON public.property_views FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix comments
DROP POLICY IF EXISTS "Anyone can submit comments" ON public.comments;
DROP POLICY IF EXISTS "Admins can view all comments" ON public.comments;
DROP POLICY IF EXISTS "Admins can update comments" ON public.comments;
DROP POLICY IF EXISTS "Admins can delete comments" ON public.comments;
DROP POLICY IF EXISTS "Only staff can view comments directly" ON public.comments;

CREATE POLICY "Anyone can submit comments" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all comments" ON public.comments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update comments" ON public.comments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete comments" ON public.comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fix activity_logs
DROP POLICY IF EXISTS "Deny public read of activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins and assistants can insert activity logs" ON public.activity_logs;

CREATE POLICY "Admins can view all activity logs" ON public.activity_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins and assistants can insert activity logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'assistant'));
