import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../i18n/translations';
import { WatchEarnLogo } from '../common/WatchEarnLogo';
import {
  Globe,
  Bell,
  User,
  Shield,
  Menu,
  X,
  Wallet,
  Check,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentLanguage,
    setLanguage,
    currentRoute,
    setCurrentRoute,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    logout,
    t,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#060b13]/95 backdrop-blur-md border-b border-[#12233b]">
      {/* 1. Official Top Announcement & International Strip from Reference Image */}
      <div className="bg-[#081220] border-b border-[#112238] px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Une plateforme internationale de</span>
            <span className="text-[#00e59b] font-bold">vidéos et de récompenses</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Regardez des vidéos · Gagnez des récompenses · Atteignez vos objectifs</span>
          </div>

          {/* Quick Language Selector (Matching Reference Image Pill) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a182b] hover:bg-[#0e213b] border border-[#00e59b]/40 text-slate-200 text-xs font-medium cursor-pointer transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#00e59b]" />
              <span>{activeLangMeta.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-[#091424] border border-[#172d4c] rounded-xl shadow-2xl py-1.5 z-50 text-left">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    8 Langues Officielles
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs cursor-pointer transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-[#00e59b]/15 text-[#00e59b] font-bold'
                          : 'text-slate-300 hover:bg-[#0e223d]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[#00e59b]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo Zone */}
        <button
          onClick={() => {
            setCurrentRoute('home');
            setIsMobileMenuOpen(false);
          }}
          className="cursor-pointer text-left focus:outline-none"
        >
          <WatchEarnLogo size="md" showSlogan={true} />
        </button>

        {/* Center Navigation Links (Matching Reference Image) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setCurrentRoute('home')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'home' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => setCurrentRoute('how-it-works')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'how-it-works' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            Comment ça marche
          </button>
          <button
            onClick={() => setCurrentRoute('videos')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'videos' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            Vidéos
          </button>
          <button
            onClick={() => setCurrentRoute('about')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'about' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            À propos
          </button>
          <button
            onClick={() => setCurrentRoute('faq')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'faq' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setCurrentRoute('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              currentRoute === 'contact' ? 'text-[#00e59b]' : 'hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Notifications Icon Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl bg-[#091424] border border-[#14263f] hover:border-[#00e59b]/40 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00e59b] text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#091424] border border-[#172d4c] rounded-2xl shadow-2xl p-4 z-50 text-left">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#00e59b]" />
                      Notifications ({notifications.length})
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-[#00e59b] hover:underline cursor-pointer"
                      >
                        Tout marquer comme lu
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          n.isRead ? 'bg-[#060e18]/60 border-slate-800/60 opacity-70' : 'bg-[#0c1a2e] border-[#172d4c]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                          <span className="truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">{n.date.slice(11, 16)}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile or Login/Register buttons matching Reference Image */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#091424] hover:bg-[#0c1a2e] border border-[#14263f] hover:border-[#00e59b]/40 text-xs text-white transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#00e59b] text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="font-bold truncate max-w-[90px] block leading-none">{currentUser.username}</span>
                  <span className="text-[10px] text-[#00e59b] font-mono block mt-0.5 font-bold">
                    {currentUser.balanceAvailable.toFixed(2)} $
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-[#091424] border border-[#172d4c] rounded-2xl shadow-2xl p-2 z-50 text-left space-y-1">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white truncate">{currentUser.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{currentUser.email}</div>
                      <div className="text-xs font-mono font-bold text-[#00e59b] mt-1">
                        Solde: {currentUser.balanceTotal.toFixed(2)} $
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentRoute('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[#0e213a] cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#00e59b]" />
                      <span>Tableau de bord</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentRoute('wallet');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[#0e213a] cursor-pointer"
                    >
                      <Wallet className="w-4 h-4 text-[#00e59b]" />
                      <span>Mon Portefeuille</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentRoute('referral');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[#0e213a] cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-[#00e59b]" />
                      <span>Mon Parrainage</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setCurrentRoute('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#00e59b] bg-[#00e59b]/10 border border-[#00e59b]/30 font-bold cursor-pointer"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Espace Administrateur</span>
                      </button>
                    )}

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentRoute('login')}
                className="px-3.5 py-1.5 rounded-lg border border-[#00e59b]/40 text-xs font-semibold text-white hover:bg-[#0a182a] transition-colors cursor-pointer"
              >
                Connexion
              </button>
              <button
                onClick={() => setCurrentRoute('register')}
                className="px-3.5 py-1.5 rounded-lg bg-[#00e59b] hover:bg-[#05f8a8] text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(0,229,155,0.35)] cursor-pointer"
              >
                Inscription
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-[#091424] text-slate-300 hover:text-white lg:hidden cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#081220] border-b border-[#112238] px-4 pt-3 pb-6 space-y-3 text-left">
          <div className="space-y-1">
            <button
              onClick={() => {
                setCurrentRoute('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Accueil
            </button>
            <button
              onClick={() => {
                setCurrentRoute('how-it-works');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => {
                setCurrentRoute('videos');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Vidéos
            </button>
            <button
              onClick={() => {
                setCurrentRoute('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Tableau de bord
            </button>
            <button
              onClick={() => {
                setCurrentRoute('wallet');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Portefeuille & Retraits
            </button>
            <button
              onClick={() => {
                setCurrentRoute('referral');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800 font-semibold"
            >
              Parrainage
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setCurrentRoute('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-[#00e59b] bg-[#00e59b]/10 border border-[#00e59b]/30 font-bold"
              >
                Portail Administrateur
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
