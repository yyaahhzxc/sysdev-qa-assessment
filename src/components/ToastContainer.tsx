import React from 'react';
import { ToastMessage } from '../types/assessment';
import { AlertTriangle, Info, X, CheckCircle2 } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => {
        let borderColor = 'border-slate-300 dark:border-zinc-700';
        let bgColor = 'bg-white dark:bg-zinc-900';
        let icon = <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5 animate-pulse" />;
        let badgeColor = 'bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200';
        let barColor = 'bg-slate-400';

        if (toast.type === 'bug_found') {
          borderColor = 'border-emerald-500/80 shadow-emerald-500/20';
          bgColor = 'bg-emerald-950 text-emerald-100 border-2';
          icon = <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 animate-bounce" />;
          badgeColor = 'bg-emerald-800 text-emerald-200 font-bold';
          barColor = 'bg-emerald-400';
        } else if (toast.type === 'already_found') {
          borderColor = 'border-amber-400/80 shadow-amber-500/10';
          bgColor = 'bg-amber-950 text-amber-100 border-2';
          icon = <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />;
          badgeColor = 'bg-amber-800 text-amber-200';
          barColor = 'bg-amber-400';
        } else if (toast.type === 'misclick') {
          borderColor = 'border-rose-500/80 shadow-rose-500/20';
          bgColor = 'bg-rose-950 text-rose-100 border-2';
          icon = <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 animate-pulse" />;
          badgeColor = 'bg-rose-900 text-rose-200 font-bold';
          barColor = 'bg-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-xl shadow-2xl p-4 border transition-all duration-300 animate-in fade-in slide-in-from-right-10 transform translate-y-0 ${bgColor} ${borderColor} relative`}
          >
            <div className="flex items-start gap-3">
              {icon}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-sm tracking-wide truncate">
                    {toast.title}
                  </h4>
                  {toast.points !== undefined && (
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full shrink-0 ${badgeColor}`}>
                      {toast.points >= 0 ? `+${toast.points} pts` : `${toast.points} pts`}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-1 leading-relaxed opacity-90 font-sans">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition shrink-0"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 8-Second Animated Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 overflow-hidden">
              <div
                className={`h-full ${barColor} animate-pulse`}
                style={{
                  width: '100%',
                  animation: 'shrink 8s linear forwards',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
