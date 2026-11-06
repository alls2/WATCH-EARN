import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, FileText, Lock, Cookie, Gift, Users, CreditCard } from 'lucide-react';

interface LegalPageProps {
  type: 'cgu' | 'privacy' | 'cookies' | 'rewards-policy' | 'referral-rules' | 'withdrawal-rules';
}

export const LegalPages: React.FC<LegalPageProps> = ({ type }) => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      {/* Navigation tabs between policies */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs">
        <button
          onClick={() => setCurrentRoute('cgu')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'cgu' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          CGU
        </button>
        <button
          onClick={() => setCurrentRoute('privacy')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'privacy' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Confidentialité
        </button>
        <button
          onClick={() => setCurrentRoute('cookies')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'cookies' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Cookies
        </button>
        <button
          onClick={() => setCurrentRoute('rewards-policy')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'rewards-policy' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Politique des Récompenses
        </button>
        <button
          onClick={() => setCurrentRoute('referral-rules')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'referral-rules' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Règles de Parrainage
        </button>
        <button
          onClick={() => setCurrentRoute('withdrawal-rules')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            type === 'withdrawal-rules' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Règles de Retrait
        </button>
      </div>

      {/* CGU */}
      {type === 'cgu' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Conditions Générales d’Utilisation</h1>
              <p className="text-xs text-slate-400">Dernière mise à jour : 1er Novembre 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white">1. Objet de la plateforme</h2>
            <p>
              WATCH EARN est un service international de diffusion et de découverte de vidéos.
              L’inscription est gratuite et ouverte à toute personne physique âgée d’au moins 18 ans
              ou disposant de l’accord de ses représentants légaux.
            </p>

            <h2 className="text-sm font-bold text-white">2. Absence d’obligation d'achat ou d'investissement</h2>
            <p>
              Aucun abonnement, aucun paiement préalable ni aucun investissement financier obligatoire n'est exigé
              pour créer un compte, visionner des vidéos ou participer au programme de parrainage.
            </p>

            <h2 className="text-sm font-bold text-white">3. Utilisation conforme et loyale</h2>
            <p>
              L’utilisateur s’engage à ne pas utiliser de scripts, d’émulateurs, de serveurs mandataires (proxies)
              ou de comptes multiples pour contourner les plafonds quotidiens fixés à 20 vidéos et 1,50 USD par jour.
            </p>
          </div>
        </div>
      )}

      {/* Privacy */}
      {type === 'privacy' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Politique de Confidentialité & RGPD</h1>
              <p className="text-xs text-slate-400">Protection des données personnelles</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white">1. Données collectées</h2>
            <p>
              Nous collectons uniquement les informations strictement nécessaires à la fourniture du service :
              nom complet, nom d’utilisateur, adresse e-mail, pays de résidence, fuseau horaire et coordonnées
              de paiement fournies lors d’une demande de retrait.
            </p>

            <h2 className="text-sm font-bold text-white">2. Sécurité des transactions</h2>
            <p>
              Aucun mot de passe n'est stocké en clair. Les données sensibles sont chiffrées selon les standards
              bancaires et la directive européenne de protection des données (RGPD).
            </p>
          </div>
        </div>
      )}

      {/* Cookies */}
      {type === 'cookies' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <Cookie className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Politique Relative aux Cookies</h1>
              <p className="text-xs text-slate-400">Cookies techniques et d’authentification</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <p>
              WATCH EARN utilise des cookies techniques nécessaires au fonctionnement du site :
              maintien de la session utilisateur, conservation de la langue choisie (8 langues disponibles)
              et prévention des fraudes. Aucun cookie traceur invasif n'est revendu à des tiers.
            </p>
          </div>
        </div>
      )}

      {/* Rewards Policy */}
      {type === 'rewards-policy' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Politique Officielle des Récompenses</h1>
              <p className="text-xs text-slate-400">Règles d'attribution et de validation</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white">1. Prime de bienvenue</h2>
            <p>
              Une prime unique de <strong>1,00 USD</strong> est attribuée après inscription et validation légitime.
              Elle ne peut être perçue qu'une seule fois par personne.
            </p>

            <h2 className="text-sm font-bold text-white">2. Récompenses de visionnage</h2>
            <p>
              Chaque vidéo dispose de son prix propre (ex : 0,03$, 0,05$, 0,075$, 0,10$, 0,15$).
              Pour obtenir la récompense, le spectateur doit regarder au moins <strong>80% de la vidéo</strong>.
              Une vidéo ne peut être rémunérée qu'une fois par utilisateur.
            </p>

            <h2 className="text-sm font-bold text-white">3. Plafonds stricts</h2>
            <p>
              Maximum <strong>20 vidéos</strong> et <strong>1,50 USD</strong> par utilisateur et par jour.
              Réinitialisation à minuit heure locale (fuseau IANA).
            </p>
          </div>
        </div>
      )}

      {/* Referral Rules */}
      {type === 'referral-rules' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Règles Officielles du Parrainage</h1>
              <p className="text-xs text-slate-400">Comptabilisation des filleuls et contrôles anti-fraude</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white">1. Définition d'un filleul vérifié</h2>
            <p>
              Un simple clic sur un lien ne confère aucun statut de filleul. Un filleul vérifié est un compte
              réellement créé, ayant validé son adresse e-mail et ses paramètres, sans partage d'adresse IP ou d'appareil avec le parrain.
            </p>

            <h2 className="text-sm font-bold text-white">2. Interdiction absolue d'auto-parrainage</h2>
            <p>
              Toute tentative d'inscription de faux profils par un même individu pour atteindre le seuil de 3 filleuls
              entraîne la clôture immédiate de tous les comptes associés.
            </p>
          </div>
        </div>
      )}

      {/* Withdrawal Rules */}
      {type === 'withdrawal-rules' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Règles & Conditions de Retrait</h1>
              <p className="text-xs text-slate-400">Seuils obligatoires et prestataires de paiement</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white">1. Double condition cumulative</h2>
            <p>
              Tout retrait exige <strong>simultanément</strong> :
              <br />· Un solde disponible d'au moins <strong>55,00 USD</strong>.
              <br />· Au moins <strong>3 filleuls vérifiés</strong> audités sans fraude.
            </p>

            <h2 className="text-sm font-bold text-white">2. Délais et audit administratif</h2>
            <p>
              Chaque demande fait l'objet d'une validation comptable par un administrateur sous 24 à 72 heures ouvrées.
              En cas d'informations erronées ou de non-conformité, la demande est rejetée et le solde recrédité.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
