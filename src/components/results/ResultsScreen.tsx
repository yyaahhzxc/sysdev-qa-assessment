import React from 'react';
import { CandidateInfo } from '../../types/assessment';
import { BUGS_DATA } from '../../data/bugsData';
import { ArrowRight, Clock, Bug, Shield, Terminal } from 'lucide-react';

interface ResultsScreenProps {
  candidate: CandidateInfo;
  score: number;
  discoveredBugIds: number[];
  timeRemaining: number;
  onProceedToGithub?: () => void;
  onProceedToPart2?: () => void;
  onRestart?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  candidate,
  score,
  discoveredBugIds,
  timeRemaining,
  onProceedToGithub,
  onProceedToPart2,
}) => {
  // Breakdown Math
  const discoveredCount = discoveredBugIds.length;
  const basePoints = discoveredCount * 100;
  const timeBonus = timeRemaining > 0 && discoveredCount > 0 ? Math.floor(timeRemaining / 5) : 0;
  
  // Elapsed Test Duration
  const totalSecondsUsed = 900 - timeRemaining;
  const minutesUsed = Math.floor(totalSecondsUsed / 60);
  const secondsUsed = totalSecondsUsed % 60;

  // Categorize discovered bugs by siteId
  const orgBugs = BUGS_DATA.filter((b) => b.siteId === 'org');
  const merchBugs = BUGS_DATA.filter((b) => b.siteId === 'merch');
  const assemblyBugs = BUGS_DATA.filter((b) => b.siteId === 'assembly');

  const handleProceed = () => {
    if (onProceedToGithub) onProceedToGithub();
    else if (onProceedToPart2) onProceedToPart2();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 py-12 px-4 sm:px-6 font-sans text-slate-900 dark:text-zinc-100 flex items-center justify-center select-none">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
        
        {/* Top Celebration Banner */}
        <div className="bg-slate-900 dark:bg-zinc-950 p-6 sm:p-8 border-b border-slate-800 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Seamless Logo Container */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md flex items-center justify-center shrink-0 border border-slate-800">
                <img src="./samahan-sysdev-logo.png" alt="SAMAHAN SysDEV" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-sysdev-gold text-slate-950 mb-1.5 inline-block">
                  Part 1 Testing Concluded
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  QA Discovery Assessment Scorecard
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Candidate: {candidate.fullName} ({candidate.email})
                </p>
              </div>
            </div>

            {/* Total Score Deck */}
            <div className="bg-white/10 dark:bg-zinc-900/90 border border-white/20 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 text-center min-w-[220px] shadow-inner">
              <span className="text-xs text-slate-300 dark:text-zinc-400 uppercase font-mono font-bold block">
                Total Computed Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-sysdev-gold my-1 tracking-tight">
                {score.toLocaleString()}
                <span className="text-lg text-slate-300 font-normal ml-1">pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Breakdown Section */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* 2-Col Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold">
                <Bug className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 block uppercase font-sans">Verified Defects</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{discoveredCount} / 18</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block">+{basePoints} base pts</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 block uppercase font-sans">Test Duration Used</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {minutesUsed}m {secondsUsed}s
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-bold block">+{timeBonus} speed pts</span>
              </div>
            </div>

          </div>

          {/* Discovery Breakdown by Application Tab */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-2">
              <Shield className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
              <span>Bug Discovery Distribution Across Simulated Apps</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              
              {/* Tab 1 Stats */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2sm space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white font-sans">
                  <span>Tab 1: SysDEV Org Page</span>
                  <span className="text-indigo-600 dark:text-sysdev-gold">
                    {orgBugs.filter((b) => discoveredBugIds.includes(b.id)).length} / 6
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-sysdev-gold transition-all duration-500"
                    style={{ width: `${(orgBugs.filter((b) => discoveredBugIds.includes(b.id)).length / 6) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 block font-sans">Layout & Responsive UI Defect Domain</span>
              </div>

              {/* Tab 2 Stats */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2sm space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white font-sans">
                  <span>Tab 2: SysDEV Merch Site</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    {merchBugs.filter((b) => discoveredBugIds.includes(b.id)).length} / 6
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(merchBugs.filter((b) => discoveredBugIds.includes(b.id)).length / 6) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 block font-sans">E-Commerce Logic & Billing Multipliers</span>
              </div>

              {/* Tab 3 Stats */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2sm space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white font-sans">
                  <span>Tab 3: General Assembly</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {assemblyBugs.filter((b) => discoveredBugIds.includes(b.id)).length} / 6
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(assemblyBugs.filter((b) => discoveredBugIds.includes(b.id)).length / 6) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 block font-sans">Form State Validation & Bypass Flaws</span>
              </div>

            </div>
          </div>

          {/* Transition Guide & Instructions for Part 2 */}
          <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-zinc-950/80 border-2 border-indigo-200 dark:border-zinc-800 space-y-3">
            <h4 className="font-extrabold text-sm text-indigo-950 dark:text-indigo-200 flex items-center gap-2 font-sans">
              <Terminal className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
              <span>Part 2 of Assessment: Github Issue Ticketing Simulator</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
              In this next part, you will be interacting with a replica of Github to simulate the submission of the bugs you found. You will need to submit three of the bugs you discovered along with your screenshots. A template guide for the ticket description will be provided.
            </p>
          </div>

          {/* Proceed Action Deck */}
          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-end">
            <button
              onClick={handleProceed}
              className="px-8 py-4 bg-sysdev-navy hover:bg-slate-800 text-white rounded-xl font-extrabold text-sm shadow-xl hover:shadow-2xl transition transform active:scale-98 flex items-center gap-3 cursor-pointer"
            >
              <span>Proceed to Part 2: Issue Drafting Sandbox</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
