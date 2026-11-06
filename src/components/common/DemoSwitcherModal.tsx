import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PROFILES } from '../../data/mockData';
import { Sparkles, RefreshCw, Shield, ChevronDown, CheckCircle2, UserCheck, Clock, X } from 'lucide-react';

export const DemoSwitcherModal: React.FC = () => {
  const { activeDemoKey, switchDemoProfile, resetDailyCounters, currentUser, platformSettings } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Discreet floating trigger at bottom-right - Isolated from main user UI */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0a1525]/90 hover:bg-[#0f213a] text-slate-200 border border-[#00e59b]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md text-xs font-semibold cursor-pointer transition-all hover:scale-105"
          title="Ouvrir le panneau de démonstration et scénarios de test"
        >
          <span className="w-2 h-2 rounded-full bg-[#00e59b] animate-pulse" />
          <span className="font-mono text-[#00e59b] text-[10px] uppercase font-bold tracking-wider">DEMO</span>
          <span className="hidden sm:inline text-[11px] text-slate-300">
            {DEMO_PROFILES[activeDemoKey]?.user.username || 'DemoUser'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Floating Demo Scenarios Drawer */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-16 right-4 z-50 w-84 sm:w-96 bg-[#091322] border border-[#172d4c] rounded-2xl shadow-2xl p-4 text-left space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#00e59b]/15 text-[#00e59b] font-mono text-[10px] font-bold">
                  DEMO
                </span>
                <span className="text-xs font-bold text-white">Scénarios de Démonstration Isolés</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sélectionnez un scénario de test pour vérifier instantanément les différents états sans modifier la base de données.
            </p>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {Object.entries(DEMO_PROFILES).map(([key, item]) => {
                const isSelected = activeDemoKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      switchDemoProfile(key);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00e59b]/10 border-[#00e59b]/50 text-white'
                        : 'bg-[#0c1a2e]/60 border-slate-800 text-slate-300 hover:bg-[#0f213a] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span className="flex items-center gap-1.5 text-xs font-bold">
                        {key === 'adminUser' && <Shield className="w-3.5 h-3.5 text-[#00e59b]" />}
                        {item.label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00e59b]" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400 font-mono">
                      <span>Solde: {item.user.balanceAvailable.toFixed(2)}$</span>
                      <span>·</span>
                      <span>Vues: {item.user.watchedTodayCount}/{platformSettings.dailyVideoLimit}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Midnight Reset Simulator */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Réinitialiser les 24h :</span>
              <button
                onClick={() => {
                  resetDailyCounters();
                  setIsOpen(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#00e59b]/20 hover:text-[#00e59b] border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simuler Minuit (Reset)</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
