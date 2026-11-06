export type Language = 'fr' | 'en' | 'es' | 'pt' | 'de' | 'ar' | 'zh' | 'it';

export type VideoCategory =
  | 'Technologie'
  | 'Entrepreneuriat'
  | 'Éducation'
  | 'Divertissement'
  | 'Nature'
  | 'Sport'
  | 'Santé'
  | 'Voyage'
  | 'Culture'
  | 'Actualités';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  country: string;
  language: Language;
  timezone: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  welcomeBonusCredited: boolean;
  balanceTotal: number;
  balanceAvailable: number;
  balancePending: number;
  watchedTodayCount: number;
  earnedToday: number;
  lastWatchedDate: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  durationSeconds: number;
  rewardAmount: number; // e.g. 0.03, 0.05, 0.075, 0.10, 0.15 USD
  videoUrl: string;
  thumbnailUrl: string;
  viewsCount: number;
  isPublished: boolean;
  createdAt: string;
}

export type TransactionType =
  | 'welcome_bonus'
  | 'video_reward'
  | 'admin_adjustment'
  | 'withdrawal_request'
  | 'withdrawal_payout'
  | 'withdrawal_cancellation';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'rejected';
  balanceAfter: number;
}

export type PaymentProvider =
  | 'paypal'
  | 'visa'
  | 'mastercard'
  | 'mtn_momo'
  | 'orange_money'
  | 'wave'
  | 'moov'
  | 'flooz'
  | 'tmoney'
  | 'apple_pay'
  | 'google_pay'
  | 'bank_wire'
  | 'payoneer';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  provider: PaymentProvider;
  providerAccount: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
  verifiedReferralsCountAtRequest: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUsername: string;
  referredEmail: string;
  referredCountry: string;
  status: 'registered' | 'verified' | 'flagged';
  createdAt: string;
}

export type NotificationType =
  | 'welcome_bonus'
  | 'video_reward'
  | 'daily_limit'
  | 'referral_verified'
  | 'withdrawal_eligible'
  | 'withdrawal_submitted'
  | 'withdrawal_approved'
  | 'withdrawal_rejected'
  | 'system_alert';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface PlatformSettings {
  adsterraDirectLinkUrl: string;
  adsterraEnabled: boolean;
  adsterraImpressionsCount: number;
  dailyVideoLimit: number; // 20
  dailyRewardCap: number; // 1.50 USD
  minWithdrawalAmount: number; // 55.00 USD
  minVerifiedReferralsForWithdrawal: number; // 3
  welcomeBonusAmount: number; // 1.00 USD
  enabledPaymentMethods: PaymentProvider[];
}

export type PageRoute =
  | 'home'
  | 'how-it-works'
  | 'videos'
  | 'video-player'
  | 'about'
  | 'faq'
  | 'contact'
  | 'cgu'
  | 'privacy'
  | 'cookies'
  | 'rewards-policy'
  | 'referral-rules'
  | 'withdrawal-rules'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'wallet'
  | 'referral'
  | 'profile'
  | 'notifications'
  | 'admin'
  | 'architecture-report';
