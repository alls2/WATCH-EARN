import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Inscription & Prime',
    question: 'Comment obtenir la prime de bienvenue de 1,00 USD ?',
    answer: 'La prime de bienvenue de 1,00 USD est créditée automatiquement et de façon unique lors de la création d’un compte valide après vérification des protocoles anti-fraude. Elle ne peut être créditée qu’une seule fois par personne physique.',
  },
  {
    category: 'Visionnage & Limites',
    question: 'Pourquoi y a-t-il une limite de 20 vidéos et 1,50 USD par jour ?',
    answer: 'Ces plafonds garantissent l’équilibre financier de la plateforme et empêchent l’épuisement abusif de la réserve de liquidité. Le compteur se réinitialise chaque jour à minuit dans le fuseau horaire IANA officiel de l’utilisateur.',
  },
  {
    category: 'Visionnage & Limites',
    question: 'Combien de temps faut-il regarder une vidéo pour valider la récompense ?',
    answer: 'L’ouverture d’une page ne suffit pas. L’utilisateur doit visionner au moins 80% de la durée de la vidéo pour activer le bouton de validation. Une même vidéo ne peut être rémunérée qu’une seule fois par jour pour un compte donné.',
  },
  {
    category: 'Publicité Adsterra',
    question: 'Dois-je obligatoirement cliquer sur le lien Adsterra sous la vidéo ?',
    answer: 'Non, absolument pas. Conformément aux directives d’Adsterra et à nos règles d’éthique, aucun clic n’est obligatoire et aucun clic ne conditionne ni n’augmente le montant de votre récompense vidéo. La zone publicitaire est strictement indépendante du lecteur.',
  },
  {
    category: 'Retraits & Paiements',
    question: 'Quelles sont les conditions strictes pour demander un retrait ?',
    answer: 'L’utilisateur doit obligatoirement réunir deux critères simultanés : détenir un solde disponible d’au moins 55,00 USD et compter au moins 3 filleuls ayant un compte réel et vérifié. Si l’une des deux conditions est manquante, le bouton de retrait reste désactivé.',
  },
  {
    category: 'Retraits & Paiements',
    question: 'Quels sont les moyens de paiement disponibles ?',
    answer: 'Selon votre pays de résidence : Orange Money, MTN Mobile Money, Wave, Moov Money, Flooz, T-Money, PayPal, Cartes bancaires Visa/Mastercard, Apple Pay, Google Pay, Payoneer et virement bancaire SWIFT/SEPA.',
  },
  {
    category: 'Parrainage & Anti-Fraude',
    question: 'Puis-je m’auto-parrainer pour atteindre les 3 filleuls vérifiés ?',
    answer: 'Non. Tout auto-parrainage, utilisation de VPN/proxies, création de multiples comptes sur un même appareil ou inscriptions de robots est détecté par notre système de contrôle. Les comptes fautifs sont définitivement bannis et les récompenses annulées.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Foire Aux Questions (FAQ)
        </h1>
        <p className="text-sm text-slate-400">
          Toutes les réponses officielles concernant l'utilisation de WATCH EARN.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white">{item.question}</h3>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
