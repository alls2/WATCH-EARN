import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import { WatchEarnLogo } from '../../components/common/WatchEarnLogo';
import { Lock, Mail, User, Globe, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentRoute, switchDemoProfile } = useApp();
  const [identifier, setIdentifier] = useState('DemoUser');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchDemoProfile('activeUser');
    setCurrentRoute('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6 text-left">
      <div className="text-center space-y-3 flex flex-col items-center">
        <WatchEarnLogo size="lg" showSlogan={true} />
        <h1 className="text-2xl font-black text-white pt-2">Connexion à WatchEarn</h1>
        <p className="text-xs text-slate-400">Accédez à votre tableau de bord, vidéos et portefeuille</p>
      </div>

      <div className="we-card p-6 sm:p-8 rounded-3xl border border-[#162f52] shadow-2xl space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Nom d'utilisateur ou E-mail</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Mot de passe</label>
              <button
                type="button"
                onClick={() => alert('Lien de réinitialisation sécurisé envoyé à votre adresse e-mail.')}
                className="text-[11px] text-[#00e59b] hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="we-btn-emerald w-full py-3 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md"
          >
            Se connecter
          </button>
        </form>

        <div className="pt-4 border-t border-[#142844] text-center text-xs text-slate-400">
          Pas encore de compte ?{' '}
          <button
            onClick={() => setCurrentRoute('register')}
            className="text-[#00e59b] font-bold hover:underline cursor-pointer"
          >
            Créer un compte (+1,00 $ bonus)
          </button>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { registerAccount, currentLanguage, setLanguage, setCurrentRoute } = useApp();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('France');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    registerAccount({
      fullName,
      username,
      email,
      country,
      referralCode: referralCode.trim() || undefined,
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6 text-left">
      <div className="text-center space-y-3 flex flex-col items-center">
        <WatchEarnLogo size="lg" showSlogan={true} />
        <h1 className="text-2xl font-black text-white pt-2">Créer un Compte WatchEarn</h1>
        <p className="text-xs text-slate-400">
          Rejoignez la plateforme internationale et recevez 1,00 $ de prime de bienvenue
        </p>
      </div>

      <div className="we-card p-6 sm:p-8 rounded-3xl border border-[#162f52] shadow-2xl space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nom Complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Sarah Martin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nom d'utilisateur unique</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                placeholder="sarah_m"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white font-mono focus:border-[#00e59b] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Adresse E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Pays de résidence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ex : France, Sénégal, Maroc, Canada..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Langue de l'interface</label>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Code de parrainage (facultatif)</label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="Ex : WE12345"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white font-mono focus:border-[#00e59b] focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#00e59b]/15 border border-[#00e59b]/30 text-[11px] text-[#00e59b]">
            Une prime unique de <strong>1,00 USD</strong> sera inscrite sur votre grand livre dès la validation de votre compte.
          </div>

          <button
            type="submit"
            className="we-btn-emerald w-full py-3 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md"
          >
            Créer mon compte (+1,00 $ bonus)
          </button>
        </form>

        <div className="pt-4 border-t border-[#142844] text-center text-xs text-slate-400">
          Vous possédez déjà un compte ?{' '}
          <button
            onClick={() => setCurrentRoute('login')}
            className="text-[#00e59b] font-bold hover:underline cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};
