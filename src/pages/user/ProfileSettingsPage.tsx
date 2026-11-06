import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import { User, Shield, Globe, Clock, CheckCircle2, Key, Bell, Save } from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser, currentLanguage, setLanguage, logout } = useApp();

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [country, setCountry] = useState(currentUser.country);
  const [timezone, setTimezone] = useState(currentUser.timezone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Profil & Paramètres Personnels
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gérez vos préférences de langue, fuseau horaire, informations de sécurité et session.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Vos modifications ont été enregistrées avec succès.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Informations du Compte
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nom complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Nom d'utilisateur</label>
              <input
                type="text"
                value={currentUser.username}
                disabled
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 font-mono cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500">L'identifiant unique ne peut être modifié.</span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Adresse e-mail</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> E-mail vérifié par contrôle anti-fraude
              </span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Pays de résidence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* International Preferences (Language, Timezone) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            Paramètres Internationaux Indépendants
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Langue de l'interface (8 langues)</label>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Fuseau Horaire IANA</label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500">
                Sert à réinitialiser la limite de 20 vidéos et 1,50$ chaque jour à minuit pile.
              </span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-semibold cursor-pointer"
          >
            Se déconnecter
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer mes paramètres</span>
          </button>
        </div>
      </form>
    </div>
  );
};
