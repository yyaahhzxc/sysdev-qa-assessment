import React, { useState } from 'react';
import { CandidateInfo, GitHubIssueDraft } from '../../types/assessment';
import { BUGS_DATA } from '../../data/bugsData';
import { Github, Plus, Check, FileText, ArrowRight, Copy, ImageIcon, Paperclip, Edit2, Trash2, Bug } from 'lucide-react';

interface GithubIssueSimulatorProps {
  candidate: CandidateInfo;
  onFinish?: (issues: GitHubIssueDraft[]) => void;
  onFinishPortfolio?: (issues: GitHubIssueDraft[]) => void;
  discoveredBugIds?: number[];
}

export const GithubIssueSimulator: React.FC<GithubIssueSimulatorProps> = ({
  onFinish,
  onFinishPortfolio,
  discoveredBugIds = [],
}) => {
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileDataUrl, setAttachedFileDataUrl] = useState<string | null>(null);

  // Submitted tickets portfolio
  const [submittedIssues, setSubmittedIssues] = useState<GitHubIssueDraft[]>([]);
  
  // UI toggles & copy notification
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Standard QA Formatting Guide
  const formattingGuideText = `### Type
[Specify: Bug, UI/UX Problem, Accessibility Issue, Feature Request, etc.]

### Page/Section
[Specify which tab and exactly which part of the page this was found]

### Detailed Bug Description
[Describe what occurs vs what is expected to occur in the simulated application]

### Step-by-Step Reproduction Procedure
1. Navigate to Tab: [SysDev Org Page / Merch Site / General Assembly]
2. Perform test action: [e.g., Click 'Add to Cart' or select 1st Year dropdown]
3. Observe software defect: [Describe exact incorrect feedback]

### Expected Output vs. Actual Output
- Expected Output: [Correct standard behavior]
- Actual Output: [Observed system error]

### Environment
- OS / Browser: Windows / Chrome (or Mobile / Firefox)`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(formattingGuideText);
    setCopyFeedback("Template copied to clipboard!");
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  const handleInsertTemplate = () => {
    setDescription(formattingGuideText);
    setCopyFeedback("Template inserted directly into description box!");
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFileDataUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please furnish both an Issue Title and Bug Description before committing to the QA queue.');
      return;
    }

    const newIssue: GitHubIssueDraft = {
      bugId: submittedIssues.length + 1, // Just a sequential ID since we removed the bug dropdown
      title: title.trim(),
      markdownContent: description.trim() + (attachedFileName ? `\n\n**Attachment:** [${attachedFileName}]` : ''),
      label: 'Bug Report',
      submitted: true,
      attachmentDataUrl: attachedFileDataUrl || undefined,
    };

    setSubmittedIssues((prev) => [newIssue, ...prev]);
    
    // Reset form cleanly to empty state for next ticket
    setTitle('');
    setDescription('');
    setAttachedFileName(null);
    setAttachedFileDataUrl(null);
    setIsPreviewMode(false);
  };

  const handleEditIssue = (issue: GitHubIssueDraft) => {
    setTitle(issue.title);
    const content = issue.markdownContent.replace(/\n\n\*\*Attachment:\*\* \[(.*?)\]$/, '');
    setDescription(content);
    
    const match = issue.markdownContent.match(/\n\n\*\*Attachment:\*\* \[(.*?)\]$/);
    if (match) {
      setAttachedFileName(match[1]);
    } else {
      setAttachedFileName(null);
    }
    setAttachedFileDataUrl(issue.attachmentDataUrl || null);
    
    setIsPreviewMode(false);
    setSubmittedIssues((prev) => prev.filter((i) => i.bugId !== issue.bugId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteIssue = (bugId: number) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      setSubmittedIssues((prev) => prev.filter((i) => i.bugId !== bugId));
    }
  };

  const handleComplete = () => {
    if (submittedIssues.length < 3) {
      if (!confirm("You have drafted fewer than 3 bug tickets. Are you sure you wish to conclude and generate your final QA scorecard?")) return;
    }
    if (onFinishPortfolio) onFinishPortfolio(submittedIssues);
    else if (onFinish) onFinish(submittedIssues);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased pb-24 selection:bg-indigo-500 selection:text-white select-none">
      
      {/* Top Authentic GitHub Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Github className="w-7 h-7 text-white shrink-0" />
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400 font-semibold">samahan-sysdev</span>
              <span className="text-slate-600">/</span>
              <span className="text-white font-extrabold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                qa-bug-reports-2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Drafted Tickets:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-extrabold ${
                submittedIssues.length >= 3 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {submittedIssues.length} / 3 required
              </span>
            </div>

            <button
              onClick={handleComplete}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <span>Generate Final Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Sandbox Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* Bugs Found Guide */}
        {discoveredBugIds.length > 0 && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center gap-2">
              <Bug className="w-4 h-4 text-emerald-400 shrink-0" />
              <h4 className="text-xs font-extrabold text-white font-sans tracking-wide">
                Bugs Discovered During Assessment
              </h4>
            </div>
            <div className="p-4 flex flex-col gap-4 max-h-64 overflow-y-auto">
              {['org', 'merch', 'assembly'].map(siteId => {
                const siteBugs = discoveredBugIds
                  .map(id => BUGS_DATA.find(b => b.id === id))
                  .filter(b => b && b.siteId === siteId)
                  .sort((a, b) => a!.id - b!.id);
                
                if (siteBugs.length === 0) return null;
                
                const siteNames: Record<string, string> = {
                  'org': 'Tab 1: SysDEV Website',
                  'merch': 'Tab 2: SysDEV Merch Site',
                  'assembly': 'Tab 3: SysDEV GA Registration'
                };
                
                return (
                  <div key={siteId} className="space-y-2">
                    <h5 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">{siteNames[siteId]}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {siteBugs.map((bug) => (
                        <div key={bug!.id} className="flex items-start gap-2 text-xs font-mono">
                          <span className="text-slate-500 font-bold shrink-0">{bug!.id}.</span>
                          <span className="text-slate-300">{bug!.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Collapsible Formatting Layout Guide (Copy & Paste Template) */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sysdev-gold shrink-0" />
              <h4 className="text-xs font-extrabold text-white font-sans tracking-wide">
                Formatting Layout Guide (Copy & Paste Template)
              </h4>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCopyTemplate}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-sysdev-gold" />
                <span>Copy Template</span>
              </button>
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-mono font-bold transition cursor-pointer"
              >
                Insert into Editor
              </button>
            </div>
          </div>
          
          {copyFeedback && (
            <div className="bg-emerald-950 text-emerald-300 px-4 py-1.5 text-xs font-mono flex items-center gap-1.5 border-b border-emerald-900">
              <Check className="w-3.5 h-3.5" />
              <span>{copyFeedback}</span>
            </div>
          )}

          <div className="p-4 font-mono text-xs text-slate-400 bg-black/40 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {formattingGuideText}
          </div>
        </div>

        {/* GitHub Issue Drafting Form */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h2 className="text-base font-black text-white tracking-wide font-sans">
                Open New Issue Ticket
              </h2>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 font-mono text-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className={`flex-1 sm:flex-none px-3 py-1 rounded transition ${!isPreviewMode ? 'bg-slate-800 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Write (Markdown)
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                className={`flex-1 sm:flex-none px-3 py-1 rounded transition ${isPreviewMode ? 'bg-slate-800 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Preview Ticket
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitIssue} className="space-y-5">
            
            {/* Ticket Title Input */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Issue Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Negative cart quantity underflow in Merch Store checkout"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-white font-sans text-xs sm:text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 transition placeholder-slate-600 font-semibold"
              />
            </div>

            {/* Description Body Input vs Preview Mode */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Issue Body Description (Markdown) <span className="text-rose-500">*</span></span>
              </label>
              
              {!isPreviewMode ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={12}
                  placeholder="Paste the formatting guide from the template box above, then describe your observed reproduction steps, expected vs actual behavior, and platform telemetry..."
                  className="w-full p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800 focus:outline-none focus:border-indigo-500 transition placeholder-slate-600 resize-y"
                />
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-sans text-xs text-slate-200 min-h-[280px] prose prose-invert prose-xs max-w-none space-y-3">
                  <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">{title || 'Untitled Ticket Draft'}</h3>
                  <div className="whitespace-pre-wrap font-mono text-slate-300 text-xs leading-relaxed space-y-1">
                    {description ? description.split('\n').map((line, i) => (
                      line.startsWith('### ') ? (
                        <h3 key={i} className="font-bold text-white text-sm mt-4 mb-2">{line.replace('### ', '')}</h3>
                      ) : (
                        <div key={i} className="min-h-[1em]">{line}</div>
                      )
                    )) : '*No issue description provided yet.*'}
                  </div>
                  {attachedFileName && (
                    <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs flex items-center gap-2 text-emerald-400">
                      <ImageIcon className="w-4 h-4 shrink-0" />
                      <span>Attached Screenshot: {attachedFileName}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* File Attachment Input (replaces dropdown) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" /> Attach Screenshot Evidence
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 cursor-pointer bg-slate-900 border border-slate-800 p-2 rounded-xl transition"
                />
                {attachedFileName && (
                  <button 
                    type="button"
                    onClick={() => {
                      setAttachedFileName(null);
                      setAttachedFileDataUrl(null);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-sans">
                Submitted issues are automatically bundled into your final exportable portfolio.
              </span>

              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-extrabold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-sysdev-gold" />
                <span>Add Ticket</span>
              </button>
            </div>

          </form>
        </div>

        {/* Submitted Issues Roster / Portfolio Summary */}
        {submittedIssues.length > 0 && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-black text-white flex items-center justify-between font-sans border-b border-slate-800 pb-3">
              <span>Submitted Tickets ({submittedIssues.length})</span>
            </h3>

            <div className="space-y-3 font-sans">
              {submittedIssues.map((issue, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 pr-4">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h4 className="font-extrabold text-xs sm:text-sm text-white line-clamp-1">{issue.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={() => handleEditIssue(issue)} className="p-1.5 text-slate-400 hover:text-indigo-400 transition" title="Edit Ticket">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => handleDeleteIssue(issue.bugId)} className="p-1.5 text-slate-400 hover:text-rose-400 transition" title="Delete Ticket">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-400 bg-black/30 p-4 rounded-xl border border-slate-800/60">
                    <div className="whitespace-pre-wrap space-y-1">
                      {issue.markdownContent ? issue.markdownContent.split('\n').map((line, i) => (
                        line.startsWith('### ') ? (
                          <h4 key={i} className="font-bold text-white text-sm mt-3 mb-1 font-sans">{line.replace('### ', '')}</h4>
                        ) : (
                          <div key={i} className="min-h-[1em]">{line}</div>
                        )
                      )) : null}
                    </div>
                  </div>
                  {issue.attachmentDataUrl && (
                     <div className="mt-2">
                       <img src={issue.attachmentDataUrl} alt="Attached Screenshot" className="max-h-48 object-contain rounded-md border border-slate-700 shadow-sm" />
                     </div>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                      {issue.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
