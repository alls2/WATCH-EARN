import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  TrendingUp,
  Shield,
  Clock,
  Wallet,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck,
  Gift,
  ExternalLink,
  ChevronRight,
  HandCoins,
} from 'lucide-react';
import { WatchEarnLogo } from '../../components/common/WatchEarnLogo';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, openVideoPlayer, videos, platformSettings } = useApp();

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Official Hero Section matching the Reference Image */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Subtle ambient cyan/emerald gradient glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#00e59b]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#00c2ff]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="we-card-glow p-6 sm:p-10 rounded-3xl relative overflow-hidden text-left border border-[#162c4a]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Headline, Subtitle, Buttons, 4 Pillars */}
              <div className="lg:col-span-7 space-y-6">
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  WATCH. <br />
                  <span className="text-white">DISCOVER. </span>
                  <span className="text-[#00e59b] drop-shadow-[0_0_12px_rgba(0,229,155,0.45)]">
                    EARN.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Découvrez des vidéos, profitez d'une expérience interactive et suivez vos récompenses sur WatchEarn.
                </p>

                {/* The Two Official CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <button
                    onClick={() => setCurrentRoute('videos')}
                    className="we-btn-emerald px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Commencer maintenant</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    onClick={() => setCurrentRoute('how-it-works')}
                    className="we-btn-outline px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                  >
                    <span>En savoir plus</span>
                  </button>
                </div>

                {/* 4 Feature Pillars Row from Reference Image */}
                <div className="pt-6 border-t border-[#142844] grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    onClick={() => setCurrentRoute('videos')}
                    className="p-3 rounded-xl bg-[#07101c]/80 border border-[#142844] hover:border-[#00e59b]/40 text-center space-y-1.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      Regardez <br /> des vidéos
                    </div>
                  </div>

                  <div
                    onClick={() => setCurrentRoute('videos')}
                    className="p-3 rounded-xl bg-[#07101c]/80 border border-[#142844] hover:border-[#00e59b]/40 text-center space-y-1.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      Gagnez des <br /> récompenses
                    </div>
                  </div>

                  <div
                    onClick={() => setCurrentRoute('referral')}
                    className="p-3 rounded-xl bg-[#07101c]/80 border border-[#142844] hover:border-[#00e59b]/40 text-center space-y-1.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      Invitez <br /> vos amis
                    </div>
                  </div>

                  <div
                    onClick={() => setCurrentRoute('wallet')}
                    className="p-3 rounded-xl bg-[#07101c]/80 border border-[#142844] hover:border-[#00e59b]/40 text-center space-y-1.5 cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <HandCoins className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">
                      Retirez <br /> vos gains
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Illustration (Matching Reference Image) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-[#162f52] shadow-2xl bg-gradient-to-tr from-[#061220] to-[#0d223c]">
                  {/* Floating Glowing Play Badge */}
                  <div className="absolute top-6 left-6 z-10 w-14 h-14 rounded-2xl bg-[#00e59b]/25 border border-[#00e59b]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,229,155,0.4)]">
                    <Play className="w-7 h-7 text-[#00e59b] fill-[#00e59b]" />
                  </div>

                  {/* High Quality Hero Visual */}
                  <img
                    src="/src/assets/images/watch_earn_hero_bg_1794004937904.jpg"
                    alt="WatchEarn Streaming Screens & Community"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091322] via-transparent to-transparent" />

                  {/* Bottom overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#06101c]/90 border border-[#142844] backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Plafond Quotidien</span>
                      <span className="text-xs font-bold text-[#00e59b]">20 vidéos · 1,50 $ max</span>
                    </div>
                    <button
                      onClick={() => openVideoPlayer('vid-001')}
                      className="px-3 py-1 rounded-lg bg-[#00e59b] text-slate-950 font-bold text-xs hover:bg-[#05f8a8] cursor-pointer"
                    >
                      Essayer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Features Checklist Section ("Fonctionnalités clés") from Reference Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Key Features List */}
          <div className="lg:col-span-7 we-card p-6 sm:p-8 rounded-2xl text-left space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#00e59b]" />
              Fonctionnalités clés de la plateforme
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>8 langues (FR, EN, ES, PT, DE, AR, ZH, IT)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>20 vidéos par jour (maximum)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>1,50 $ de récompenses / jour</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>Retrait minimum : 55 $</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>Parrainage : 3 filleuls vérifiés</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>Publicité : Direct Links indépendants</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>Design 100% responsive (Mobile First)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#060e18]/60 border border-[#12243d]">
                <CheckCircle2 className="w-4 h-4 text-[#00e59b] shrink-0" />
                <span>Interface moderne et sécurisée</span>
              </div>
            </div>
          </div>

          {/* Large Glowing Logo Badge from Reference */}
          <div className="lg:col-span-5 we-card p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 border border-[#162f52]">
            <WatchEarnLogo size="xl" showSlogan={true} />
            <div className="text-xl font-black text-[#00e59b] italic tracking-wide drop-shadow-[0_0_10px_rgba(0,229,155,0.4)]">
              Votre plateforme de confiance !
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Une infrastructure saine, sans fausse promesse, avec une comptabilité transparente et des règles de validation claires.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Videos Grid matching the 3 cards in the Reference Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-[#00e59b] fill-current" />
              Bibliothèque de vidéos en vedette
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Consultez les vidéos disponibles et leurs récompenses individuelles configurées.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('videos')}
            className="text-xs font-bold text-[#00e59b] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explorer toutes les vidéos ({videos.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => (
            <div
              key={video.id}
              className="we-card overflow-hidden hover:border-[#00e59b]/50 transition-all group flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-medium">
                  {video.category}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] text-white font-mono font-bold">
                  {Math.floor(video.durationSeconds / 60)}:
                  {(video.durationSeconds % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Information */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00e59b] transition-colors truncate">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#142844] flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-200">
                    Récompense : <span className="text-[#00e59b] font-mono">+{video.rewardAmount.toFixed(2)} $</span>
                  </div>

                  <button
                    onClick={() => openVideoPlayer(video.id)}
                    className="we-btn-emerald px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Regarder</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Wallet & Withdrawal Condition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="we-card p-6 sm:p-8 rounded-2xl text-left border border-[#162f52] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#142844]">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#00e59b] font-bold tracking-wider">
                Conditions Officielles de Retrait
              </span>
              <h3 className="text-lg font-bold text-white">
                Retrait minimum fixé à 55,00 USD et 3 filleuls vérifiés
              </h3>
            </div>

            <button
              onClick={() => setCurrentRoute('wallet')}
              className="we-btn-emerald px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0"
            >
              Consulter mon portefeuille
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Afin de garantir la stabilité du modèle économique et d'empêcher les abus automatisés, chaque utilisateur
            doit atteindre le seuil de 55 USD et avoir validé 3 filleuls réels sans fraude avant d'émettre une demande de retrait.
          </p>
        </div>
      </section>
    </div>
  );
};
