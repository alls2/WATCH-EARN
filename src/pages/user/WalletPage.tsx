import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentProvider } from '../../types';
import {
  Wallet,
  Clock,
  Gift,
  Trophy,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ProviderOption {
  id: PaymentProvider;
  name: string;
  category: string;
  feePercent: number;
}

const PROVIDERS: ProviderOption[] = [
  { id: 'paypal', name: 'PayPal', category: 'Portefeuille Électronique', feePercent: 2.7 },
  { id: 'orange_money', name: 'Orange Money', category: 'Mobile Money', feePercent: 1.5 },
  { id: 'mtn_momo', name: 'MTN Mobile Money', category: 'Mobile Money', feePercent: 1.5 },
  { id: 'wave', name: 'Wave', category: 'Mobile Money', feePercent: 1.0 },
  { id: 'moov', name: 'Moov Money', category: 'Mobile Money', feePercent: 1.5 },
  { id: 'visa', name: 'Carte Visa', category: 'Carte Bancaire', feePercent: 2.5 },
  { id: 'mastercard', name: 'Carte Mastercard', category: 'Carte Bancaire', feePercent: 2.5 },
  { id: 'bank_wire', name: 'Virement bancaire (SWIFT / SEPA)', category: 'Banque', feePercent: 3.0 },
];

export const WalletPage: React.FC = () => {
  const { currentUser, platformSettings, transactions, referrals, submitWithdrawalRequest } = useApp();

  const userReferrals = referrals.filter((r) => r.referrerId === currentUser.id);
  const verifiedRefsCount = userReferrals.filter((r) => r.status === 'verified').length;

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState<number>(55.00);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('paypal');
  const [accountDetail, setAccountDetail] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fee calculation matching reference image
  const selectedOption = PROVIDERS.find((p) => p.id === selectedProvider) || PROVIDERS[0];
  const feeAmount = Number((withdrawAmount * 0.027).toFixed(2)); // ~1.50 $ on 55$
  const estimatedNetAmount = Math.max(0, Number((withdrawAmount - feeAmount).toFixed(2)));

  // Conditions check
  const hasMinBalance = currentUser.balanceAvailable >= 55.00;
  const hasThreeReferrals = verifiedRefsCount >= 3;
  const isEligible = hasMinBalance && hasThreeReferrals;

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const res = submitWithdrawalRequest(
      withdrawAmount,
      selectedProvider,
      accountDetail.trim() || `${currentUser.email}`
    );

    if (res.success) {
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } else {
      setSubmitError(res.error || 'Erreur lors du traitement du retrait.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================== */}
        {/* 1. CARD "Mon Portefeuille" MATCHING REFERENCE IMAGE (7 cols)    */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 we-card p-6 sm:p-7 rounded-3xl space-y-6 border border-[#162f52] shadow-2xl">
          {/* Header of Mon Portefeuille */}
          <div className="flex items-center justify-between pb-3 border-b border-[#142844]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <h1 className="text-lg font-black text-white">Mon Portefeuille</h1>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Grand Livre Comptable</span>
          </div>

          {/* Top balances grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Left Big Card: Solde total */}
            <div className="sm:col-span-7 p-5 rounded-2xl bg-[#06101c] border border-[#162f52] space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Solde total</span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {currentUser.balanceTotal.toFixed(2)} $
              </div>
              <div className="text-xs text-[#00e59b] font-bold font-mono pt-1">
                Disponible : {currentUser.balanceAvailable.toFixed(2)} $
              </div>
            </div>

            {/* Right stacked cards: En attente + Bonus de bienvenue */}
            <div className="sm:col-span-5 space-y-3">
              {/* En attente */}
              <div className="p-3.5 rounded-xl bg-[#06101c] border border-[#142844] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">En attente</span>
                  <div className="text-base font-black text-white font-mono leading-none">
                    {currentUser.balancePending.toFixed(2)} $
                  </div>
                </div>
              </div>

              {/* Bonus de bienvenue */}
              <div className="p-3.5 rounded-xl bg-[#06101c] border border-[#142844] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Bonus de bienvenue</span>
                  <div className="text-base font-black text-white font-mono leading-none">
                    1.00 $
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historique des transactions matching Reference Image */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>Historique des transactions</span>
              <span className="text-[#00e59b] text-[11px] font-normal cursor-pointer hover:underline">
                Voir tout &rarr;
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {transactions.slice(0, 3).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-[#06101c] border border-[#142844] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0a182a] flex items-center justify-center text-slate-300">
                      {tx.type === 'video_reward' && <Trophy className="w-4 h-4 text-[#00e59b]" />}
                      {tx.type === 'welcome_bonus' && <Gift className="w-4 h-4 text-amber-400" />}
                      {tx.type === 'withdrawal_request' && <CreditCard className="w-4 h-4 text-rose-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-white">{tx.description}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{tx.id}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-mono font-bold ${
                        tx.amount >= 0 ? 'text-[#00e59b]' : 'text-rose-400'
                      }`}
                    >
                      {tx.amount >= 0 ? `+${tx.amount.toFixed(2)} $` : `${tx.amount.toFixed(2)} $`}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{tx.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Big Action Button */}
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('withdrawal-form-card');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="we-btn-emerald w-full py-3 rounded-xl text-xs font-bold cursor-pointer text-center block"
            >
              Demander un retrait
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CARD "Demande de retrait" MATCHING REFERENCE IMAGE (5 cols) */}
        {/* ============================================================== */}
        <div
          id="withdrawal-form-card"
          className="lg:col-span-5 we-card p-6 sm:p-7 rounded-3xl space-y-5 border border-[#162f52] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-2 pb-3 border-b border-[#142844]">
            <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-white">Demande de retrait</h2>
          </div>

          {/* Conditions requises checklist matching Reference Image */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-white block">Conditions requises :</span>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#06101c] border border-[#142844]">
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className={`w-4 h-4 ${hasMinBalance ? 'text-[#00e59b]' : 'text-slate-600'}`} />
                  <span>Solde minimum : 55.00 $</span>
                </div>
                {hasMinBalance ? (
                  <Check className="w-4 h-4 text-[#00e59b]" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">
                    {(55.00 - currentUser.balanceAvailable).toFixed(2)}$ restant
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#06101c] border border-[#142844]">
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className={`w-4 h-4 ${hasThreeReferrals ? 'text-[#00e59b]' : 'text-slate-600'}`} />
                  <span>3 filleuls vérifiés ({verifiedRefsCount} / 3)</span>
                </div>
                {hasThreeReferrals ? (
                  <Check className="w-4 h-4 text-[#00e59b]" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-mono">
                    {3 - verifiedRefsCount} manquant
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Feedback messages */}
          {submitSuccess && (
            <div className="p-3 rounded-xl bg-[#00e59b]/15 border border-[#00e59b]/40 text-[#00e59b] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Demande soumise avec succès ! Audit administratif sous 24-48h.</span>
            </div>
          )}

          {submitError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Form matching Reference Image */}
          <form onSubmit={handleWithdrawalSubmit} className="space-y-4 text-xs">
            {/* Montant à retirer */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Montant à retirer :</label>
              <div className="flex items-center rounded-xl bg-[#06101c] border border-[#142844] overflow-hidden focus-within:border-[#00e59b]">
                <input
                  type="number"
                  min={55.00}
                  step={0.01}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-transparent text-white font-mono font-bold focus:outline-none"
                  required
                />
                <span className="px-3 text-xs text-slate-400 font-bold bg-[#0a182a] py-2.5 border-l border-[#142844]">
                  USD ⌵
                </span>
              </div>
            </div>

            {/* Moyen de paiement */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Moyen de paiement :</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as PaymentProvider)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:outline-none focus:border-[#00e59b] cursor-pointer"
              >
                {PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Account Details */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Coordonnées du compte bénéficiaire :</label>
              <input
                type="text"
                value={accountDetail}
                onChange={(e) => setAccountDetail(e.target.value)}
                placeholder="Ex: adresse PayPal, numéro Mobile Money (+225...), IBAN..."
                className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-white placeholder-slate-500 focus:outline-none focus:border-[#00e59b]"
                required
              />
            </div>

            {/* Summary Box matching Reference Image */}
            <div className="p-3 rounded-xl bg-[#dbeafe]/90 text-slate-900 border border-blue-200 text-center font-semibold text-xs">
              Montant net estimé :{' '}
              <strong className="text-slate-950 font-bold font-mono">
                {estimatedNetAmount.toFixed(2)} $
              </strong>{' '}
              <span className="text-slate-600 text-[11px]">(Frais : {feeAmount.toFixed(2)} $)</span>
            </div>

            {/* Submit Button matching Reference Image */}
            <button
              type="submit"
              disabled={!isEligible}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                isEligible
                  ? 'we-btn-emerald cursor-pointer'
                  : 'bg-[#0a1727] text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {isEligible ? 'Soumettre la demande' : 'Conditions non remplies'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
