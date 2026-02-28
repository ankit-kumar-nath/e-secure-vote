
-- ==========================================
-- SecureVote India - Full E-Voting Database
-- ==========================================

-- 1. ENUM TYPES
CREATE TYPE public.app_role AS ENUM ('admin', 'election_official', 'voter');
CREATE TYPE public.election_status AS ENUM ('upcoming', 'active', 'completed', 'cancelled');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');

-- 2. USER ROLES TABLE
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. PROFILES TABLE (voter details)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  aadhaar_number TEXT,
  constituency TEXT,
  date_of_birth DATE,
  phone TEXT,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. PARTIES TABLE
CREATE TABLE public.parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  abbreviation TEXT,
  symbol_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;

-- 5. ELECTIONS TABLE
CREATE TABLE public.elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  constituency TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status election_status NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;

-- 6. CANDIDATES TABLE
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  party_id UUID REFERENCES public.parties(id) ON DELETE SET NULL,
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- 7. VOTES TABLE (anonymized - voter_id used only for eligibility check)
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE NOT NULL,
  voter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  vote_hash TEXT NOT NULL,
  cast_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- 8. VOTER ELIGIBILITY TRACKER (one-person-one-vote enforcement)
CREATE TABLE public.election_voter_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
  voter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  voted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (election_id, voter_id)
);
ALTER TABLE public.election_voter_log ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- HELPER FUNCTIONS (security definer)
-- ==========================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_official(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'election_official')
  )
$$;

CREATE OR REPLACE FUNCTION public.is_profile_verified(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND verification_status = 'verified'
  )
$$;

CREATE OR REPLACE FUNCTION public.has_voted(_user_id UUID, _election_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.election_voter_log
    WHERE voter_id = _user_id AND election_id = _election_id
  )
$$;

CREATE OR REPLACE FUNCTION public.is_election_active(_election_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.elections
    WHERE id = _election_id AND status = 'active'
      AND now() BETWEEN start_date AND end_date
  )
$$;

-- ==========================================
-- TIMESTAMP TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parties_updated_at BEFORE UPDATE ON public.parties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_elections_updated_at BEFORE UPDATE ON public.elections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Voter'));
  -- Default role: voter
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'voter');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- USER_ROLES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins/officials can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- PARTIES (public read, admin/official write)
CREATE POLICY "Anyone can view parties" ON public.parties FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins/officials manage parties" ON public.parties FOR ALL TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- ELECTIONS (public read, admin/official write)
CREATE POLICY "Anyone can view elections" ON public.elections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins/officials manage elections" ON public.elections FOR ALL TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- CANDIDATES (public read, admin/official write)
CREATE POLICY "Anyone can view candidates" ON public.candidates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins/officials manage candidates" ON public.candidates FOR ALL TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- VOTES (only verified voters can insert, only admins can view)
CREATE POLICY "Verified voters can cast vote" ON public.votes FOR INSERT TO authenticated
  WITH CHECK (
    voter_id = auth.uid()
    AND public.is_profile_verified(auth.uid())
    AND public.is_election_active(election_id)
    AND NOT public.has_voted(auth.uid(), election_id)
  );
CREATE POLICY "Admins can view votes" ON public.votes FOR SELECT TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- ELECTION_VOTER_LOG
CREATE POLICY "Voters can log their vote" ON public.election_voter_log FOR INSERT TO authenticated
  WITH CHECK (
    voter_id = auth.uid()
    AND public.is_profile_verified(auth.uid())
    AND NOT public.has_voted(auth.uid(), election_id)
  );
CREATE POLICY "Voters can check own vote status" ON public.election_voter_log FOR SELECT TO authenticated USING (voter_id = auth.uid());
CREATE POLICY "Admins can view vote log" ON public.election_voter_log FOR SELECT TO authenticated USING (public.is_admin_or_official(auth.uid()));

-- ==========================================
-- VIEWS (anonymized results)
-- ==========================================

CREATE VIEW public.election_results_summary
WITH (security_invoker = on) AS
  SELECT
    e.id AS election_id,
    e.name AS election_name,
    c.id AS candidate_id,
    c.full_name AS candidate_name,
    p.name AS party_name,
    COUNT(v.id) AS vote_count
  FROM public.elections e
  JOIN public.candidates c ON c.election_id = e.id
  LEFT JOIN public.votes v ON v.candidate_id = c.id AND v.election_id = e.id
  LEFT JOIN public.parties p ON p.id = c.party_id
  GROUP BY e.id, e.name, c.id, c.full_name, p.name;
