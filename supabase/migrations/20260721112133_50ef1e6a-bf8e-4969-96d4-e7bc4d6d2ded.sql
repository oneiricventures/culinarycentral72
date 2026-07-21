
-- Ensure checkins policies are staff-only (drop any legacy permissive policies).
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='checkins' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.checkins', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "Staff can read checkins" ON public.checkins
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff can insert checkins" ON public.checkins
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'staff'::app_role) AND created_by = auth.uid());
CREATE POLICY "Staff can update checkins" ON public.checkins
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff can delete checkins" ON public.checkins
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'staff'::app_role));

-- Lock kyc storage bucket to staff only.
DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND (policyname ILIKE '%kyc%' OR policyname ILIKE '%KYC%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "Staff can read kyc objects" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff can upload kyc objects" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff can update kyc objects" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Staff can delete kyc objects" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'::app_role));

-- Ensure the front-desk auth user has the staff role.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'staff'::app_role FROM auth.users
WHERE email = 'frontdesk@skylightsuites.app'
ON CONFLICT (user_id, role) DO NOTHING;
