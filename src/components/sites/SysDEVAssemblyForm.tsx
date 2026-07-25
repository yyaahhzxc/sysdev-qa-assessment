import React, { useState } from 'react';
import { Check } from 'lucide-react';

import { ViewportMode } from '../../types/assessment';

interface SysDEVAssemblyFormProps {
  discoveredBugIds: number[];
  onDiscoverBug: (id: number) => void;
  viewportMode: ViewportMode;
  onInspect?: (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => void;
}

export const SysDEVAssemblyForm: React.FC<SysDEVAssemblyFormProps> = ({
  discoveredBugIds,
  onDiscoverBug,
  viewportMode,
  onInspect,
}) => {
  // Form State Engine
  const [fullName, setFullName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [isStudentIdChecked, setIsStudentIdChecked] = useState<boolean>(false);
  const [course, setCourse] = useState<string>('');
  const [memberRole, setMemberRole] = useState<string>('Developer Role');
  const [specificRole, setSpecificRole] = useState<string>('Frontend Developer');
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [confirmEmailBlurred, setConfirmEmailBlurred] = useState<boolean>(false);
  const [yearLevel, setYearLevel] = useState<string>('1st Year');
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleContextMenu = (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInspect) {
      onInspect(e, isBug, title, bugId);
    } else {
      if (isBug && bugId) onDiscoverBug(bugId);
    }
  };

  const isBugDiscovered = (id: number) => discoveredBugIds.includes(id);

  const handleYearLevelChange = (val: string) => {
    setYearLevel(val);
    // BUG #15: Failing to clear seniorFacilitator state when changing away from 4th Year!
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normal apps should block if !consentChecked or email !== confirmEmail or historic date
    // BUG #16 & #17: Allows submitting without consent and with contradictory emails!
    setSubmissionStatus("Registration Confirmed! Your attendance has been booked for the General Assembly at Finster Auditorium.");
  };

  const getSpecificRoleOptions = () => {
    if (memberRole === 'Developer Role') {
      return ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Engineer', 'DevOps Engineer'];
    }
    if (memberRole === 'Non-Developer Role') {
      // BUG #13: Shows both Developer and Non-Developer roles when Non-Developer is selected
      return [
        'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Engineer', 'DevOps Engineer',
        'Project Manager', 'Quality Assurance Tester'
      ];
    }
    return ['Graphic Designer', 'Content Writer'];
  };

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans min-h-full pb-24 select-none">
      
      {/* Assembly Banner Header */}
      <header className={`bg-slate-900 text-white border-b border-slate-800 py-6 ${viewportMode === 'mobile' ? 'px-4' : 'px-4 sm:px-8'}`}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div 
              onContextMenu={(e) => {
                if (viewportMode === 'mobile') {
                  handleContextMenu(e, true, "Mobile Header Text Overflow Layout Issue", 15);
                } else {
                  handleContextMenu(e, false, "Assembly Header Tags");
                }
              }}
              className={`flex items-center gap-2 ${viewportMode === 'mobile' ? 'whitespace-nowrap flex-nowrap' : 'flex-wrap sm:whitespace-normal'} ${viewportMode === 'mobile' && isBugDiscovered(15) ? 'bug-discovered overflow-hidden' : ''}`}
            >
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sysdev-gold text-slate-950 font-black uppercase tracking-wider shrink-0">
                Annual Student Gathering
              </span>
              <span className="text-xs font-mono text-slate-400">Finster Auditorium, AdDU</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mt-2">
              SAMAHAN SysDEV 2026 General Assembly Registration
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Registration page for all SAMAHAN Systems Development Members
            </p>
          </div>
        </div>
      </header>

      {/* Main Registration Sandbox Grid */}
      <main className={`max-w-4xl mx-auto py-8 space-y-8 ${viewportMode === 'mobile' ? 'px-4' : 'px-4 sm:px-8'}`}>
        
        <form onSubmit={handleSubmit} className={`bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm space-y-8 ${viewportMode === 'mobile' ? 'p-6' : 'p-6 sm:p-8'}`}>
          
          {/* Section 1: Academic Student Identifiers */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                1. Student Academic Credentials
              </h3>
            </div>

            <div className={`grid gap-5 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
              
              {/* Full Name Decoy Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onContextMenu={(e) => handleContextMenu(e, false, "Full Name Input Field")}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition"
                  required
                />
              </div>

              {/* BUG #14: Student ID field accepts arbitrary letters/alphanumeric strings without validation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Student ID (put your 6 digit ID) <span className="text-rose-500">*</span>
                </label>
                <div
                  onContextMenu={(e) => {
                    const hasLetters = !/^\d+$/.test(studentId) && studentId.length > 0;
                    const isBug = hasLetters && isStudentIdChecked;
                    handleContextMenu(e, isBug, "Unrestricted Alphanumeric Student ID Entry", isBug ? 14 : undefined);
                  }}
                  className="relative flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                      setIsStudentIdChecked(false);
                    }}
                    placeholder="e.g. 123456"
                    className={`flex-1 px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-mono text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition ${
                      isBugDiscovered(14) ? 'bug-discovered' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsStudentIdChecked(true)}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {isStudentIdChecked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : "Check"}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  {isStudentIdChecked 
                    ? <span className="text-emerald-500 font-bold">Valid format accepted!</span> 
                    : "Format: exactly 6 digits (e.g., 123456)."}
                </p>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Course <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  onContextMenu={(e) => handleContextMenu(e, false, "Course Input Field")}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition"
                  required
                />
              </div>

              {/* Year Level Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Year Level <span className="text-rose-500">*</span>
                </label>
                <select
                  value={yearLevel}
                  onChange={(e) => handleYearLevelChange(e.target.value)}
                  onContextMenu={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (rect.width - x <= 24) {
                      handleContextMenu(e, true, "Dropdown Chevron Missing Right Spacing Padding", 18);
                    } else {
                      handleContextMenu(e, false, "Year Level Selection Dropdown");
                    }
                  }}
                  className={`w-full pl-3.5 !pr-0 !bg-[position:right_-4px_center] py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition cursor-pointer ${
                    isBugDiscovered(18) ? 'bug-discovered' : ''
                  }`}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              </div>

            </div>
          </div>

          {/* Section 2: Assembly Track */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                2. Gathering Role
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Select your designated role for the breakout sessions.
              </p>
            </div>

            <div className={`grid gap-5 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Member Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={memberRole}
                  onChange={(e) => {
                    setMemberRole(e.target.value);
                    setSpecificRole(
                      e.target.value === 'Developer Role' ? 'Frontend Developer' :
                      e.target.value === 'Non-Developer Role' ? 'Project Manager' :
                      'Graphic Designer'
                    );
                  }}
                  onContextMenu={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (rect.width - x <= 24) {
                      handleContextMenu(e, true, "Dropdown Chevron Missing Right Spacing Padding", 18);
                    } else {
                      handleContextMenu(e, false, "Member Role Dropdown");
                    }
                  }}
                  className={`w-full pl-3.5 !pr-0 !bg-[position:right_-4px_center] py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition cursor-pointer ${
                    isBugDiscovered(18) ? 'bug-discovered' : ''
                  }`}
                >
                  <option value="Developer Role">Developer Role</option>
                  <option value="Non-Developer Role">Non-Developer Role</option>
                  <option value="Creative Role">Creative Role</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Specific Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={specificRole}
                  onChange={(e) => setSpecificRole(e.target.value)}
                  onContextMenu={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (rect.width - x <= 24) {
                      handleContextMenu(e, true, "Dropdown Chevron Missing Right Spacing Padding", 18);
                    } else {
                      const isBug = memberRole === 'Non-Developer Role';
                      handleContextMenu(e, isBug, "Specific roles dropdown includes developer roles", isBug ? 13 : undefined);
                    }
                  }}
                  className={`w-full pl-3.5 !pr-0 !bg-[position:right_-4px_center] py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition cursor-pointer ${
                    (memberRole === 'Non-Developer Role' && isBugDiscovered(13)) || isBugDiscovered(18) ? 'bug-discovered' : ''
                  }`}
                >
                  {getSpecificRoleOptions().map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Section 3: Institutional Email Equality Verification */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                3. Institutional Email Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Enter and confirm your Ateneo de Davao university address (`@addu.edu.ph`) for digital check-in passes.
              </p>
            </div>

            <div className={`grid gap-5 ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  AdDU Institutional Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onContextMenu={(e) => handleContextMenu(e, false, "Primary Email Input")}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-mono text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition"
                  required
                />
              </div>

              {/* BUG #17: Institutional Email Mismatch Blindness */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Confirm AdDU Institutional Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => {
                      setConfirmEmail(e.target.value);
                      setConfirmEmailBlurred(false);
                    }}
                    onBlur={() => setConfirmEmailBlurred(true)}
                    onContextMenu={(e) => handleContextMenu(e, false, "Confirm Email Input")}
                    className={`w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-mono text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition ${
                      isBugDiscovered(17) ? 'bug-discovered' : ''
                    }`}
                    required
                  />
                  {email && confirmEmail && confirmEmailBlurred && (
                    <p 
                      onContextMenu={(e) => handleContextMenu(e, email !== confirmEmail, "Fake Emails Match Validation Indicator", 17)}
                      className="absolute -bottom-5 left-0 text-[11px] text-emerald-500 font-bold cursor-pointer"
                    >
                      Emails match!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Mandatory Student Consent & Verification Protocol */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
            
            {/* BUG #16: Mandatory Consent bearing red asterisk * can be left unchecked without blocking submission */}
            <div
              onClick={() => setConsentChecked(!consentChecked)}
              className="p-4 rounded-xl border transition flex items-start gap-3.5 cursor-pointer bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 hover:border-slate-400"
            >
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-sysdev-navy cursor-pointer shrink-0"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1 min-w-0 text-xs leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white block">
                  I confirm my attendance and adhere to the SAMAHAN Systems Development Code of Conduct <span className="text-rose-500 font-extrabold text-sm ml-0.5">*</span>
                </span>
                <span className="text-slate-500 dark:text-zinc-400 block mt-1">
                  By marking this agreement, I certify that all registration details above correspond to my verifiable student profile at Ateneo de Davao University.
                </span>
              </div>
            </div>

            {submissionStatus && (
              <div 
                onContextMenu={(e) => {
                  const isBug16 = !consentChecked;
                  handleContextMenu(e, isBug16, "Mandatory Student Consent Bypass", isBug16 ? 16 : undefined);
                }}
                className={`p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 text-xs font-bold flex items-center gap-2 cursor-pointer ${
                  !consentChecked && isBugDiscovered(16) ? 'bug-discovered' : ''
                }`}
              >
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{submissionStatus}</span>
              </div>
            )}

            {/* Form Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onContextMenu={(e) => handleContextMenu(e, false, "Reset Registration Form Button")}
                onClick={() => { setSubmissionStatus(null); alert("Form registration fields reset."); }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-semibold text-xs hover:bg-slate-100 transition"
              >
                Reset Fields
              </button>

              <button
                type="submit"
                onContextMenu={(e) => handleContextMenu(e, false, "Submit Registration Button")}
                className="px-6 py-2.5 bg-sysdev-navy hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Assembly Registration</span>
                <Check className="w-4 h-4" />
              </button>
            </div>

          </div>

        </form>
      </main>

    </div>
  );
};
