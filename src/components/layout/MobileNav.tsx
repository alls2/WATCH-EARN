import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, PlaySquare, Wallet, Users, LayoutDashboard, Shield } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentRoute, setCurrentRoute, currentUser } = useApp();

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'videos', label: 'Vidéos', icon: PlaySquare },
    { id: 'wallet', label: 'Portefeuille', icon: Wallet },
    { id: 'referral', label: 'Parrainage', icon: Users },
    {
      id: currentUser?.role === 'admin' ? 'admin' : 'dashboard',
      label: currentUser?.role === 'admin' ? 'Admin' : 'Compte',
      icon: currentUser?.role === 'admin' ? Shield : LayoutDashboard,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060b13]/95 backdrop-blur-md border-t border-[#12243d] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentRoute(item.id as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-1 min-h-[44px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#00e59b] bg-[#00e59b]/15 font-bold shadow-[0_0_10px_rgba(0,229,155,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight truncate max-w-full leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
