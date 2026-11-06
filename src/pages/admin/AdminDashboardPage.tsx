import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Video, VideoCategory, PaymentProvider } from '../../types';
import { WatchEarnLogo } from '../../components/common/WatchEarnLogo';
import {
  Play,
  LayoutDashboard,
  Users,
  Film,
  Tags,
  Trophy,
  ArrowDownCircle,
  Settings,
  Bell,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Sliders,
  DollarSign,
  Shield,
} from 'lucide-react';

type AdminNavTab =
  | 'dashboard'
  | 'users'
  | 'videos'
  | 'categories'
  | 'rewards'
  | 'withdrawals'
  | 'adsterra'
  | 'settings'
  | 'notifications';

export const AdminDashboardPage: React.FC = () => {
  const {
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    withdrawals,
    approveWithdrawal,
    rejectWithdrawal,
    platformSettings,
    updatePlatformSettings,
    currentUser,
    setCurrentRoute,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminNavTab>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Adsterra input state
  const [adsterraUrl, setAdsterraUrl] = useState(platformSettings.adsterraDirectLinkUrl);
  const [adsterraSaved, setAdsterraSaved] = useState(false);

  // Add video modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VideoCategory>('Technologie');
  const [price, setPrice] = useState(0.10);
  const [duration, setDuration] = useState(525);

  // Reject withdrawal modal
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleSaveAdsterra = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformSettings({ adsterraDirectLinkUrl: adsterraUrl });
    setAdsterraSaved(true);
    setTimeout(() => setAdsterraSaved(false), 2000);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addVideo({
      title,
      description: "Description officielle de la vidéo validée par l'administrateur.",
      category,
      durationSeconds: Number(duration),
      rewardAmount: Number(price),
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: '/src/assets/images/video_thumb_tech_1794004938985.jpg',
      isPublished: true,
    });
    setIsAddOpen(false);
    setTitle('');
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectId && rejectReason.trim()) {
      rejectWithdrawal(rejectId, rejectReason.trim());
      setRejectId(null);
      setRejectReason('');
    }
  };

  const filteredVideos = videos.filter((v) => {
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === 'all' || v.category === filterCategory;
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && v.isPublished) ||
      (filterStatus === 'inactive' && !v.isPublished);
    return matchSearch && matchCat && matchStatus;
  });

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Official Admin Console Container matching Reference Image */}
      <div className="we-card rounded-3xl overflow-hidden border border-[#162f52] shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* ============================================================== */}
        {/* SIDEBAR MATCHING REFERENCE IMAGE (3 cols)                      */}
        {/* ============================================================== */}
        <aside className="lg:col-span-3 bg-[#060e18] border-r border-[#142844] p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Logo */}
            <div className="pb-4 border-b border-[#12233b]">
              <WatchEarnLogo size="md" showSlogan={false} />
              <div className="text-[10px] text-slate-400 font-mono mt-1">Espace Administrateur</div>
            </div>

            {/* Navigation links matching Reference Image */}
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Tableau de bord</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'users'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Utilisateurs</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'videos'
                    ? 'bg-[#00e59b] text-slate-950 font-black shadow-[0_0_12px_rgba(0,229,155,0.4)]'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Vidéos</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Tags className="w-4 h-4" />
                <span>Catégories</span>
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'rewards'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Récompenses</span>
              </button>

              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'withdrawals'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ArrowDownCircle className="w-4 h-4" />
                  <span>Retraits</span>
                </div>
                {pendingWithdrawals.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#00e59b] text-slate-950 font-bold text-[9px]">
                    {pendingWithdrawals.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('adsterra')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'adsterra'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Paramètres publicitaires</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold border border-[#00e59b]/30'
                    : 'text-slate-300 hover:bg-[#0a182a] hover:text-white'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Déconnexion button matching Reference Image */}
          <div className="pt-4 border-t border-[#12233b]">
            <button
              onClick={() => setCurrentRoute('home')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* ============================================================== */}
        {/* MAIN ADMIN WORKSPACE (9 cols)                                  */}
        {/* ============================================================== */}
        <main className="lg:col-span-9 p-6 sm:p-8 space-y-6 bg-[#091322]">
          {/* TAB: GESTION DES VIDÉOS (Exact layout from Reference Image) */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              {/* Header with Title and + Ajouter une vidéo button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#142844]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-black text-white">Gestion des vidéos</h2>
                </div>

                <button
                  onClick={() => setIsAddOpen(true)}
                  className="we-btn-emerald px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Ajouter une vidéo</span>
                </button>
              </div>

              {/* Filters row: Search input + Category dropdown + Status dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00e59b]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-xs text-white focus:outline-none focus:border-[#00e59b] cursor-pointer"
                  >
                    <option value="all">Toutes catégories ⌵</option>
                    <option value="Technologie">Technologie</option>
                    <option value="Voyage">Voyage</option>
                    <option value="Nature">Nature</option>
                    <option value="Entrepreneuriat">Entrepreneuriat</option>
                    <option value="Éducation">Éducation</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-xs text-white focus:outline-none focus:border-[#00e59b] cursor-pointer"
                  >
                    <option value="all">Tous statuts ⌵</option>
                    <option value="active">Active</option>
                    <option value="inactive">Désactivée</option>
                  </select>
                </div>
              </div>

              {/* Table matching Reference Image */}
              <div className="rounded-2xl bg-[#06101c] border border-[#142844] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#081525] text-slate-400 font-bold uppercase text-[10px] border-b border-[#142844]">
                      <tr>
                        <th className="py-3 px-4">Miniature</th>
                        <th className="py-3 px-4">Titre</th>
                        <th className="py-3 px-4">Catégorie</th>
                        <th className="py-3 px-4">Prix</th>
                        <th className="py-3 px-4">Statut</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#142844]">
                      {filteredVideos.map((v) => (
                        <tr key={v.id} className="hover:bg-[#0a182a]/50">
                          <td className="py-2.5 px-4">
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-950 relative border border-[#142844]">
                              <img
                                src={v.thumbnailUrl}
                                alt={v.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-3 h-3 text-white fill-white opacity-80" />
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 font-bold text-white max-w-xs truncate">
                            {v.title}
                          </td>
                          <td className="py-2.5 px-4 text-slate-300">{v.category}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-[#00e59b]">
                            {v.rewardAmount.toFixed(2)} $
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00e59b]/20 text-[#00e59b] border border-[#00e59b]/40">
                              Active
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button
                                onClick={() => {
                                  const newPrice = Number(prompt('Nouveau tarif (USD) :', String(v.rewardAmount)));
                                  if (newPrice) updateVideo(v.id, { rewardAmount: newPrice });
                                }}
                                className="p-1 hover:text-[#00e59b] cursor-pointer"
                                title="Modifier"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteVideo(v.id)}
                                className="p-1 hover:text-rose-400 cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RETRAITS (Withdrawal requests queue) */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#142844]">
                <h2 className="text-xl font-black text-white">Gestion des Décaissements</h2>
                <span className="text-xs text-slate-400 font-mono">
                  {pendingWithdrawals.length} en attente d'audit
                </span>
              </div>

              <div className="rounded-2xl bg-[#06101c] border border-[#142844] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#081525] text-slate-400 font-bold uppercase text-[10px] border-b border-[#142844]">
                      <tr>
                        <th className="py-3 px-4">Utilisateur</th>
                        <th className="py-3 px-4">Montant</th>
                        <th className="py-3 px-4">Moyen & Compte</th>
                        <th className="py-3 px-4">Filleuls</th>
                        <th className="py-3 px-4 text-right">Décision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#142844]">
                      {withdrawals.map((w) => (
                        <tr key={w.id}>
                          <td className="py-3 px-4 font-bold text-white">
                            <div>{w.userName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{w.userEmail}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#00e59b]">
                            {w.amount.toFixed(2)} $
                          </td>
                          <td className="py-3 px-4">
                            <span className="uppercase font-bold text-slate-200">{w.provider}</span>
                            <div className="text-[10px] text-slate-400 font-mono">{w.providerAccount}</div>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <strong className="text-[#00e59b]">{w.verifiedReferralsCountAtRequest}</strong> / 3 requis
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {w.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => approveWithdrawal(w.id)}
                                  className="px-3 py-1 rounded-lg bg-[#00e59b] text-slate-950 font-bold text-xs cursor-pointer"
                                >
                                  Approuver
                                </button>
                                <button
                                  onClick={() => setRejectId(w.id)}
                                  className="px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer"
                                >
                                  Refuser
                                </button>
                              </>
                            ) : (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  w.status === 'approved'
                                    ? 'bg-[#00e59b]/20 text-[#00e59b]'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {w.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADSTERRA CONFIGURATION */}
          {activeTab === 'adsterra' && (
            <div className="max-w-2xl space-y-6">
              <div className="pb-4 border-b border-[#142844]">
                <h2 className="text-xl font-black text-white">Paramètres Publicitaires Privés</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Format Direct Link unique, appliqué automatiquement sous le lecteur de toutes les vidéos.
                </p>
              </div>

              {adsterraSaved && (
                <div className="p-3 rounded-xl bg-[#00e59b]/15 border border-[#00e59b]/40 text-[#00e59b] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lien sponsorisé mis à jour avec succès !</span>
                </div>
              )}

              <form onSubmit={handleSaveAdsterra} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">URL du Direct Link Adsterra :</label>
                  <input
                    type="url"
                    value={adsterraUrl}
                    onChange={(e) => setAdsterraUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101c] border border-[#142844] text-white font-mono focus:border-[#00e59b] focus:outline-none"
                    required
                  />
                  <span className="text-[10px] text-slate-500">
                    Modifiable sans toucher au code. Non visible directement sur l'interface publique.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#06101c] border border-[#142844] flex items-center justify-between">
                  <span className="text-slate-400">Total clics sortants enregistrés :</span>
                  <span className="font-mono font-bold text-[#00e59b] text-base">
                    {platformSettings.adsterraImpressionsCount} clics
                  </span>
                </div>

                <button
                  type="submit"
                  className="we-btn-emerald px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          )}

          {/* OTHER TABS */}
          {activeTab !== 'videos' && activeTab !== 'withdrawals' && activeTab !== 'adsterra' && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-white capitalize">{activeTab}</h2>
              <div className="p-6 rounded-2xl bg-[#06101c] border border-[#142844] text-xs text-slate-400">
                Module {activeTab} configuré et supervisé par le moteur d'administration de WatchEarn.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091322] border border-[#162f52] rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Motif de refus du retrait</h3>
            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ex : Coordonnées de paiement incomplètes..."
                className="w-full p-3 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:outline-none focus:border-rose-500"
                rows={3}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold"
                >
                  Confirmer le refus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091322] border border-[#162f52] rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00e59b]" />
              Ajouter une vidéo
            </h3>
            <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex : L'IA et notre avenir"
                  className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:border-[#00e59b] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as VideoCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:outline-none"
                  >
                    <option value="Technologie">Technologie</option>
                    <option value="Voyage">Voyage</option>
                    <option value="Nature">Nature</option>
                    <option value="Entrepreneuriat">Entrepreneuriat</option>
                    <option value="Éducation">Éducation</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Prix (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#06101c] border border-[#142844] text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="we-btn-emerald px-4 py-2 rounded-xl font-bold"
                >
                  Publier la vidéo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
