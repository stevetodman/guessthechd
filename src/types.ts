/**
 * Type system for Guess the CHD
 *
 * Philosophy: Types are guardrails. They prevent mixing up TGA with TAPVR,
 * forgetting R4 audio for a case, or scoring inconsistently.
 */

export type CaseCategory =
  | 'acyanotic-shunt'           // ASD, VSD, PDA
  | 'acyanotic-obstructive'     // CoA, AS, PS
  | 'cyanotic-conotruncal'      // TOF, TGA, Truncus (22q11 link)
  | 'cyanotic-other';           // TAPVR, AVSD, Ebstein, HLHS

export type RungType =
  | 'whisper'           // R1: ≤12 words
  | 'pathophys'         // R2: Vital/physiology cue
  | 'image'             // R3: CXR crop
  | 'audio'             // R4: Heart sound ≤2s
  | 'confirmatory';     // R5: Full CXR or association

export interface MediaAsset {
  url: string;
  alt?: string;
  caption?: string;
}

export interface Rung {
  type: RungType;
  content: string;       // Text description/hint
  media?: MediaAsset;    // Optional image or audio
}

export interface NearestDistractor {
  name: string;
  whyNot: string;        // One sentence: why this is NOT that
}

export interface Case {
  id: string;                     // 'asd', 'vsd', 'tof', etc.
  name: string;                   // 'Atrial Septal Defect'
  category: CaseCategory;

  // Clinical teaching content
  recognition: string;            // Full clinical description
  hook: string;                   // Association/embryology pearl
  nearestDistractor: NearestDistractor;

  // The 5-rung ladder (exactly 5, enforced by tuple type)
  rungs: [Rung, Rung, Rung, Rung, Rung];

  reveal: string;                 // What clinches it (shown after answer)
}

// Game state management
export interface GameState {
  currentCaseIndex: number;
  currentRung: number;            // 0-4 (R1-R5)
  score: number;
  casesCompleted: string[];       // Case IDs
  reviewQueue: ReviewItem[];      // Spaced repetition queue
  sessionStartTime: number;
}

export interface ReviewItem {
  caseId: string;
  missedAt: number;               // Timestamp
  reviewAfter: number;            // Show again after N cases
}

// Answer submission
export interface Answer {
  caseId: string;
  selectedAnswer: string;
  rungReached: number;            // 0-4 (which rung they answered at)
  rationale?: string;             // Optional "because..." explanation
  timestamp: number;
}

export interface AnswerFeedback {
  correct: boolean;
  pointsEarned: number;
  explanation: string;
  nearestDistractor: NearestDistractor;
  categoryMatch: boolean;         // Correct category, wrong specific diagnosis
}

// Scoring constants
export const RUNG_POINTS = [100, 80, 60, 40, 20] as const;
export const CATEGORY_PARTIAL_MULTIPLIER = 0.25;
export const RATIONALE_BONUS = 10;

// Helper: Map case names to IDs for answer matching
export const CASE_NAMES_TO_IDS: Record<string, string> = {
  'Atrial Septal Defect': 'asd',
  'ASD': 'asd',
  'Ventricular Septal Defect': 'vsd',
  'VSD': 'vsd',
  'Patent Ductus Arteriosus': 'pda',
  'PDA': 'pda',
  'Coarctation of the Aorta': 'coa',
  'CoA': 'coa',
  'Pulmonic Stenosis': 'ps',
  'PS': 'ps',
  'Tetralogy of Fallot': 'tof',
  'TOF': 'tof',
  'd-Transposition of the Great Arteries': 'tga',
  'TGA': 'tga',
  'd-TGA': 'tga',
  'Total Anomalous Pulmonary Venous Return': 'tapvr',
  'TAPVR': 'tapvr',
  'Truncus Arteriosus': 'truncus',
  'Atrioventricular Septal Defect': 'avsd',
  'AVSD': 'avsd',
  'AV Canal': 'avsd',
  'Complete AVSD': 'avsd',
  'Ebstein Anomaly': 'ebstein',
  'Hypoplastic Left Heart Syndrome': 'hlhs',
  'HLHS': 'hlhs',
};
