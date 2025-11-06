/**
 * Scoring logic
 *
 * Philosophy: Reward early pattern recognition (the goal), encourage
 * exploration (no penalties), give credit for physiologic reasoning.
 */

import {
  Answer,
  AnswerFeedback,
  Case,
  RUNG_POINTS,
  CATEGORY_PARTIAL_MULTIPLIER,
  RATIONALE_BONUS,
  CASE_NAMES_TO_IDS,
} from '../types';
import { getCaseById } from '../data/cases';

/**
 * Normalize answer strings for comparison
 * Handles variations like "ASD" vs "Atrial Septal Defect"
 */
export function normalizeAnswer(answer: string): string {
  const normalized = answer.trim().toLowerCase();

  // Try exact match first
  for (const [key, id] of Object.entries(CASE_NAMES_TO_IDS)) {
    if (key.toLowerCase() === normalized) {
      return id;
    }
  }

  // Try partial match (e.g., "atrial septal" matches "Atrial Septal Defect")
  for (const [key, id] of Object.entries(CASE_NAMES_TO_IDS)) {
    if (key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
      return id;
    }
  }

  return normalized; // Return as-is if no match
}

/**
 * Calculate points for an answer
 */
export function calculateScore(answer: Answer, correctCase: Case): AnswerFeedback {
  const selectedId = normalizeAnswer(answer.selectedAnswer);
  const correct = selectedId === correctCase.id;

  // Base points from rung reached
  let pointsEarned = 0;

  if (correct) {
    pointsEarned = RUNG_POINTS[answer.rungReached];

    // Rationale bonus
    if (answer.rationale && answer.rationale.trim().length > 10) {
      pointsEarned += RATIONALE_BONUS;
    }
  } else {
    // Check for partial credit (correct category, wrong diagnosis)
    const selectedCase = getCaseById(selectedId);
    const categoryMatch = selectedCase?.category === correctCase.category;

    if (categoryMatch) {
      pointsEarned = Math.floor(
        RUNG_POINTS[answer.rungReached] * CATEGORY_PARTIAL_MULTIPLIER
      );
    }

    return {
      correct: false,
      pointsEarned,
      explanation: buildExplanation(correctCase, false, categoryMatch),
      nearestDistractor: correctCase.nearestDistractor,
      categoryMatch,
    };
  }

  return {
    correct: true,
    pointsEarned,
    explanation: buildExplanation(correctCase, true),
    nearestDistractor: correctCase.nearestDistractor,
    categoryMatch: true,
  };
}

/**
 * Build explanation text based on correctness
 */
function buildExplanation(
  correctCase: Case,
  correct: boolean,
  categoryMatch = false
): string {
  if (correct) {
    return `✓ Correct! ${correctCase.reveal}`;
  }

  if (categoryMatch) {
    return `Partially correct—you identified the right category (${correctCase.category}), but the specific diagnosis is ${correctCase.name}. ${correctCase.reveal}`;
  }

  return `The correct answer is ${correctCase.name}. ${correctCase.reveal}`;
}

/**
 * Format points display
 */
export function formatPoints(points: number): string {
  if (points === 0) return '0 pts';
  if (points === 1) return '1 pt';
  return `${points} pts`;
}

/**
 * Calculate total possible points per case
 */
export function maxPointsPerCase(): number {
  return RUNG_POINTS[0] + RATIONALE_BONUS; // R1 + rationale = 110
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(earned: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((earned / total) * 100);
}
