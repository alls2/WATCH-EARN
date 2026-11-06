import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCode,
  Database,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { getSupabaseConfig } from '../../supabase/supabaseClient';

export const ArchitectureReportModal: React.FC = () => {
  const { platformSettings, setCurrentRoute } = useApp();
  const [copiedSql, setCopiedSql] = useState(false);
  const supabaseConfig = getSupabaseConfig();

  const handleCopySqlNotice = () => {
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      <div className="pb-6 border-b border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase">
          <Layers className="w-3.5 h-3.5" />
          Livrable & Audit Technique
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Rapport d’Architecture & État d’Intégration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Inventaire exhaustif des fonctionnalités opérationnelles, des contrôles de sécurité et du guide de branchement Supabase.
        </p>
      </div>

      {/* Grid of operational components vs to connect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What is Fully Working Right Now */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Fonctionnalités Entièrement Opérationnelles</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>8 Langues & RTL :</strong> Français, Anglais, Espagnol, Portugais, Allemand, Arabe (RTL), Chinois, Italien. Détection automatique et persistance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Lecteur Vidéo Réel & Validation 80% :</strong> Détection automatique du temps de visionnage, bouton de validation débloqué uniquement après 80%.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Plafonds Quotidiens & Minuit IANA :</strong> 20 vidéos maximum et 1,50 USD/jour vérifiés avant chaque crédit, avec simulateur de minuit.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Anti-Doublon :</strong> Interdiction de double récompense sur la même vidéo.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Régie Adsterra Direct Link (Section 13) :</strong> Emplacement direct sous le lecteur, format direct link respecté, administration centralisée sans toucher au code.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Double Condition de Retrait (Section 15) :</strong> Seuil strict de 55,00 USD ET 3 filleuls avec compte vérifié.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Grand Livre Comptable :</strong> Écritures double-entrée à chaque bonus, visionnage, retrait et annulation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Espace Administrateur Complet :</strong> Modération des retraits, gestion des vidéos, modification des prix et liens publicitaires.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>6 Profils de Démonstration :</strong> Test en 1 clic de tous les scénarios (Nouveau, Actif, Limite atteinte, Non-éligible, Éligible, Admin).</span>
            </li>
          </ul>
        </div>

        {/* What Requires Backend / Payment Gateways Connection */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Clock className="w-5 h-5" />
            <span>Préparations Techniques & Connexions Futures</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">→</span>
              <span><strong>Supabase PostgreSQL :</strong> Le schéma complet avec RLS et fonction stockée est prêt dans <code>src/supabase/supabase-schema.sql</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">→</span>
              <span><strong>Passerelles de Paiement Réelles :</strong> Les formulaires collectent les comptes (MTN, Orange Money, Wave, PayPal, Visa, etc.). Le décaissement réel nécessite la souscription aux API marchandes respectives (ex : Orange Money Webpay, Wave Merchant API, MTN MoMo Developer).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">→</span>
              <span><strong>Compte Adsterra Publisher :</strong> Le lien par défaut est configuré et modifiable en direct depuis l'administration. Le propriétaire peut y insérer son Direct Link officiel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">→</span>
              <span><strong>SMTP / Envoi d'E-mails :</strong> Actuellement simulé en interface avec accusé de réception instantané.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Supabase Guide */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>Guide de Raccordement Supabase (Option Gratuite)</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono">0$ / Aucun investissement initial</span>
        </div>

        <ol className="text-xs text-slate-300 space-y-2 list-decimal pl-5 leading-relaxed">
          <li>Créez un compte gratuit sur <strong>supabase.com</strong> et créez un nouveau projet.</li>
          <li>Ouvrez le menu <strong>SQL Editor</strong> de Supabase.</li>
          <li>Copiez l'intégralité du fichier <code>src/supabase/supabase-schema.sql</code> et exécutez-le. Il génère toutes les tables (profiles, videos, transactions, withdrawals, referrals, platform_settings) et les règles de sécurité RLS.</li>
          <li>Copiez votre <code>Project URL</code> et votre <code>Anon Public Key</code> dans vos variables d'environnement.</li>
        </ol>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => setCurrentRoute('home')}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};
