import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle2, Clock, Gift, ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setCurrentRoute } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#142844]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-black text-white">Centre de Notifications</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-semibold text-[#00e59b] hover:underline cursor-pointer"
          >
            Tout marquer comme lu
          </button>
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tableau de bord</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="we-card p-12 text-center text-slate-400 text-xs">
            Aucune notification reçue pour le moment.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                n.isRead
                  ? 'bg-[#091322]/60 border-[#142844] opacity-75'
                  : 'bg-[#0a1727] border-[#00e59b]/40 shadow-[0_0_15px_rgba(0,229,155,0.08)]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#00e59b]/15 text-[#00e59b] flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'video_reward' && <CheckCircle2 className="w-4 h-4" />}
                {n.type === 'welcome_bonus' && <Gift className="w-4 h-4 text-amber-400" />}
                {n.type === 'withdrawal_submitted' && <Clock className="w-4 h-4 text-sky-400" />}
                {n.type === 'withdrawal_eligible' && <CheckCircle2 className="w-4 h-4" />}
                {n.type === 'system_alert' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span className="truncate">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">{n.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
