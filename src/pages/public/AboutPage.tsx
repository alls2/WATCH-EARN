import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Target, Globe, Users, TrendingUp } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          À Propos de WATCH EARN
        </h1>
        <p className="text-sm text-slate-400">
          La plateforme internationale qui valorise le temps d'attention et la découverte de contenus inspirants.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          Notre Mission
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Fondée sur le principe <strong>WATCH. DISCOVER. EARN.</strong>, notre mission est de proposer
          une passerelle équitable entre les créateurs de contenu de valeur (technologie, entrepreneuriat, sciences, culture)
          et un public international curieux. Nous redéfinissons la relation entre spectateurs et diffuseurs en instaurant
          des règles transparentes et un suivi comptable rigoureux.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Présence Mondiale</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Accessible dans plus de 150 pays avec 8 langues majeures supportées dès le premier jour, y compris l'arabe avec orientation RTL complète.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Intégrité & Anti-Fraude</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Protection stricte contre les comptes dupliqués, les fermes de clics et les scripts automatisés afin de préserver l'équité pour chaque utilisateur réel.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Pérennité Économique</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Un modèle sans promesse irréaliste, conditionné par la liquidité réelle et les partenariats légitimes comme Adsterra Publisher.
          </p>
        </div>
      </div>
    </div>
  );
};
