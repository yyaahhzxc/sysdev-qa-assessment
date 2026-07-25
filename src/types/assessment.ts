export type BugSiteId = 'org' | 'merch' | 'assembly';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
export type AssessmentStep = 'onboarding' | 'assessment' | 'results' | 'github_issues' | 'final_report';

export interface Bug {
  id: number;
  title: string;
  siteId: BugSiteId;
  category: 'Layout / CSS' | 'Logic / Calculation' | 'Validation / State';
  description: string;
  stepsToReproduce: string[];
  expectedOutput: string;
  actualOutput: string;
  screenshotPng: string; // Ready-made PNG attachment representation
  points: number;
}

export interface ToastMessage {
  id: string;
  type: 'bug_found' | 'already_found' | 'misclick' | 'info';
  title: string;
  message: string;
  points?: number;
}

export interface CandidateInfo {
  fullName: string;
  email: string;
}

export interface GitHubIssueDraft {
  bugId: number;
  title: string;
  label: string;
  markdownContent: string;
  submitted: boolean;
  attachmentDataUrl?: string;
}

export interface AssessmentStats {
  score: number;
  timeRemaining: number; // in seconds, start from 900 (15 min)
  discoveredBugIds: number[];
  misclickPenalties: number;
  step: AssessmentStep;
  currentSite: BugSiteId;
  viewportMode: ViewportMode;
}
