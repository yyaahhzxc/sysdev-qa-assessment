import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export interface ContextMenuTarget {
  x: number;
  y: number;
  isBug: boolean;
  bugId?: number;
  elementTitle: string;
}

interface InspectContextMenuProps {
  target: ContextMenuTarget | null;
  onClose: () => void;
  onReportBug: (bugId: number) => void;
  onReportInvalid?: () => void;
}

export const InspectContextMenu: React.FC<InspectContextMenuProps> = ({
  target,
  onClose,
  onReportBug,
  onReportInvalid,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = () => {
      onClose();
    };
    if (target) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [target, onClose]);

  if (!target) return null;

  // Prevent menu from going off-screen
  const menuX = Math.min(target.x, window.innerWidth - 220);
  const menuY = Math.min(target.y, window.innerHeight - 150);

  return (
    <div
      className="fixed z-[9999] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden w-[220px] animate-in zoom-in-95 duration-100"
      style={{ top: menuY, left: menuX }}
      onContextMenu={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2 flex flex-col gap-1">
        <button
          onClick={() => {
            if (target.isBug && target.bugId) {
              onReportBug(target.bugId);
            } else if (onReportInvalid) {
              onReportInvalid();
            }
            onClose();
          }}
          className="w-full px-3 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <AlertCircle className="w-4 h-4 text-sysdev-gold" />
          <span>Report Defect Here</span>
        </button>
        
        <button
          onClick={onClose}
          className="w-full px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};
