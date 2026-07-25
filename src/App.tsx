import React, { useState, useEffect } from 'react';
import { CandidateInfo, AssessmentStep, BugSiteId, ViewportMode, ToastMessage, GitHubIssueDraft } from './types/assessment';
import { BUGS_DATA } from './data/bugsData';
import { Onboarding } from './components/Onboarding';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { SysDEVOrgPage } from './components/sites/SysDEVOrgPage';
import { SysDEVMerchSite } from './components/sites/SysDEVMerchSite';
import { SysDEVAssemblyForm } from './components/sites/SysDEVAssemblyForm';
import { ResultsScreen } from './components/results/ResultsScreen';
import { GithubIssueSimulator } from './components/results/GithubIssueSimulator';
import { FinalReport } from './components/results/FinalReport';
import { InspectContextMenu, ContextMenuTarget } from './components/common/InspectContextMenu';

export const App: React.FC = () => {
  // Navigation & Step State
  const [step, setStep] = useState<AssessmentStep>('onboarding');
  const [candidate, setCandidate] = useState<CandidateInfo>({ fullName: '', email: '' });
  
  // Assessment Engine State
  const [timeRemaining, setTimeRemaining] = useState<number>(900); // 15 minutes in seconds
  const [discoveredBugIds, setDiscoveredBugIds] = useState<number[]>([]);
  const [currentSite, setCurrentSite] = useState<BugSiteId>('org');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [submittedIssues, setSubmittedIssues] = useState<GitHubIssueDraft[]>([]);
  const [contextMenuTarget, setContextMenuTarget] = useState<ContextMenuTarget | null>(null);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

  // Toast Notifications Stack
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove after 8 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 8000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Timer Countdown Effect (Runs only when in 'assessment' step)
  useEffect(() => {
    if (step !== 'assessment') return;

    if (timeRemaining <= 0) {
      // Time expired! Automatically transition to results screen
      addToast({
        type: 'already_found',
        title: '⏰ Assessment Clock Expired!',
        message: 'The 15-minute testing window has concluded. Proceeding to Part 2 Scorecard.',
      });
      setStep('results');
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeRemaining]);

  // Compute Total Score
  const basePoints = discoveredBugIds.length * 100;
  
  // Speed bonus: Matches ResultsScreen.tsx logic
  const speedBonus = timeRemaining > 0 && discoveredBugIds.length > 0 
    ? Math.floor(timeRemaining / 5) 
    : 0;

  const totalScore = Math.max(0, basePoints + speedBonus);

  // Handlers
  const handleStartAssessment = (info: CandidateInfo) => {
    setCandidate(info);
    setTimeRemaining(900);
    setDiscoveredBugIds([]);
    setStep('assessment');
    addToast({
      type: 'already_found',
      title: 'Assessment Initiated',
      message: 'Welcome! Switch tabs or toggle viewport modes to uncover all 18 intentional defects.',
    });
  };

  const handleDiscoverBug = (bugId: number) => {
    // If already found, show simple informational notice
    if (discoveredBugIds.includes(bugId)) {
      addToast({
        type: 'already_found',
        title: 'Bug already found',
        message: `Bug #${bugId} has already been logged in your telemetry registry.`,
      });
      return;
    }

    // New bug discovered!
    const bugMeta = BUGS_DATA.find((b) => b.id === bugId);
    if (bugMeta) {
      setDiscoveredBugIds((prev) => [...prev, bugId]);
      addToast({
        type: 'bug_found',
        title: 'Bug Found!',
        message: bugMeta.title,
      });

      // If they hit all 18 bugs, celebrate!
      if (discoveredBugIds.length + 1 === 18) {
        addToast({
          type: 'bug_found',
          title: '🏆 PERFECT SWEEP achieved!',
          message: 'You have discovered every single intentional bug in the assessment!',
          points: 100,
        });
      }
    }
  };

  const handleInvalidReport = () => {
    addToast({
      type: 'info',
      title: 'ℹ️ No Defect Verified',
      message: 'No verifyable software defect was found at this location. Keep exploring!',
    });
  };

  const handleFinishPart1 = () => {
    setShowWarningModal(true);
  };

  const confirmFinishPart1 = () => {
    setShowWarningModal(false);
    setStep('results');
    addToast({
      type: 'already_found',
      title: '📊 Part 1 Concluded',
      message: 'Review your discovery scorecard before entering the GitHub issue drafting deck.',
    });
  };

  const handleProceedToGithub = () => {
    setStep('github_issues');
  };

  const handleFinishPortfolio = (issues: GitHubIssueDraft[]) => {
    setSubmittedIssues(issues);
    setStep('final_report');
  };

  const handleRestart = () => {
    setStep('onboarding');
  };

  const handleInspect = (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuTarget({
      x: e.clientX,
      y: e.clientY,
      isBug,
      bugId,
      elementTitle: title,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans antialiased selection:bg-sysdev-navy selection:text-sysdev-gold" onClick={() => setContextMenuTarget(null)}>
      {/* QA Inspection Context Menu */}
      <InspectContextMenu
        target={contextMenuTarget}
        onClose={() => setContextMenuTarget(null)}
        onReportBug={handleDiscoverBug}
        onReportInvalid={handleInvalidReport}
      />

      {/* Floating Toast Notification Engine */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full font-sans animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-black text-white mb-2">Are you sure you want to proceed?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Make sure you took a screenshot of the bugs you found for the next part!
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmFinishPart1}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition cursor-pointer shadow-md hover:shadow-lg"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen Routing */}
      {step === 'onboarding' && (
        <Onboarding onStart={handleStartAssessment} />
      )}

      {step === 'assessment' && (
        <div className="flex flex-col min-h-screen">
          <Header
            candidate={candidate}
            timeRemaining={timeRemaining}
            score={totalScore}
            discoveredCount={discoveredBugIds.length}
            currentSite={currentSite}
            onSelectSite={setCurrentSite}
            viewportMode={viewportMode}
            onSelectViewport={setViewportMode}
            onFinish={handleFinishPart1}
          />

          {/* Simulated Viewport Framing Sandbox */}
          <main
            className={`flex-1 transition-colors duration-200 flex justify-center items-start overflow-x-auto ${
              viewportMode === 'desktop'
                ? 'bg-white dark:bg-zinc-950 w-full p-0 m-0'
                : 'bg-slate-200/90 dark:bg-zinc-900/80 py-8 px-4 min-h-[calc(100vh-120px)]'
            }`}
          >
            {viewportMode === 'desktop' ? (
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenuTarget({
                    x: e.clientX,
                    y: e.clientY,
                    isBug: false,
                    elementTitle: 'Generic Area',
                  });
                }}
                className="w-full min-w-full max-w-none border-none rounded-none shadow-none m-0 p-0 h-[calc(100vh-120px)] bg-white dark:bg-zinc-950 overflow-y-auto overflow-x-hidden"
              >
                {currentSite === 'org' && (
                  <SysDEVOrgPage
                    discoveredBugIds={discoveredBugIds}
                    onDiscoverBug={handleDiscoverBug}
                    viewportMode={viewportMode}
                    onInspect={handleInspect}
                  />
                )}
                {currentSite === 'merch' && (
                  <SysDEVMerchSite
                    discoveredBugIds={discoveredBugIds}
                    onDiscoverBug={handleDiscoverBug}
                    viewportMode={viewportMode}
                    onInspect={handleInspect}
                  />
                )}
                {currentSite === 'assembly' && (
                  <SysDEVAssemblyForm
                    discoveredBugIds={discoveredBugIds}
                    onDiscoverBug={handleDiscoverBug}
                    viewportMode={viewportMode}
                    onInspect={handleInspect}
                  />
                )}
              </div>
            ) : (
              <div
                className={`transition-all duration-300 bg-slate-900 dark:bg-zinc-800 shadow-2xl mx-auto overflow-hidden shrink-0 ${
                  viewportMode === 'tablet'
                    ? 'w-[768px] min-w-[768px] max-w-[768px] h-[1024px] rounded-[36px] p-[12px]'
                    : 'w-[375px] min-w-[375px] max-w-[375px] h-[812px] rounded-[44px] p-[12px]'
                }`}
              >
                {/* Inner scrollable screen inside the device bezel */}
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenuTarget({
                      x: e.clientX,
                      y: e.clientY,
                      isBug: false,
                      elementTitle: 'Generic Area',
                    });
                  }}
                  className={`w-full h-full bg-white dark:bg-zinc-950 overflow-y-auto overflow-x-hidden device-screen-container ${
                    viewportMode === 'tablet' ? 'rounded-[24px]' : 'rounded-[32px]'
                  }`}
                >
                  {currentSite === 'org' && (
                    <SysDEVOrgPage
                      discoveredBugIds={discoveredBugIds}
                      onDiscoverBug={handleDiscoverBug}
                      viewportMode={viewportMode}
                      onInspect={handleInspect}
                    />
                  )}
                  {currentSite === 'merch' && (
                    <SysDEVMerchSite
                      discoveredBugIds={discoveredBugIds}
                      onDiscoverBug={handleDiscoverBug}
                      viewportMode={viewportMode}
                      onInspect={handleInspect}
                    />
                  )}
                  {currentSite === 'assembly' && (
                    <SysDEVAssemblyForm
                      discoveredBugIds={discoveredBugIds}
                      onDiscoverBug={handleDiscoverBug}
                      viewportMode={viewportMode}
                      onInspect={handleInspect}
                    />
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {step === 'results' && (
        <ResultsScreen
          candidate={candidate}
          score={totalScore}
          discoveredBugIds={discoveredBugIds}
          timeRemaining={timeRemaining}
          onProceedToGithub={handleProceedToGithub}
        />
      )}

      {step === 'github_issues' && (
        <GithubIssueSimulator
          candidate={candidate}
          onFinishPortfolio={handleFinishPortfolio}
          discoveredBugIds={discoveredBugIds}
        />
      )}

      {step === 'final_report' && (
        <FinalReport
          candidate={candidate}
          score={totalScore}
          discoveredBugIds={discoveredBugIds}
          timeRemaining={timeRemaining}
          submittedIssues={submittedIssues}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
