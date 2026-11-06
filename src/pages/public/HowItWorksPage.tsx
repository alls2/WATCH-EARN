import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserPlus,
  PlaySquare,
  Users,
  Wallet,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Guide Complet & Règles Officielles
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Comment fonctionne WATCH EARN ?
        </h1>
        <p className="text-sm text-slate-400">
          Découvrez en toute transparence les mécanismes de visionnage, d'attribution des récompenses et des critères de retrait.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
            01
          </div>
          <h2 className="text-lg font-bold text-white">Inscription & Prime de Bienvenue</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Créez votre compte gratuitement en renseignant votre pays, votre langue et un identifiant unique.
            Dès validation légitime de votre inscription, une prime de bienvenue unique de <strong>1,00 USD</strong> est
            automatiquement inscrite dans votre grand livre comptable. Cette prime est strictement limitée à une par utilisateur réel.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
            02
          </div>
          <h2 className="text-lg font-bold text-white">Visionnage Vérifié & Plafonds</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Parcourez les catégories (technologie, entrepreneuriat, éducation). Chaque vidéo possède un prix unitaire
            configuré (de 0,03$ à 0,15$). Vous devez visionner au moins <strong>80% du contenu</strong> pour débloquer la validation.
            Le système applique deux plafonds stricts : maximum <strong>20 vidéos</strong> et <strong>1,50 USD</strong> par utilisateur et par jour.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
            03
          </div>
          <h2 className="text-lg font-bold text-white">Parrainage Sécurisé & Anti-Fraude</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Partagez votre lien d'invitation avec vos contacts. Les simples clics ou comptes automatisés ne sont pas
            comptabilisés. Seuls les comptes réels ayant validé les contrôles d'intégrité deviennent des filleuls vérifiés.
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
            04
          </div>
          <h2 className="text-lg font-bold text-white">Retrait des Fonds Validés</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pour demander un décaissement, vous devez remplir deux critères obligatoires simultanés : détenir au moins <strong>55,00 USD</strong> de
            solde disponible et compter au moins <strong>3 filleuls vérifiés</strong>. Vous choisissez ensuite votre prestataire préféré
            (Orange Money, MTN MoMo, Wave, PayPal, Visa, etc.).
          </p>
        </div>
      </div>

      {/* Rules table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Récapitulatif des Règles & Limites Systèmes
        </h3>

        <div className="divide-y divide-slate-800 text-xs text-slate-300">
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Prime de bienvenue :</span>
            <strong className="text-white font-mono">1,00 USD (unique par compte)</strong>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Vidéos rémunérées quotidiennes :</span>
            <strong className="text-white font-mono">20 vidéos maximum / jour</strong>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Gains vidéo maximum par jour :</span>
            <strong className="text-white font-mono">1,50 USD / jour</strong>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Réinitialisation des compteurs :</span>
            <strong className="text-white font-mono">À minuit (fuseau horaire IANA local)</strong>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Montant minimum de retrait :</span>
            <strong className="text-white font-mono">55,00 USD</strong>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-400">Filleuls avec compte vérifié requis :</span>
            <strong className="text-white font-mono">3 filleuls vérifiés</strong>
          </div>
        </div>
      </div>

      {/* Disclaimer Card */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-white">Engagement de Transparence Économique :</strong>
          <p className="leading-relaxed">
            WATCH EARN ne promet aucun enrichissement rapide ni gains garantis. Les récompenses sont corrélées aux revenus générés par les partenariats légitimes et aux réserves de liquidité disponibles.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentRoute('videos')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-emerald-500/20"
        >
          <span>Découvrir les vidéos dès maintenant</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
