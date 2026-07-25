import React from 'react';
import { CandidateInfo, ViewportMode, BugSiteId } from '../types/assessment';
import { Clock, CheckCircle2, Monitor, Tablet, Smartphone, Check } from 'lucide-react';

interface HeaderProps {
  candidate: CandidateInfo;
  timeRemaining: number;
  score: number;
  discoveredCount: number;
  currentSite: BugSiteId;
  onSelectSite: (site: BugSiteId) => void;
  viewportMode: ViewportMode;
  onSelectViewport: (mode: ViewportMode) => void;
  onFinish: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  candidate,
  timeRemaining,
  discoveredCount,
  currentSite,
  onSelectSite,
  viewportMode,
  onSelectViewport,
  onFinish,
}) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 shadow-sm relative z-30 font-sans select-none shrink-0">
      
      {/* QA Guidance Banner */}
      <div className="bg-slate-900 text-slate-300 dark:bg-zinc-900 dark:text-zinc-300 px-4 py-2 text-xs font-mono border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>QA Assessment Instructions: Explore the three sites to find six bugs on each site. Right click on the bug to report and confirm. Bugs may also be found in different viewports (web, tablet, mobile). Don't forget to screenshot your found bugs!</span>
        <span className="text-sysdev-gold font-bold whitespace-nowrap">Simulated Sandbox</span>
      </div>

      {/* Top Banner: Branding & Vitals */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
        
        {/* Left: Identity / Brand */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl overflow-hidden bg-sysdev-navy flex shrink-0 items-center justify-center shadow-md">
            <img src="./samahan-sysdev-logo.png" alt="SysDEV" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-zinc-100 uppercase">
                SYSDEV QA SANDBOX
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 truncate max-w-[180px] sm:max-w-xs font-mono">
              {candidate.fullName} ({candidate.email})
            </p>
          </div>
        </div>

        {/* Center/Right: Live Test Metrics */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Countdown Clock */}
          <div className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-2 transition-colors ${
            timeRemaining < 180 
              ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400 animate-pulse' 
              : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(timeRemaining)}</span>
          </div>

          {/* Discovery Tracker */}
          <div className={`px-3 py-1.5 rounded-lg border font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 transition-colors ${
            discoveredCount >= 18 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-400' 
              : 'bg-emerald-50/50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-500'
          }`}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 hidden sm:block" />
              <span className="text-[9px] uppercase tracking-wider opacity-80 hidden sm:inline">Bugs Found</span>
            </div>
            <span className="text-sm">{discoveredCount} <span className="opacity-50 font-normal">/ 18</span></span>
          </div>

          <button
            onClick={onFinish}
            className="ml-0 sm:ml-2 px-3 sm:px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white rounded-lg font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 hidden sm:block" />
            <span>Finish Assessment</span>
          </button>

        </div>
      </div>

      {/* Bottom Tool Bar: Tab Switcher & Viewport Controls */}
      <div className="border-t border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 h-auto sm:h-12 py-2 sm:py-0">
          
          {/* Simulated Domain Tabs (Parentheses text removed!) */}
          <nav className="flex space-x-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => onSelectSite('org')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
                currentSite === 'org' ? 'bg-slate-900 text-white shadow-sm dark:bg-zinc-800 dark:text-zinc-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
              }`}
            >
              Tab 1: SysDEV Website
            </button>
            <button
              onClick={() => onSelectSite('merch')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
                currentSite === 'merch' ? 'bg-slate-900 text-white shadow-sm dark:bg-zinc-800 dark:text-zinc-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
              }`}
            >
              Tab 2: SysDEV Merch Site
            </button>
            <button
              onClick={() => onSelectSite('assembly')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
                currentSite === 'assembly' ? 'bg-slate-900 text-white shadow-sm dark:bg-zinc-800 dark:text-zinc-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
              }`}
            >
              Tab 3: SysDEV GA Registration
            </button>
          </nav>

          {/* Viewport Toggles */}
          <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-zinc-800/50 p-1 rounded-lg self-end sm:self-auto shrink-0">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2 hidden md:block">Viewport:</span>
            
            <button 
              onClick={() => onSelectViewport('desktop')}
              className={`p-1.5 rounded transition ${viewportMode === 'desktop' ? 'bg-white shadow text-slate-900 dark:bg-zinc-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400'}`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => onSelectViewport('tablet')}
              className={`p-1.5 rounded transition ${viewportMode === 'tablet' ? 'bg-white shadow text-slate-900 dark:bg-zinc-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400'}`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => onSelectViewport('mobile')}
              className={`p-1.5 rounded transition ${viewportMode === 'mobile' ? 'bg-white shadow text-slate-900 dark:bg-zinc-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400'}`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
