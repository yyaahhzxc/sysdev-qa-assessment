import React from 'react';
import { CandidateInfo, GitHubIssueDraft } from '../../types/assessment';
import { Printer, RefreshCw, Trophy, Clock, Bug, Terminal } from 'lucide-react';

interface FinalReportProps {
  candidate: CandidateInfo;
  score: number;
  discoveredBugIds: number[];
  timeRemaining: number;
  submittedIssues: GitHubIssueDraft[];
  onRestart: () => void;
}

export const FinalReport: React.FC<FinalReportProps> = ({
  candidate,
  score,
  discoveredBugIds,
  timeRemaining,
  submittedIssues,
  onRestart,
}) => {
  const discoveredCount = discoveredBugIds.length;
  
  const totalSecondsUsed = 900 - timeRemaining;
  const minutesSpent = Math.floor(totalSecondsUsed / 60);
  const secondsSpent = totalSecondsUsed % 60;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 py-12 px-4 sm:px-8 print:bg-white print:py-0 print:px-0">
      
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-4">
        
        {/* Top Control Bar (Hidden in Print Mode) */}
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 print:hidden">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
            <span className="text-xs font-bold uppercase tracking-wider">QA Screening Deliverable ({minutesSpent}m {secondsSpent}s duration)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs shadow-sm transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print / Export to PDF
            </button>
            <button
              onClick={onRestart}
              className="py-2 px-4 rounded-lg bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 font-semibold text-xs transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retest Assessment
            </button>
          </div>
        </div>

        {/* Official Assessment Portfolio Certificate Header */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-8 sm:p-10 shadow-md text-center relative overflow-hidden print:shadow-none print:border-none print:p-0">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-2xl shadow-md transition transform hover:scale-105">
            <img src="/samahan-sysdev-logo.png" alt="SysDev" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-bold tracking-widest text-sysdev-navy dark:text-sysdev-gold uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 inline-block">
            SAMAHAN Systems Development • Ateneo de Davao University
          </span>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white mt-4 tracking-tight">
            QA Tester Assessment Summary
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto border-t border-slate-200 dark:border-zinc-800 pt-8 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Name</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{candidate.fullName}</span>
            </div>
            <div className="md:text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Institutional Email</span>
              <span className="font-mono font-medium text-slate-800 dark:text-zinc-200 text-xs">{candidate.email}</span>
            </div>
          </div>
        </div>

        {/* Global Score Summary & Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:gap-2">
          
          <div className="bg-sysdev-navy text-white rounded-xl p-6 shadow-md border-b-4 border-sysdev-gold flex items-center justify-between sm:col-span-1 print:border-slate-800 print:text-black print:bg-white print:border-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80 print:text-slate-500">Cumulative Score</span>
              <div className="text-4xl font-black tracking-tight mt-1">
                {score.toLocaleString()} <span className="text-lg opacity-80 font-normal">pts</span>
              </div>
            </div>
            <Trophy className="w-10 h-10 text-sysdev-gold opacity-80 print:text-slate-800" />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center justify-between sm:col-span-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Defects Found</span>
              <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-white">
                {discoveredCount} <span className="text-sm text-emerald-500">/ 18</span>
              </div>
            </div>
            <Bug className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex items-center justify-between sm:col-span-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Time Invested</span>
              <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-white">
                {minutesSpent}m {secondsSpent}s
              </div>
            </div>
            <Clock className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>

        </div>
        
        {/* Submitted Issues Section Placeholder */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-8 shadow-sm">
           <h2 className="text-xl font-bold border-b pb-2 mb-4">Submitted Tickets</h2>
           {submittedIssues.length === 0 ? (
             <p className="text-sm text-slate-500">No issues were submitted.</p>
           ) : (
             <div className="space-y-4">
               {submittedIssues.map((issue, idx) => (
                 <div key={idx} className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
                   <h3 className="font-bold text-lg">{issue.title}</h3>
                   <span className="text-xs text-sysdev-navy dark:text-sysdev-gold font-mono">{issue.label}</span>
                   <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans space-y-1">
                     {issue.markdownContent ? issue.markdownContent.split('\n').map((line, i) => (
                       line.startsWith('### ') ? (
                         <h4 key={i} className="font-bold text-slate-900 dark:text-white text-sm mt-3 mb-1">{line.replace('### ', '')}</h4>
                       ) : (
                         <div key={i} className="min-h-[1em]">{line}</div>
                       )
                     )) : null}
                   </div>
                   {issue.attachmentDataUrl && (
                     <div className="mt-4 border-t border-slate-200 dark:border-zinc-700 pt-4">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Attached Screenshot</span>
                       <img src={issue.attachmentDataUrl} alt="Attached Screenshot" className="max-h-64 object-contain rounded-lg border border-slate-200 dark:border-zinc-700 shadow-sm" />
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
