import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Assistance & Contact International
        </h1>
        <p className="text-sm text-slate-400">
          Notre équipe répond à vos questions concernant votre compte, vos récompenses ou vos retraits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact info card (4 cols) */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">Canaux de Support Officiels</h2>
            <p className="text-xs text-slate-400">
              Assistance multilingue 7j/7 pour les membres enregistrés.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Support E-mail</span>
                <strong className="text-white">support@watchearn.io</strong>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Délai moyen de réponse</span>
                <strong className="text-white">Moins de 24 heures</strong>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Couverture</span>
                <strong className="text-white">Global (8 Langues)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Message envoyé avec succès</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Merci {name}, votre demande a été transmise à notre équipe support. Un accusé de réception a été envoyé à <strong>{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Votre Nom Complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Sarah Jenkins"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Adresse E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Sujet de la demande</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="support">Question générale sur la plateforme</option>
                  <option value="withdrawal">Suivi d'une demande de retrait</option>
                  <option value="referral">Signalement ou vérification de parrainage</option>
                  <option value="adsterra">Partenariat régie publicitaire</option>
                  <option value="legal">Conformité légale & Données personnelles</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Votre Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez précisément votre demande..."
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre mon message au support</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
