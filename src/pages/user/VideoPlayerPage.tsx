import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  Trophy,
  Sparkles,
  Clock,
  Eye,
  Megaphone,
} from 'lucide-react';

export const VideoPlayerPage: React.FC = () => {
  const {
    activeVideoId,
    videos,
    openVideoPlayer,
    setCurrentRoute,
    watchedVideoIds,
    claimVideoReward,
    currentUser,
    platformSettings,
    recordAdsterraDirectLinkClick,
    t,
  } = useApp();

  const video = videos.find((v) => v.id === activeVideoId) || videos[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  const [watchProgressPercent, setWatchProgressPercent] = useState<number>(0);
  const [hasWatchedEnough, setHasWatchedEnough] = useState<boolean>(false);
  const [claimStatus, setClaimStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const isAlreadyClaimed = watchedVideoIds.includes(video.id);
  const isDailyLimitReached =
    currentUser.watchedTodayCount >= platformSettings.dailyVideoLimit ||
    currentUser.earnedToday >= platformSettings.dailyRewardCap;

  useEffect(() => {
    setWatchProgressPercent(0);
    setHasWatchedEnough(false);
    setClaimStatus(null);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [activeVideoId]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        const percent = Math.min(100, Math.round((current / total) * 100));
        setWatchProgressPercent(percent);
        if (percent >= 80 && !hasWatchedEnough) {
          setHasWatchedEnough(true);
        }
      }
    }
  };

  const handleClaim = () => {
    const res = claimVideoReward(video.id);
    setClaimStatus(res);
  };

  const handleAdsterraClick = () => {
    recordAdsterraDirectLinkClick();
    window.open(platformSettings.adsterraDirectLinkUrl, '_blank', 'noopener,noreferrer');
  };

  const relatedVideos = videos.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Official Video Player Card matching Reference Image */}
      <div className="we-card p-6 sm:p-8 rounded-3xl space-y-5 border border-[#162f52] shadow-2xl">
        {/* Top bar of video player */}
        <div className="flex items-center justify-between pb-3 border-b border-[#142844]">
          <button
            onClick={() => setCurrentRoute('videos')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07101c] hover:bg-[#0c1a2e] border border-[#142844] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00e59b]" />
            <span>Retour</span>
          </button>

          <h1 className="text-base sm:text-lg font-black text-white truncate max-w-md">
            {video.title}
          </h1>

          <div className="text-xs font-mono text-[#00e59b] font-bold">
            +{video.rewardAmount.toFixed(2)} $
          </div>
        </div>

        {/* Video Player Display */}
        <div className="rounded-2xl overflow-hidden bg-black border border-[#142844] shadow-2xl relative aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Action & Reward Row below player matching Reference Image */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Récompense : <strong className="text-[#00e59b] font-mono">+{video.rewardAmount.toFixed(2)} $</strong>
              </span>
              <span className="text-[10px] text-slate-400">
                Progression : {watchProgressPercent}% (Requis : 80%)
              </span>
            </div>
          </div>

          <div>
            {isAlreadyClaimed ? (
              <span className="px-3 py-1.5 rounded-lg bg-[#07101c] border border-[#00e59b]/40 text-[#00e59b] text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Visionné & Crédité</span>
              </span>
            ) : isDailyLimitReached ? (
              <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Plafond quotidien atteint</span>
              </span>
            ) : (
              <button
                disabled={!hasWatchedEnough}
                onClick={handleClaim}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  hasWatchedEnough
                    ? 'we-btn-emerald'
                    : 'bg-[#0c1a2e] text-slate-400 border border-[#142844] cursor-not-allowed'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{hasWatchedEnough ? 'Valider et créditer (+0.10 $)' : 'À regarder (80% requis)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Claim status alert */}
        {claimStatus && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              claimStatus.success
                ? 'bg-[#00e59b]/15 border border-[#00e59b]/40 text-[#00e59b]'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            }`}
          >
            {claimStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{claimStatus.message}</span>
          </div>
        )}

        {/* OFFICIAL SPONSORED CONTENT ZONE UNDER VIDEO (Matching Reference Image) */}
        <div
          onClick={handleAdsterraClick}
          className="p-3.5 rounded-xl bg-[#fff7d6] text-slate-900 border border-amber-300 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#fff2b8] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💡</span>
            <div>
              <span className="text-xs font-bold text-slate-950 block">
                Publicité : Découvrez nos offres exclusives !
              </span>
              <span className="text-[11px] text-sky-800 font-semibold underline flex items-center gap-1">
                <span>Lien sponsorisé direct</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>

          <span className="text-[10px] text-slate-600 font-mono bg-white/70 px-2 py-0.5 rounded border border-amber-200">
            Partenaire Certifié
          </span>
        </div>

        {/* Video Description */}
        <div className="pt-2 text-xs text-slate-300 leading-relaxed border-t border-[#142844]">
          <p>{video.description}</p>
        </div>
      </div>

      {/* Suggested Videos Grid */}
      <div className="space-y-4 text-left">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Autres vidéos recommandées
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => openVideoPlayer(item.id)}
              className="we-card p-3 rounded-xl hover:border-[#00e59b]/40 transition-colors cursor-pointer group flex items-center gap-3"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-16 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-[#00e59b] transition-colors">
                  {item.title}
                </h4>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Récompense : <strong className="text-[#00e59b]">+{item.rewardAmount.toFixed(2)} $</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
