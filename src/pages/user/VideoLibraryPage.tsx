import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoCategory } from '../../types';
import {
  Play,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const CATEGORIES: ('Toutes' | VideoCategory)[] = [
  'Toutes',
  'Technologie',
  'Éducation',
  'Divertissement',
  'Nature',
  'Sport',
  'Santé',
  'Voyage',
  'Culture',
  'Actualités',
];

export const VideoLibraryPage: React.FC = () => {
  const { videos, openVideoPlayer, watchedVideoIds, currentUser, platformSettings } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<'Toutes' | VideoCategory>('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownCategory, setDropdownCategory] = useState<string>('all');

  const filteredVideos = videos.filter((v) => {
    const matchCategory =
      selectedCategory === 'Toutes' || v.category === selectedCategory;
    const matchDropdown =
      dropdownCategory === 'all' || v.category === dropdownCategory;
    const matchSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchDropdown && matchSearch && v.isPublished;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Official "Bibliothèque de vidéos" Card matching Reference Image */}
      <div className="we-card p-6 sm:p-8 rounded-3xl space-y-6 border border-[#162f52] shadow-2xl">
        {/* Header matching Reference Image */}
        <div className="flex items-center justify-between pb-3 border-b border-[#142844]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <h1 className="text-xl font-black text-white">Bibliothèque de vidéos</h1>
          </div>

          <div className="text-xs font-mono text-slate-300">
            <span className="text-slate-400">Vues du jour : </span>
            <strong className="text-[#00e59b] font-bold">
              {currentUser.watchedTodayCount} / {platformSettings.dailyVideoLimit}
            </strong>
          </div>
        </div>

        {/* Search & Category Filter Row matching Reference Image */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une vidéo..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] focus:border-[#00e59b] focus:outline-none text-xs text-white placeholder-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <select
              value={dropdownCategory}
              onChange={(e) => setDropdownCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-xs text-slate-200 focus:outline-none focus:border-[#00e59b] cursor-pointer"
            >
              <option value="all">Toutes catégories ⌵</option>
              {CATEGORIES.filter((c) => c !== 'Toutes').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Pills Row matching Reference Image */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00e59b] text-slate-950 shadow-[0_0_12px_rgba(0,229,155,0.4)]'
                  : 'bg-[#06101c] text-slate-300 hover:text-white border border-[#142844]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid matching Reference Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredVideos.map((video) => {
            const isClaimed = watchedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                className="we-card overflow-hidden hover:border-[#00e59b]/40 transition-all flex flex-col justify-between group"
              >
                {/* Thumbnail with duration tag */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-white font-medium">
                    {video.category}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] text-white font-mono font-bold">
                    {Math.floor(video.durationSeconds / 60)}:
                    {(video.durationSeconds % 60).toString().padStart(2, '0')}
                  </div>

                  {isClaimed && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#00e59b]/90 text-slate-950 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Validée</span>
                    </div>
                  )}
                </div>

                {/* Card Body matching Reference Image */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00e59b] transition-colors truncate">
                      {video.title}
                    </h3>
                    <div className="text-xs text-slate-300 font-medium mt-1">
                      Récompense : <strong className="text-[#00e59b] font-mono">+{video.rewardAmount.toFixed(2)} $</strong>
                    </div>
                  </div>

                  {/* Green Watch button matching Reference Image */}
                  <div className="pt-2">
                    <button
                      onClick={() => openVideoPlayer(video.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isClaimed
                          ? 'bg-[#0a182a] text-slate-300 hover:bg-[#0f2136] border border-[#142844]'
                          : 'we-btn-emerald'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isClaimed ? 'Revoir' : 'Regarder'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
