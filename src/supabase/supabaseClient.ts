/**
 * WATCH EARN — Client Supabase (Prêt pour la production)
 *
 * Pour connecter votre instance Supabase gratuite :
 * 1. Créez un projet gratuit sur https://supabase.com
 * 2. Exécutez le script SQL présent dans `src/supabase/supabase-schema.sql`
 * 3. Ajoutez vos clés dans le fichier d'environnement :
 *    VITE_SUPABASE_URL=https://votre-projet.supabase.co
 *    VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
 */

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};

export const getSupabaseConfig = () => {
  return {
    url: import.meta.env.VITE_SUPABASE_URL || 'Non configuré (Mode Local / Démo Actif)',
    isReady: isSupabaseConfigured(),
  };
};
