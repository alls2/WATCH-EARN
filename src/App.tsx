/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoSwitcherModal } from './components/common/DemoSwitcherModal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { HomePage } from './pages/public/HomePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPages } from './pages/public/LegalPages';
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';
import { VideoLibraryPage } from './pages/user/VideoLibraryPage';
import { VideoPlayerPage } from './pages/user/VideoPlayerPage';
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { WalletPage } from './pages/user/WalletPage';
import { ReferralPage } from './pages/user/ReferralPage';
import { ProfileSettingsPage } from './pages/user/ProfileSettingsPage';
import { NotificationsPage } from './pages/user/NotificationsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ArchitectureReportModal } from './pages/system/ArchitectureReportModal';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* 1. Multi-scenario Demo Bar at top */}
      <DemoSwitcherModal />

      {/* 2. Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar />

      {/* 3. Main Viewport Container */}
      <main className="flex-1">
        {currentRoute === 'home' && <HomePage />}
        {currentRoute === 'how-it-works' && <HowItWorksPage />}
        {currentRoute === 'videos' && <VideoLibraryPage />}
        {currentRoute === 'video-player' && <VideoPlayerPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'faq' && <FaqPage />}
        {currentRoute === 'contact' && <ContactPage />}

        {/* Legal & Policy Pages */}
        {currentRoute === 'cgu' && <LegalPages type="cgu" />}
        {currentRoute === 'privacy' && <LegalPages type="privacy" />}
        {currentRoute === 'cookies' && <LegalPages type="cookies" />}
        {currentRoute === 'rewards-policy' && <LegalPages type="rewards-policy" />}
        {currentRoute === 'referral-rules' && <LegalPages type="referral-rules" />}
        {currentRoute === 'withdrawal-rules' && <LegalPages type="withdrawal-rules" />}

        {/* Auth Pages */}
        {currentRoute === 'login' && <LoginPage />}
        {currentRoute === 'register' && <RegisterPage />}

        {/* User Pages */}
        {currentRoute === 'dashboard' && <UserDashboardPage />}
        {currentRoute === 'wallet' && <WalletPage />}
        {currentRoute === 'referral' && <ReferralPage />}
        {currentRoute === 'profile' && <ProfileSettingsPage />}
        {currentRoute === 'notifications' && <NotificationsPage />}

        {/* Admin Portal */}
        {currentRoute === 'admin' && <AdminDashboardPage />}

        {/* Technical Architecture & Supabase Roadmap */}
        {currentRoute === 'architecture-report' && <ArchitectureReportModal />}
      </main>

      {/* 4. Full international Footer */}
      <Footer />

      {/* 5. Mobile Ergonomic Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
