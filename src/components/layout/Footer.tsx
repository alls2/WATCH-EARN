import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import { WatchEarnLogo } from '../common/WatchEarnLogo';
import { ShieldCheck, Database, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute, currentLanguage, setLanguage, t } = useApp();

  return (
    <footer className="bg-[#050a12] border-t border-[#102136] text-slate-400 text-xs mt-20 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 text-left">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <WatchEarnLogo size="md" showSlogan={true} />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Une plateforme internationale de vidéos et de récompenses.
              Regardez des vidéos, découvrez des contenus enrichissants et atteignez vos objectifs
              avec un suivi comptable transparent et des règles de validation claires.
            </p>

            {/* 8 Languages selector */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00e59b]" />
                <span>Langues disponibles (8 langues) :</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                      currentLanguage === l.code
                        ? 'bg-[#00e59b] text-slate-950 font-bold shadow-sm'
                        : 'bg-[#081525] text-slate-300 hover:text-white border border-[#142844]'
                    }`}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00e59b] cursor-pointer">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('how-it-works')} className="hover:text-[#00e59b] cursor-pointer">
                  Comment ça marche
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('videos')} className="hover:text-[#00e59b] cursor-pointer">
                  Bibliothèque Vidéos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('about')} className="hover:text-[#00e59b] cursor-pointer">
                  À propos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('faq')} className="hover:text-[#00e59b] cursor-pointer">
                  Foire Aux Questions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('contact')} className="hover:text-[#00e59b] cursor-pointer">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Private Spaces */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Espace Membre
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentRoute('dashboard')} className="hover:text-[#00e59b] cursor-pointer">
                  Tableau de bord
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('wallet')} className="hover:text-[#00e59b] cursor-pointer">
                  Mon Portefeuille
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('referral')} className="hover:text-[#00e59b] cursor-pointer">
                  Mon Parrainage
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('admin')} className="text-[#00e59b] hover:underline cursor-pointer">
                  Espace Administrateur
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('architecture-report')} className="hover:text-[#00e59b] cursor-pointer flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#00e59b]" />
                  <span>Rapport Supabase</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Politiques & Légal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentRoute('cgu')} className="hover:text-[#00e59b] cursor-pointer">
                  Conditions Générales
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('privacy')} className="hover:text-[#00e59b] cursor-pointer">
                  Politique de Confidentialité
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('cookies')} className="hover:text-[#00e59b] cursor-pointer">
                  Gestion des Cookies
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('rewards-policy')} className="hover:text-[#00e59b] cursor-pointer">
                  Politique des Récompenses
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('referral-rules')} className="hover:text-[#00e59b] cursor-pointer">
                  Règles de Parrainage
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('withdrawal-rules')} className="hover:text-[#00e59b] cursor-pointer">
                  Règles de Retrait
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Guarantee & Copyright */}
        <div className="pt-6 border-t border-[#102136] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00e59b] shrink-0" />
            <span>
              WatchEarn applique une politique stricte anti-fraude. Retraits : 55 USD min. & 3 filleuls vérifiés.
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            © 2026 WatchEarn — WATCH. DISCOVER. EARN. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
