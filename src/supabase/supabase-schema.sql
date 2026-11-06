-- =====================================================================
-- WATCH EARN — SCHEMA POSTGRESQL & ROW LEVEL SECURITY (RLS) POUR SUPABASE
-- =====================================================================

-- 1. Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  language TEXT DEFAULT 'fr',
  timezone TEXT DEFAULT 'Europe/Paris',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by TEXT,
  balance_total NUMERIC(10,3) DEFAULT 1.000,
  balance_available NUMERIC(10,3) DEFAULT 1.000,
  balance_pending NUMERIC(10,3) DEFAULT 0.000,
  watched_today_count INT DEFAULT 0,
  earned_today NUMERIC(10,3) DEFAULT 0.000,
  last_watched_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Profils
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view and update all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Table des vidéos
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  duration_seconds INT NOT NULL,
  reward_amount NUMERIC(6,3) NOT NULL DEFAULT 0.050,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  views_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Vidéos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published videos readable by all" ON public.videos FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage videos" ON public.videos FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Table des vues validées (Anti-doublon par utilisateur et par jour)
CREATE TABLE IF NOT EXISTS public.video_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  watch_duration_seconds INT NOT NULL,
  reward_credited NUMERIC(6,3) NOT NULL,
  viewed_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, video_id, viewed_date)
);

ALTER TABLE public.video_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own view history" ON public.video_views FOR SELECT USING (auth.uid() = user_id);

-- 4. Table des transactions (Grand Livre Comptable Double-Entrée)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('welcome_bonus', 'video_reward', 'admin_adjustment', 'withdrawal_request', 'withdrawal_payout', 'withdrawal_cancellation')),
  amount NUMERIC(10,3) NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'rejected')),
  balance_after NUMERIC(10,3) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins read all transactions" ON public.transactions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Table des demandes de retrait
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 55.00),
  provider TEXT NOT NULL,
  provider_account TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified_referrals_at_request INT NOT NULL CHECK (verified_referrals_at_request >= 3),
  reviewed_by UUID REFERENCES public.profiles(id),
  rejection_reason TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create and view own withdrawals" ON public.withdrawals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can update withdrawals" ON public.withdrawals FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 6. Table des parrainages
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  referred_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'verified', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);

-- 7. Table des paramètres plateforme (Adsterra, plafonds)
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id INT PRIMARY KEY DEFAULT 1,
  adsterra_direct_link_url TEXT NOT NULL DEFAULT 'https://www.profitablecpmrate.com/demo_direct_link_watchearn',
  adsterra_enabled BOOLEAN DEFAULT TRUE,
  adsterra_impressions_count INT DEFAULT 0,
  daily_video_limit INT DEFAULT 20,
  daily_reward_cap NUMERIC(6,2) DEFAULT 1.50,
  min_withdrawal_amount NUMERIC(6,2) DEFAULT 55.00,
  min_verified_referrals_for_withdrawal INT DEFAULT 3,
  welcome_bonus_amount NUMERIC(6,2) DEFAULT 1.00,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initialisation de la ligne unique de configuration
INSERT INTO public.platform_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- RLS Paramètres
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are publicly readable" ON public.platform_settings FOR SELECT USING (TRUE);
CREATE POLICY "Only admins can update settings" ON public.platform_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- =====================================================================
-- FONCTION SERVEUR SÉCURISÉE : VALIDATION DU VISIONNAGE (PL/pgSQL)
-- =====================================================================
CREATE OR REPLACE FUNCTION public.claim_video_reward(p_video_id UUID, p_duration_watched INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_video RECORD;
  v_profile RECORD;
  v_today DATE := CURRENT_DATE;
  v_new_balance NUMERIC;
BEGIN
  -- 1. Vérification profil
  SELECT * INTO v_profile FROM public.profiles WHERE id = v_user_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Profil introuvable');
  END IF;

  -- 2. Vérification vidéo
  SELECT * INTO v_video FROM public.videos WHERE id = p_video_id AND is_published = TRUE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Vidéo introuvable');
  END IF;

  -- 3. Vérification seuil visionnage (au moins 80%)
  IF p_duration_watched < (v_video.duration_seconds * 0.8) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Visionnage insuffisant (80% requis)');
  END IF;

  -- 4. Vérification anti-doublon
  IF EXISTS (SELECT 1 FROM public.video_views WHERE user_id = v_user_id AND video_id = p_video_id AND viewed_date = v_today) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Vidéo déjà rémunérée aujourd''hui');
  END IF;

  -- 5. Vérification plafond 20 vidéos
  IF v_profile.watched_today_count >= 20 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Limite quotidienne de 20 vidéos atteinte');
  END IF;

  -- 6. Vérification plafond 1.50 USD
  IF (v_profile.earned_today + v_video.reward_amount) > 1.50 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Plafond quotidien de 1.50 USD atteint');
  END IF;

  -- 7. Mise à jour solde et enregistrement vue
  v_new_balance := v_profile.balance_available + v_video.reward_amount;

  UPDATE public.profiles
  SET
    balance_available = v_new_balance,
    balance_total = balance_total + v_video.reward_amount,
    watched_today_count = watched_today_count + 1,
    earned_today = earned_today + v_video.reward_amount,
    last_watched_date = v_today
  WHERE id = v_user_id;

  INSERT INTO public.video_views (user_id, video_id, watch_duration_seconds, reward_credited, viewed_date)
  VALUES (v_user_id, p_video_id, p_duration_watched, v_video.reward_amount, v_today);

  -- Écriture comptable
  INSERT INTO public.transactions (user_id, type, amount, description, status, balance_after)
  VALUES (v_user_id, 'video_reward', v_video.reward_amount, 'Visionnage validé: ' || v_video.title, 'completed', v_new_balance);

  RETURN jsonb_build_object('success', true, 'amount', v_video.reward_amount, 'new_balance', v_new_balance);
END;
$$;
