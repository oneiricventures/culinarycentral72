
CREATE TABLE public.checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  primary_name text NOT NULL,
  guest_count integer NOT NULL CHECK (guest_count BETWEEN 1 AND 20),
  mobile text NOT NULL,
  email text NOT NULL,
  checkin_date date NOT NULL,
  checkout_date date NOT NULL,
  booking_platform text NOT NULL,
  booking_platform_other text,
  coming_from text NOT NULL,
  heading_to text NOT NULL,
  consent boolean NOT NULL DEFAULT true,
  guests jsonb NOT NULL DEFAULT '[]'::jsonb
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.checkins TO authenticated;
GRANT ALL ON public.checkins TO service_role;

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated staff can read checkins"
  ON public.checkins FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert checkins"
  ON public.checkins FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update checkins"
  ON public.checkins FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff can delete checkins"
  ON public.checkins FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS checkins_checkin_date_idx ON public.checkins(checkin_date);
CREATE INDEX IF NOT EXISTS checkins_created_at_idx ON public.checkins(created_at DESC);

-- Storage policies for the kyc bucket (bucket itself created via storage_create_bucket tool)
CREATE POLICY "Authenticated can read kyc"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'kyc');

CREATE POLICY "Authenticated can upload kyc"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'kyc');

CREATE POLICY "Authenticated can update kyc"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'kyc') WITH CHECK (bucket_id = 'kyc');

CREATE POLICY "Authenticated can delete kyc"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'kyc');
