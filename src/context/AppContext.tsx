import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Video,
  Transaction,
  WithdrawalRequest,
  Referral,
  AppNotification,
  PlatformSettings,
  Language,
  PageRoute,
  PaymentProvider,
} from '../types';
import { translations, LANGUAGES } from '../i18n/translations';
import { DEMO_PROFILES, INITIAL_VIDEOS, INITIAL_SETTINGS, INITIAL_WITHDRAWALS } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: (key: string) => string;
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  activeVideoId: string | null;
  openVideoPlayer: (videoId: string) => void;
  videos: Video[];
  updateVideo: (id: string, updates: Partial<Video>) => void;
  addVideo: (video: Omit<Video, 'id' | 'createdAt' | 'viewsCount'>) => void;
  deleteVideo: (id: string) => void;
  watchedVideoIds: string[];
  claimVideoReward: (videoId: string) => { success: boolean; message: string; amount?: number };
  resetDailyCounters: () => void;
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  submitWithdrawalRequest: (amount: number, provider: PaymentProvider, account: string) => { success: boolean; error?: string };
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string, reason: string) => void;
  referrals: Referral[];
  verifyReferral: (id: string) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  platformSettings: PlatformSettings;
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => void;
  recordAdsterraDirectLinkClick: () => void;
  activeDemoKey: string;
  switchDemoProfile: (key: string) => void;
  registerAccount: (data: { fullName: string; username: string; email: string; country: string; referralCode?: string }) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'watchearn_lang';
const STORAGE_KEY_SETTINGS = 'watchearn_settings';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language detection & storage
  const [currentLanguage, setCurrentLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG) as Language;
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.slice(0, 2) as Language;
    if (translations[browserLang]) return browserLang;
    return 'fr';
  });

  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];
  const isRtl = activeLangMeta.dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = activeLangMeta.dir;
    localStorage.setItem(STORAGE_KEY_LANG, currentLanguage);
  }, [currentLanguage, activeLangMeta]);

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setCurrentLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    const langDict = translations[currentLanguage];
    if (langDict && langDict[key]) return langDict[key];
    const enDict = translations['en'];
    if (enDict && enDict[key]) return enDict[key];
    return key;
  };

  // 2. Navigation Routing
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideoPlayer = (videoId: string) => {
    setActiveVideoId(videoId);
    setCurrentRoute('video-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. User & Demo State
  const [activeDemoKey, setActiveDemoKey] = useState<string>('activeUser');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_PROFILES.activeUser.user);

  // 4. Platform Settings
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_SETTINGS;
  });

  const updatePlatformSettings = (newSettings: Partial<PlatformSettings>) => {
    setPlatformSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  const recordAdsterraDirectLinkClick = () => {
    setPlatformSettings((prev) => {
      const count = prev.adsterraImpressionsCount + 1;
      const updated = { ...prev, adsterraImpressionsCount: count };
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  // 5. Video State
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(['vid-001']);

  const updateVideo = (id: string, updates: Partial<Video>) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const addVideo = (videoData: Omit<Video, 'id' | 'createdAt' | 'viewsCount'>) => {
    const newVideo: Video = {
      ...videoData,
      id: `vid-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().slice(0, 10),
      viewsCount: 0,
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // 6. Transactions & Ledger (matching reference image)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-001',
      userId: 'usr_demouser_01',
      type: 'video_reward',
      amount: 0.10,
      description: 'Récompense vidéo',
      date: '09/05/2026',
      status: 'completed',
      balanceAfter: 58.75,
    },
    {
      id: 'tx-002',
      userId: 'usr_demouser_01',
      type: 'welcome_bonus',
      amount: 1.00,
      description: 'Bonus de bienvenue',
      date: '08/05/2026',
      status: 'completed',
      balanceAfter: 58.65,
    },
    {
      id: 'tx-003',
      userId: 'usr_demouser_01',
      type: 'withdrawal_request',
      amount: -55.00,
      description: 'Demande de retrait',
      date: '01/05/2026',
      status: 'completed',
      balanceAfter: 57.65,
    },
  ]);

  // 7. Withdrawals
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);

  // 8. Referrals (matching reference image: 5 invités, 4 inscrits, 2 vérifiés)
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 'ref-01',
      referrerId: 'usr_demouser_01',
      referredUserId: 'usr_ref_101',
      referredUsername: 'alex_martin',
      referredEmail: 'alex.m@example.com',
      referredCountry: 'France',
      status: 'verified',
      createdAt: '2026-05-10',
    },
    {
      id: 'ref-02',
      referrerId: 'usr_demouser_01',
      referredUserId: 'usr_ref_102',
      referredUsername: 'sarah_j',
      referredEmail: 'sarah.j@example.com',
      referredCountry: 'Canada',
      status: 'verified',
      createdAt: '2026-05-12',
    },
    {
      id: 'ref-03',
      referrerId: 'usr_demouser_01',
      referredUserId: 'usr_ref_103',
      referredUsername: 'koffi_m',
      referredEmail: 'koffi.m@example.com',
      referredCountry: 'Côte d’Ivoire',
      status: 'registered',
      createdAt: '2026-05-14',
    },
    {
      id: 'ref-04',
      referrerId: 'usr_demouser_01',
      referredUserId: 'usr_ref_104',
      referredUsername: 'elena_rossi',
      referredEmail: 'elena.r@example.it',
      referredCountry: 'Italie',
      status: 'registered',
      createdAt: '2026-05-15',
    },
  ]);

  const verifyReferral = (id: string) => {
    setReferrals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'verified' } : r))
    );
  };

  // 9. Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      userId: 'usr_elig_005',
      type: 'withdrawal_eligible',
      title: 'Félicitations : Éligibilité au retrait atteinte !',
      message: 'Votre solde disponible dépasse 55,00 USD et vous comptez au moins 3 filleuls vérifiés. Vous pouvez soumettre votre retrait.',
      date: '2026-11-06 09:00',
      isRead: false,
    },
    {
      id: 'notif-2',
      userId: 'usr_elig_005',
      type: 'referral_verified',
      title: 'Filleul vérifié',
      message: 'Le compte de votre filleul karl_schneider a été validé avec succès par le contrôle anti-fraude.',
      date: '2026-10-19 14:15',
      isRead: true,
    },
    {
      id: 'notif-3',
      userId: 'usr_elig_005',
      type: 'welcome_bonus',
      title: 'Prime de bienvenue créditée',
      message: 'Votre compte a été crédité de 1,00 USD de prime d’accueil.',
      date: '2026-07-04 12:00',
      isRead: true,
    },
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // 10. Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // 11. Profile Switcher (Demo Scenarios)
  const switchDemoProfile = (key: string) => {
    if (DEMO_PROFILES[key]) {
      setActiveDemoKey(key);
      const profileUser = { ...DEMO_PROFILES[key].user };
      setCurrentUser(profileUser);
      // Adjust watched list according to scenario
      if (key === 'newUser') {
        setWatchedVideoIds([]);
      } else if (key === 'dailyLimitUser') {
        setWatchedVideoIds(INITIAL_VIDEOS.map((v) => v.id));
      } else {
        setWatchedVideoIds(['vid-001', 'vid-002']);
      }
    }
  };

  // 12. Claim Video Reward Engine
  const claimVideoReward = (videoId: string): { success: boolean; message: string; amount?: number } => {
    const video = videos.find((v) => v.id === videoId);
    if (!video) return { success: false, message: 'Vidéo introuvable.' };

    // Anti-double credit check
    if (watchedVideoIds.includes(videoId)) {
      return { success: false, message: t('alreadyClaimed') };
    }

    // Daily Limit check: max 20 videos
    if (currentUser.watchedTodayCount >= platformSettings.dailyVideoLimit) {
      return {
        success: false,
        message: `Limite quotidienne de ${platformSettings.dailyVideoLimit} vidéos atteinte. Réinitialisation à minuit.`,
      };
    }

    // Daily Cap check: max 1.50 USD
    if (currentUser.earnedToday + video.rewardAmount > platformSettings.dailyRewardCap) {
      return {
        success: false,
        message: `Plafond quotidien de ${platformSettings.dailyRewardCap.toFixed(2)} USD atteint pour aujourd'hui.`,
      };
    }

    // Validated! Apply credits with accounting transaction
    const newEarnedToday = Number((currentUser.earnedToday + video.rewardAmount).toFixed(3));
    const newWatchedCount = currentUser.watchedTodayCount + 1;
    const newAvailable = Number((currentUser.balanceAvailable + video.rewardAmount).toFixed(3));
    const newTotal = Number((currentUser.balanceTotal + video.rewardAmount).toFixed(3));

    setCurrentUser((prev) => ({
      ...prev,
      balanceAvailable: newAvailable,
      balanceTotal: newTotal,
      watchedTodayCount: newWatchedCount,
      earnedToday: newEarnedToday,
    }));

    setWatchedVideoIds((prev) => [...prev, videoId]);

    // Record accounting transaction
    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      type: 'video_reward',
      amount: video.rewardAmount,
      description: `Visionnage validé : ${video.title}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'completed',
      balanceAfter: newAvailable,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      type: 'video_reward',
      title: 'Récompense vidéo validée',
      message: `Vous avez reçu +${video.rewardAmount.toFixed(3)} USD pour le visionnage de "${video.title}".`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Update video view count
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, viewsCount: v.viewsCount + 1 } : v))
    );

    return { success: true, message: t('rewardCredited'), amount: video.rewardAmount };
  };

  // 13. Midnight Reset Simulator
  const resetDailyCounters = () => {
    setCurrentUser((prev) => ({
      ...prev,
      watchedTodayCount: 0,
      earnedToday: 0.00,
      lastWatchedDate: new Date().toISOString().slice(0, 10),
    }));
    setWatchedVideoIds([]);
    const resetNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      type: 'system_alert',
      title: 'Compteurs quotidiens réinitialisés (Minuit local)',
      message: 'Vos compteurs de visionnage ont été remis à zéro. Vous disposez de 20 vidéos et 1,50 USD de plafond.',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
    };
    setNotifications((prev) => [resetNotif, ...prev]);
  };

  // 14. Withdrawal Submission Engine
  const submitWithdrawalRequest = (
    amount: number,
    provider: PaymentProvider,
    account: string
  ): { success: boolean; error?: string } => {
    // Check 1: Minimum $55.00
    if (amount < platformSettings.minWithdrawalAmount) {
      return {
        success: false,
        error: `Le montant minimum de retrait est de ${platformSettings.minWithdrawalAmount.toFixed(2)} USD.`,
      };
    }

    // Check 2: Available balance
    if (amount > currentUser.balanceAvailable) {
      return {
        success: false,
        error: `Solde insuffisant. Votre solde disponible est de ${currentUser.balanceAvailable.toFixed(2)} USD.`,
      };
    }

    // Check 3: At least 3 verified referrals
    const verifiedRefsCount = referrals.filter(
      (r) => r.referrerId === currentUser.id && r.status === 'verified'
    ).length;

    if (verifiedRefsCount < platformSettings.minVerifiedReferralsForWithdrawal) {
      return {
        success: false,
        error: `Condition non remplie : vous devez avoir au moins ${platformSettings.minVerifiedReferralsForWithdrawal} filleuls avec un compte vérifié (actuellement : ${verifiedRefsCount}).`,
      };
    }

    // All conditions met: Deduct from available, move to pending
    const newAvailable = Number((currentUser.balanceAvailable - amount).toFixed(2));
    const newPending = Number((currentUser.balancePending + amount).toFixed(2));

    setCurrentUser((prev) => ({
      ...prev,
      balanceAvailable: newAvailable,
      balancePending: newPending,
    }));

    const newWithdrawal: WithdrawalRequest = {
      id: `wth-${Date.now().toString().slice(-4)}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      amount,
      provider,
      providerAccount: account,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      verifiedReferralsCountAtRequest: verifiedRefsCount,
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);

    // Ledger entry
    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      type: 'withdrawal_request',
      amount: -amount,
      description: `Demande de retrait vers ${provider.toUpperCase()} (${account})`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'pending',
      balanceAfter: newAvailable,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      type: 'withdrawal_submitted',
      title: 'Demande de retrait soumise',
      message: `Votre demande de retrait de ${amount.toFixed(2)} USD via ${provider} a été enregistrée et est en attente d'approbation administrative.`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true };
  };

  // 15. Admin Approval & Rejection
  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status: 'approved',
              reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            }
          : w
      )
    );

    const withdrawal = withdrawals.find((w) => w.id === id);
    if (withdrawal) {
      // If the current user matches, deduct pending
      if (currentUser.id === withdrawal.userId) {
        setCurrentUser((prev) => ({
          ...prev,
          balancePending: Math.max(0, prev.balancePending - withdrawal.amount),
          balanceTotal: Math.max(0, prev.balanceTotal - withdrawal.amount),
        }));
      }

      const tx: Transaction = {
        id: `tx-payout-${Date.now().toString().slice(-5)}`,
        userId: withdrawal.userId,
        type: 'withdrawal_payout',
        amount: withdrawal.amount,
        description: `Paiement validé par l'administrateur (${withdrawal.provider})`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'completed',
        balanceAfter: currentUser.balanceAvailable,
      };
      setTransactions((prev) => [tx, ...prev]);

      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: withdrawal.userId,
        type: 'withdrawal_approved',
        title: 'Retrait approuvé !',
        message: `Votre retrait de ${withdrawal.amount.toFixed(2)} USD a été approuvé. Les fonds ont été envoyés vers votre compte ${withdrawal.provider}.`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        isRead: false,
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const rejectWithdrawal = (id: string, reason: string) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status: 'rejected',
              rejectionReason: reason,
              reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            }
          : w
      )
    );

    const withdrawal = withdrawals.find((w) => w.id === id);
    if (withdrawal) {
      // Refund pending balance back to available
      if (currentUser.id === withdrawal.userId) {
        setCurrentUser((prev) => ({
          ...prev,
          balancePending: Math.max(0, prev.balancePending - withdrawal.amount),
          balanceAvailable: Number((prev.balanceAvailable + withdrawal.amount).toFixed(2)),
        }));
      }

      const tx: Transaction = {
        id: `tx-canc-${Date.now().toString().slice(-5)}`,
        userId: withdrawal.userId,
        type: 'withdrawal_cancellation',
        amount: withdrawal.amount,
        description: `Annulation de retrait : ${reason}`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'rejected',
        balanceAfter: currentUser.balanceAvailable + withdrawal.amount,
      };
      setTransactions((prev) => [tx, ...prev]);

      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: withdrawal.userId,
        type: 'withdrawal_rejected',
        title: 'Retrait non validé',
        message: `Votre demande de ${withdrawal.amount.toFixed(2)} USD a été refusée pour le motif : ${reason}. Le montant a été recrédité sur votre solde disponible.`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        isRead: false,
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  // 16. User Registration
  const registerAccount = (data: {
    fullName: string;
    username: string;
    email: string;
    country: string;
    referralCode?: string;
  }) => {
    const newUser: User = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      country: data.country,
      language: currentLanguage,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris',
      role: 'user',
      isVerified: true,
      referralCode: `WE-${data.username.slice(0, 4).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
      referredBy: data.referralCode,
      createdAt: new Date().toISOString().slice(0, 10),
      welcomeBonusCredited: true,
      balanceTotal: platformSettings.welcomeBonusAmount,
      balanceAvailable: platformSettings.welcomeBonusAmount,
      balancePending: 0.00,
      watchedTodayCount: 0,
      earnedToday: 0.00,
      lastWatchedDate: new Date().toISOString().slice(0, 10),
    };

    setCurrentUser(newUser);
    setActiveDemoKey('newUser');

    const welcomeTx: Transaction = {
      id: `tx-bonus-${Date.now()}`,
      userId: newUser.id,
      type: 'welcome_bonus',
      amount: platformSettings.welcomeBonusAmount,
      description: `Prime de bienvenue Watch Earn (+${platformSettings.welcomeBonusAmount.toFixed(2)} USD)`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'completed',
      balanceAfter: platformSettings.welcomeBonusAmount,
    };
    setTransactions((prev) => [welcomeTx, ...prev]);

    const welcomeNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: newUser.id,
      type: 'welcome_bonus',
      title: 'Bienvenue sur WATCH EARN !',
      message: `Votre compte a été créé avec succès. Une prime d'accueil de ${platformSettings.welcomeBonusAmount.toFixed(2)} USD a été créditée sur votre solde.`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);

    setCurrentRoute('dashboard');
  };

  const logout = () => {
    switchDemoProfile('newUser');
    setCurrentRoute('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentLanguage,
        setLanguage,
        isRtl,
        t,
        currentRoute,
        setCurrentRoute,
        activeVideoId,
        openVideoPlayer,
        videos,
        updateVideo,
        addVideo,
        deleteVideo,
        watchedVideoIds,
        claimVideoReward,
        resetDailyCounters,
        transactions,
        withdrawals,
        submitWithdrawalRequest,
        approveWithdrawal,
        rejectWithdrawal,
        referrals,
        verifyReferral,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        platformSettings,
        updatePlatformSettings,
        recordAdsterraDirectLinkClick,
        activeDemoKey,
        switchDemoProfile,
        registerAccount,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
