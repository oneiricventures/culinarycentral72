
-- 1. Role system
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('staff', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Seed staff role for existing front desk account (if present)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'staff'::public.app_role
FROM auth.users
WHERE lower(email) = 'frontdesk@skylightsuites.app'
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Replace overly-permissive checkins policies
DROP POLICY IF EXISTS "Authenticated staff can delete checkins" ON public.checkins;
DROP POLICY IF EXISTS "Authenticated staff can insert checkins" ON public.checkins;
DROP POLICY IF EXISTS "Authenticated staff can read checkins" ON public.checkins;
DROP POLICY IF EXISTS "Authenticated staff can update checkins" ON public.checkins;

CREATE POLICY "Staff can read checkins"
  ON public.checkins FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can insert checkins"
  ON public.checkins FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'staff') AND created_by = auth.uid());

CREATE POLICY "Staff can update checkins"
  ON public.checkins FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff'))
  WITH CHECK (public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can delete checkins"
  ON public.checkins FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff'));

-- 3. Replace storage policies for kyc bucket - restrict to staff
DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND (policyname ILIKE '%kyc%' OR qual::text ILIKE '%''kyc''%' OR with_check::text ILIKE '%''kyc''%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "Staff can read kyc objects"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can insert kyc objects"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can update kyc objects"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'))
  WITH CHECK (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff can delete kyc objects"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'kyc' AND public.has_role(auth.uid(), 'staff'));
