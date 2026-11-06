import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  TrendingUp,
  Wallet,
  Users,
  Bell,
  Settings,
  Gift,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const {
    currentUser,
    setCurrentRoute,
    platformSettings,
    transactions,
    referrals,
    openVideoPlayer,
    videos,
  } = useApp();

  const userReferrals = referrals.filter((r) => r.referrerId === currentUser.id);
  const verifiedRefsCount = userReferrals.filter((r) => r.status === 'verified').length;

  const progressPercent = Math.min(
    100,
    Math.round((currentUser.watchedTodayCount / platformSettings.dailyVideoLimit) * 100)
  );

  const remainingVideos = Math.max(0, platformSettings.dailyVideoLimit - currentUser.watchedTodayCount);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Official "Tableau de bord" Container from Reference Image */}
      <div className="we-card p-6 sm:p-8 rounded-3xl space-y-6 border border-[#162f52] shadow-2xl">
        {/* Top Header of Tableau de bord with icons */}
        <div className="flex items-center justify-between pb-4 border-b border-[#142844]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <h1 className="text-xl font-black text-white">Tableau de bord</h1>
            <span className="ml-2 px-2 py-0.5 rounded bg-[#00e59b]/10 text-[#00e59b] text-[10px] font-mono font-bold">
              DEMO
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRoute('notifications')}
              className="p-2 rounded-xl bg-[#07101c] border border-[#142844] hover:border-[#00e59b]/40 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentRoute('profile')}
              className="p-2 rounded-xl bg-[#07101c] border border-[#142844] hover:border-[#00e59b]/40 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Paramètres"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Greeting Row with Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0c1a2e] border-2 border-[#00e59b] flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(0,229,155,0.35)] shrink-0 overflow-hidden">
            {currentUser.username === 'DemoUser' ? (
              <img
                src="/src/assets/images/video_thumb_tech_1794004938985.jpg"
                alt="DemoUser avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{currentUser.fullName.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Bonjour, {currentUser.fullName} !
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Bienvenue sur WatchEarn</p>
          </div>
        </div>

        {/* 4 Stats Cards in Row matching Reference Image */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">Solde total</span>
            <div className="text-2xl font-black text-white font-mono">
              {currentUser.balanceTotal.toFixed(2)} $
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">Gains du jour</span>
            <div className="text-2xl font-black text-[#00e59b] font-mono">
              {currentUser.earnedToday.toFixed(2)} $
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">Vidéos vues</span>
            <div className="text-2xl font-black text-white font-mono">
              {currentUser.watchedTodayCount} / {platformSettings.dailyVideoLimit}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">Parrainages</span>
            <div className="text-2xl font-black text-white font-mono">
              {verifiedRefsCount}
            </div>
          </div>
        </div>

        {/* Daily Progress Bar matching Reference Image */}
        <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-white">
              Progression quotidienne : <strong className="text-[#00e59b]">{progressPercent}%</strong>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">{remainingVideos} vidéos restantes</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00c2ff] to-[#00e59b] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom Split: Activité récente & Bonus de bienvenue card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Activité récente (7 cols) */}
          <div className="md:col-span-7 p-4 rounded-xl bg-[#06101c] border border-[#142844] space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Activité récente
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0a1525] border border-[#14263f]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e59b]" />
                  <span className="text-slate-200">Vidéo regardée (+0.10 $)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Il y a 5 min</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0a1525] border border-[#14263f]">
                <div className="flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-200">Bonus de bienvenue (+1.00 $)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Il y a 1 jour</span>
              </div>
            </div>
          </div>

          {/* Bonus de bienvenue Card (5 cols) matching Reference Image */}
          <div className="md:col-span-5 p-4 rounded-xl bg-gradient-to-br from-[#061220] to-[#0a1e35] border border-[#00e59b]/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00e59b]/20 border border-[#00e59b]/40 flex items-center justify-center text-[#00e59b] shrink-0 shadow-[0_0_12px_rgba(0,229,155,0.3)]">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Bonus de bienvenue</span>
                <span className="text-2xl font-black text-[#00e59b] font-mono leading-none block my-0.5">
                  1.00 $
                </span>
                <span className="text-[10px] text-slate-400 block">Crédité à votre inscription</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setCurrentRoute('videos')}
            className="we-btn-emerald px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Regarder des vidéos (+0.10 $ / vue)</span>
          </button>

          <button
            onClick={() => setCurrentRoute('wallet')}
            className="we-btn-outline px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-[#00e59b]" />
            <span>Gérer mon Portefeuille</span>
          </button>
        </div>
      </div>
    </div>
  );
};
