import React, { useState } from 'react';
import { ViewportMode } from '../../types/assessment';
import { Search, Menu, ArrowRight, Github, ExternalLink, Calendar, Code2, MessageSquare, Send } from 'lucide-react';

interface SysDEVOrgPageProps {
  discoveredBugIds: number[];
  onDiscoverBug: (id: number) => void;
  viewportMode: ViewportMode;
  onInspect?: (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => void;
}

export const SysDEVOrgPage: React.FC<SysDEVOrgPageProps> = ({
  discoveredBugIds,
  onDiscoverBug,
  viewportMode,
  onInspect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasClickedCalendar, setHasClickedCalendar] = useState(false);

  const handleContextMenu = (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInspect) {
      onInspect(e, isBug, title, bugId);
    } else {
      // Fallback if onInspect is not provided
      if (isBug && bugId) onDiscoverBug(bugId);
    }
  };

  const isBugDiscovered = (id: number) => discoveredBugIds.includes(id);

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans min-h-full relative select-none flex flex-col">
      
      {/* Navigation Header */}
      <header className={`bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-20 py-4 ${viewportMode === 'mobile' ? 'px-4' : 'px-4 sm:px-8'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 relative">
          
          {/* Brand Logo Container */}
          <div
            onClick={() => alert("Navigating to Home")}
            className="flex items-center gap-2 cursor-pointer transition hover:bg-slate-100 dark:hover:bg-zinc-800 py-1 px-2 rounded-lg border border-transparent"
          >
            <div className="w-8 h-8 rounded-lg bg-sysdev-navy flex items-center justify-center overflow-hidden shadow-sm">
              <img src="./samahan-sysdev-logo.png" alt="SysDEV" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <span className="font-black text-xs block text-slate-900 dark:text-white tracking-tight">SAMAHAN</span>
              <span className="text-[10px] font-bold text-sysdev-navy dark:text-sysdev-gold block">SYSTEMS DEVELOPMENT</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className={`${viewportMode === 'desktop' ? 'flex' : 'hidden'} items-center gap-6 text-xs font-semibold text-slate-700 dark:text-zinc-300 pl-6`}>
            <button
              onClick={() => setActiveNav('about')}
              onContextMenu={(e) => handleContextMenu(e, false, "About Us Nav Link")}
              className={`hover:text-sysdev-navy dark:hover:text-sysdev-gold transition p-1 ${activeNav === 'about' ? 'text-sysdev-navy dark:text-sysdev-gold font-bold' : ''}`}
            >
              About Us
            </button>
            <button
              onClick={() => setActiveNav('projects')}
              onContextMenu={(e) => handleContextMenu(e, false, "Projects Nav Link")}
              className={`hover:text-sysdev-navy dark:hover:text-sysdev-gold transition p-1 ${activeNav === 'projects' ? 'text-sysdev-navy dark:text-sysdev-gold font-bold' : ''}`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveNav('events')}
              onContextMenu={(e) => handleContextMenu(e, false, "Events Nav Link")}
              className={`hover:text-sysdev-navy dark:hover:text-sysdev-gold transition p-1 ${activeNav === 'events' ? 'text-sysdev-navy dark:text-sysdev-gold font-bold' : ''}`}
            >
              Events & Hackathons
            </button>
            <button
              onClick={() => setActiveNav('officers')}
              onContextMenu={(e) => handleContextMenu(e, false, "Officers Nav Link")}
              className={`hover:text-sysdev-navy dark:hover:text-sysdev-gold transition p-1 ${activeNav === 'officers' ? 'text-sysdev-navy dark:text-sysdev-gold font-bold' : ''}`}
            >
              Officers
            </button>
          </nav>

          {/* Search & Actions Container */}
          <div className="flex items-center gap-3 flex-1 max-w-xs justify-end relative">
            
            {/* Search Bar */}
            <div
              onContextMenu={(e) => handleContextMenu(e, false, "Resource Search Input")}
              className="relative w-full text-slate-400 focus-within:text-slate-600"
            >
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition"
              />
            </div>

            {/* Member Portal Button */}
            <button
              onClick={() => alert("Welcome to the SAMAHAN SysDEV Member Portal authentication gateway!")}
              onContextMenu={(e) => handleContextMenu(e, false, "Member Portal Button")}
              className={`${viewportMode === 'mobile' ? 'hidden' : 'block'} px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-bold transition shadow-sm shrink-0`}
            >
              Member Portal
            </button>

            {/* Viewport Toggle Drawer Icon - BUG #2 (Mobile Viewport Drawer Occlusion over Search) */}
            <div
              onContextMenu={(e) => {
                if (viewportMode === 'mobile') {
                  handleContextMenu(e, true, "Mobile Viewport Drawer Icon Occlusion", 2);
                } else {
                  handleContextMenu(e, false, "Tablet Viewport Drawer Icon");
                }
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${viewportMode === 'mobile' ? 'block absolute right-8 top-1.5 z-40' : viewportMode === 'tablet' ? 'block relative' : 'hidden'} cursor-pointer p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-200 hover:bg-slate-200 transition ${viewportMode === 'mobile' && isBugDiscovered(2) ? 'bug-discovered' : ''}`}
            >
              <Menu className="w-4 h-4" />
            </div>

          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className={`max-w-6xl mx-auto ${viewportMode === 'mobile' ? 'px-4 py-10' : 'px-4 sm:px-8 py-10 sm:py-16'} grid gap-8 items-center border-b border-slate-200 dark:border-zinc-800 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-12'}`}>
        <div className={`${viewportMode === 'mobile' ? 'col-span-1' : 'col-span-7'} space-y-6`}>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-sysdev-navy dark:bg-zinc-800 dark:text-sysdev-gold border border-indigo-100 dark:border-zinc-700 max-w-full">
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Ateneo de Davao University — Premier Tech Org</span>
          </div>
          
          <h1 className={`${viewportMode === 'mobile' ? 'text-3xl' : 'text-3xl sm:text-5xl'} font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]`}>
            Pioneering the Next Generation of Systems Developers
          </h1>
          
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            SAMAHAN Systems Development unites programmers, designers, QA engineers, and cybersecurity enthusiasts at Ateneo de Davao University to architect high-impact student technologies and web platforms.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => alert("Application window for academic semester 2026 is open!")}
              onContextMenu={(e) => handleContextMenu(e, false, "Apply for Membership Button")}
              className="px-5 py-2.5 bg-sysdev-navy hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <span>Apply for SysDEV Membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => alert("Opening SysDEV GitHub Open Source Organization repositories...")}
              onContextMenu={(e) => handleContextMenu(e, false, "Open Source Projects Button")}
              className="px-5 py-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Open Source Projects</span>
            </button>
          </div>
        </div>

        {/* Hero Image Container - BUG #6 (Distorted Aspect Ratio w-full h-48 without object-cover) */}
        <div className={`${viewportMode === 'mobile' ? 'col-span-1' : 'col-span-5'}`}>
          <div
            onContextMenu={(e) => handleContextMenu(e, true, "Distorted Hero Image Aspect Ratio", 6)}
            className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-zinc-800 bg-slate-900 cursor-pointer ${
              isBugDiscovered(6) ? 'bug-discovered' : 'hover:opacity-95'
            }`}
          >
            {/* Intentionally squeezed without object-cover */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="SAMAHAN SysDEV Officers Assembly"
              className={`w-full ${viewportMode === 'mobile' ? 'h-48' : 'h-48 sm:h-52'}`}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="text-[11px] font-bold text-white tracking-wide">
                SAMAHAN SysDEV Officers & Developers Assembly
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-mono text-center mt-2">
            Figure 1.2: Annual Hackathon Showcase at Finster Hall
          </p>
        </div>
      </section>

      {/* Featured Workshops & Bootcamps Grid */}
      <section className={`max-w-6xl mx-auto space-y-6 ${viewportMode === 'mobile' ? 'px-4 py-8' : 'px-4 sm:px-8 py-12'}`}>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Academic Excellence
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Featured Workshops & Bootcamps
            </h2>
          </div>
          <button
            onContextMenu={(e) => handleContextMenu(e, hasClickedCalendar, "View Full Calendar Link (Redirects to LinkedIn)", hasClickedCalendar ? 1 : undefined)}
            onClick={() => {
              setHasClickedCalendar(true);
              window.open("https://www.linkedin.com", "_blank");
            }}
            className={`text-xs font-bold text-sysdev-navy dark:text-sysdev-gold hover:underline flex items-center gap-1 cursor-pointer ${isBugDiscovered(1) ? 'bug-discovered' : ''}`}
          >
            <span>View Full Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`grid gap-6 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
          
          {/* Card 1: Normal Decoy Card */}
          <div
            onContextMenu={(e) => handleContextMenu(e, false, "Web Architecture Workshop Card")}
            className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>October 18, 2026</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                Modern Web Architecture & Backend API Security
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                An intensive student training course covering OAuth authentication, microservices architecture, and SQL injection prevention.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">Room 304 / Hybrid</span>
              <span className="font-bold text-sysdev-navy dark:text-sysdev-gold">Open Register</span>
            </div>
          </div>

          {/* Card 2: BUG #3 (Clipped Workshop Title Typography via h-7 overflow-hidden) */}
          <div
            onContextMenu={(e) => handleContextMenu(e, true, "Clipped Workshop Title (h-7 overflow-hidden)", 3)}
            className={`bg-white dark:bg-zinc-900 rounded-xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer ${
              isBugDiscovered(3) ? 'bug-discovered' : ''
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-[11px] font-mono font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>November 05, 2026</span>
              </div>
              
              {/* Intentional CSS Bug: Fixed height with hidden overflow on a multi-line title */}
              <div className="h-7 overflow-hidden">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                  SAMAHAN SysDEV Advanced AI & Software Engineering Bootcamp 2026
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                A 3-day deep dive into LLMs, agentic systems, and building robust autonomous workflows using Python and TypeScript.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">Finster Hall</span>
              <span className="font-bold text-slate-400">Waitlisted</span>
            </div>
          </div>

          {/* Card 3: Normal Decoy Card */}
          <div
            onContextMenu={(e) => handleContextMenu(e, false, "DevOps Pipeline Workshop Card")}
            className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>November 22, 2026</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                CI/CD Pipelines & Cloud Deployment Strategies
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Mastering GitHub Actions, Docker containerization, and automated testing deployments to AWS and Vercel.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">Online Zoom</span>
              <span className="font-bold text-sysdev-navy dark:text-sysdev-gold">Open Register</span>
            </div>
          </div>

        </div>
      </section>

      {/* Executive Board Leadership Grid */}
      <section className="bg-slate-100 dark:bg-zinc-900/50 border-t border-b border-slate-200 dark:border-zinc-800">
        <div className={`max-w-6xl mx-auto space-y-6 ${viewportMode === 'mobile' ? 'px-4 py-8' : 'px-4 sm:px-8 py-12'}`}>
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              2026–2027 Executive Board Officers
            </h2>
          </div>

          <div className={`grid gap-6 pt-4 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
            
            {/* Officer 1: Normal */}
            <div
              onContextMenu={(e) => handleContextMenu(e, false, "Officer Card: Christian Reyes")}
              className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-800 mx-auto mb-3 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="President" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Christian Reyes</h4>
              <span className="text-[11px] text-sysdev-navy dark:text-sysdev-gold font-bold block mt-0.5">President</span>
              <span className="text-[10px] text-slate-400 font-mono block">BS CS - 4th Year</span>
            </div>

            {/* Officer 2: Normal */}
            <div
              onContextMenu={(e) => handleContextMenu(e, false, "Officer Card: Samantha Tan")}
              className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-800 mx-auto mb-3 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" alt="VP Internal" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Samantha Tan</h4>
              <span className="text-[11px] text-sysdev-navy dark:text-sysdev-gold font-bold block mt-0.5">VP Internal Affairs</span>
              <span className="text-[10px] text-slate-400 font-mono block">BS CS - 3rd Year</span>
            </div>

            {/* Officer 3: BUG #4 (Off-Grid Card Spilling Over) */}
            <div
              onContextMenu={(e) => handleContextMenu(e, true, "Off-Grid Officer Profile Card Spill", 4)}
              className={`bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm text-center relative z-20 cursor-pointer ${
                viewportMode === 'mobile' ? '' : 'w-[120%] -mr-[20%]'
              } ${
                isBugDiscovered(4) ? 'bug-discovered' : ''
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-800 mx-auto mb-3 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" alt="VP SysDEV" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Gabriel Lim</h4>
              <span className="text-[11px] text-sysdev-navy dark:text-sysdev-gold font-bold block mt-0.5">VP for Systems Development</span>
              <span className="text-[10px] text-slate-400 font-mono block">BS IS - 4th Year</span>
            </div>

            {/* Officer 4: Normal (Partially covered by Gabriel Lim's spilled card) */}
            <div
              onContextMenu={(e) => handleContextMenu(e, false, "Officer Card: Bea Gonzaga")}
              className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm text-center relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-800 mx-auto mb-3 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="VP Finance" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Bea Gonzaga</h4>
              <span className="text-[11px] text-sysdev-navy dark:text-sysdev-gold font-bold block mt-0.5">VP Finance</span>
              <span className="text-[10px] text-slate-400 font-mono block">BS IT - 3rd Year</span>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Dev Desk Support Widget */}
      <div
        onContextMenu={(e) => handleContextMenu(e, false, "Floating Support Widget")}
        style={{ zIndex: 30 }}
        className="fixed bottom-8 left-8 p-3 rounded-full bg-sysdev-navy text-white shadow-2xl flex items-center gap-2 cursor-pointer border border-sysdev-gold transition-all duration-300 opacity-70 hover:opacity-100"
      >
        <MessageSquare className="w-5 h-5 text-sysdev-gold" />
        <span className="text-xs font-bold pr-2">Dev Desk Support</span>
      </div>

      {/* Footer / Newsletter */}
      <footer className={`bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto text-xs relative z-10 ${viewportMode === 'mobile' ? 'px-4 py-8' : 'px-4 sm:px-8 py-12'}`}>
        <div className={`max-w-6xl mx-auto grid gap-8 items-start ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
          
          <div className={`${viewportMode === 'mobile' ? 'col-span-1' : 'col-span-5'} space-y-3`}>
            <h4 className="font-black text-sm text-white tracking-wide">SAMAHAN SYSTEMS DEVELOPMENT</h4>
            <p className="leading-relaxed text-slate-400">
              The primary student organization for software systems development, quality test engineering, and computational science at Ateneo de Davao University.
            </p>
            <p className="text-[11px] font-mono text-slate-500 pt-2">
              © 2026 SAMAHAN SysDEV • Ateneo de Davao University
            </p>
          </div>

          {/* Newsletter Box with Email Validation Bug */}
          <div className={`${viewportMode === 'mobile' ? 'col-span-1' : 'col-span-7'} bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3`}>
            <h5 className="font-extrabold text-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Subscribe to latest SysDEV news and updates!</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">Monthly Newsletter</span>
            </h5>
            <p className="text-xs text-slate-400">
              Receive automated GitHub digests, hackathon invitations, and QA research benchmarks directly to your institutional email.
            </p>

            <form
              onSubmit={(e) => { 
                e.preventDefault(); 
                setNewsletterStatus("Subscribed successfully!"); 
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1"
            >
              <div 
                className="flex-1 relative"
                onContextMenu={(e) => {
                  // Bug 5: accepts non-addu email successfully
                  const isInvalidEmail = newsletterStatus !== '' && !newsletterEmail.endsWith('@addu.edu.ph');
                  handleContextMenu(e, isInvalidEmail, "Newsletter Accepts Non-Institutional Email", isInvalidEmail ? 5 : undefined);
                }}
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="enter student email (@addu.edu.ph)"
                  className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 text-white border border-slate-800 font-medium focus:outline-none transition ${
                    isBugDiscovered(5) ? 'bug-discovered' : ''
                  }`}
                  required
                />
              </div>
              <button
                type="submit"
                onContextMenu={(e) => handleContextMenu(e, false, "Subscribe Submit Button")}
                className="px-5 py-2 bg-sysdev-gold hover:bg-yellow-400 text-slate-950 font-black rounded-lg transition shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {newsletterStatus && (
              <p 
                onContextMenu={(e) => {
                  const isInvalidEmail = newsletterStatus !== '' && !newsletterEmail.endsWith('@addu.edu.ph');
                  handleContextMenu(e, isInvalidEmail, "Newsletter Accepts Non-Institutional Email", isInvalidEmail ? 5 : undefined);
                }}
                className={`text-emerald-400 text-xs font-semibold mt-1 cursor-pointer w-max ${isBugDiscovered(5) ? 'bug-discovered' : ''}`}
              >
                {newsletterStatus}
              </p>
            )}
          </div>

        </div>
      </footer>

    </div>
  );
};
