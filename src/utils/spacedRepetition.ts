/**
 * Spaced repetition algorithm (simplified Leitner)
 *
 * Philosophy: Missed items resurface with increasing intervals.
 * Research shows spacing > massing for long-term retention.
 */

import { ReviewItem } from '../types';

// Spacing intervals: show missed case after 1 new case, then 3, then 7
const REVIEW_INTERVALS = [1, 3, 7];

/**
 * Add a case to the review queue
 */
export function addToReviewQueue(
  queue: ReviewItem[],
  caseId: string
): ReviewItem[] {
  // Check if case already in queue
  const existingIndex = queue.findIndex((item) => item.caseId === caseId);

  if (existingIndex !== -1) {
    // Increase interval for subsequent misses
    const existing = queue[existingIndex];
    const currentIntervalIndex = REVIEW_INTERVALS.findIndex(
      (interval) => interval === existing.reviewAfter
    );

    const nextIntervalIndex = Math.min(
      currentIntervalIndex + 1,
      REVIEW_INTERVALS.length - 1
    );

    // Update existing item
    return [
      ...queue.slice(0, existingIndex),
      {
        caseId,
        missedAt: Date.now(),
        reviewAfter: REVIEW_INTERVALS[nextIntervalIndex],
      },
      ...queue.slice(existingIndex + 1),
    ];
  }

  // Add new item with first interval
  return [
    ...queue,
    {
      caseId,
      missedAt: Date.now(),
      reviewAfter: REVIEW_INTERVALS[0],
    },
  ];
}

/**
 * Get next case to review (if any)
 * Returns caseId if a review is due, null otherwise
 */
export function getNextReview(
  queue: ReviewItem[],
  casesSinceLastReview: number
): string | null {
  if (queue.length === 0) return null;

  // Sort by reviewAfter (ascending) to prioritize items due soonest
  const sorted = [...queue].sort((a, b) => a.reviewAfter - b.reviewAfter);

  for (const item of sorted) {
    if (casesSinceLastReview >= item.reviewAfter) {
      return item.caseId;
    }
  }

  return null;
}

/**
 * Remove a case from review queue (e.g., after successful review)
 */
export function removeFromReviewQueue(
  queue: ReviewItem[],
  caseId: string
): ReviewItem[] {
  return queue.filter((item) => item.caseId !== caseId);
}

/**
 * Get weak categories based on review queue
 * Returns categories that appear most in queue
 */
export function getWeakCategories(
  queue: ReviewItem[],
  getCaseCategory: (caseId: string) => string
): string[] {
  if (queue.length === 0) return [];

  const categoryCounts: Record<string, number> = {};

  for (const item of queue) {
    const category = getCaseCategory(item.caseId);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }

  // Sort by count descending
  return Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category);
}

/**
 * Calculate next review date (for display purposes)
 */
export function getNextReviewDate(
  reviewAfter: number,
  avgCasesPerDay = 10
): Date {
  const daysUntilReview = Math.ceil(reviewAfter / avgCasesPerDay);
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + daysUntilReview);
  return nextReview;
}
