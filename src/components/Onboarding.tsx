import React, { useState } from 'react';
import { CandidateInfo } from '../types/assessment';
import { ShieldAlert, Terminal } from 'lucide-react';

interface OnboardingProps {
  onStart: (info: CandidateInfo) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError('Please provide both your Full Name and Institutional Email to initiate the assessment.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid institutional email address.');
      return;
    }
    onStart({ fullName: fullName.trim(), email: email.trim() });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4 py-12 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg p-8 sm:p-10 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100 dark:border-zinc-800">
          <div className="w-24 h-24 mb-4 flex items-center justify-center overflow-hidden rounded-2xl shadow-md transition transform hover:scale-105">
            <img src="/samahan-sysdev-logo.png" alt="SAMAHAN SysDev Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-sysdev-navy dark:text-sysdev-gold uppercase bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full mb-2 border border-slate-200 dark:border-zinc-700">
            Ateneo de Davao University
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            SysDev QA Assessment Test
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 max-w-md">
            This is the second phase of the assessment test for Quality Assurance Testers of the SAMAHAN Systems Development '26-'27.
          </p>
        </div>

        {/* Instructions Deck */}
        <div className="py-6 space-y-4 text-sm text-slate-700 dark:text-zinc-300">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
            Assessment Guidelines
          </h3>
          
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-zinc-300">
            <li>There will be three web applications to assess: an organizational website, an e-commerce platform, and an event registration portal.</li>
            <li>The applications can be evaluated across different viewports: desktop, tablet, and mobile.</li>
            <li>Each page contains 6 intentional defects, for a total of 18 bugs across the platform.</li>
            <li>You will be given 15 minutes to discover as many bugs as possible.</li>
            <li>When you identify a defect on an element or section, right-click on that part and select "Report Defect".</li>
            <li>Make sure to capture and save screenshots of the bugs you find to use in Part 2 (GitHub Issue Ticketing Simulator).</li>
          </ul>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              Candidate Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sysdev-navy dark:focus:ring-sysdev-gold transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              Institutional Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. candidate@addu.edu.ph"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-sysdev-navy dark:focus:ring-sysdev-gold transition"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-md">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-medium text-sm text-white bg-sysdev-navy hover:bg-slate-900 dark:bg-sysdev-gold dark:text-sysdev-dark dark:hover:bg-amber-400 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sysdev-navy dark:focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
            >
              Start 15-Minute QA Assessment
              <span className="text-xs opacity-80">(Timer Begins Immediately)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
