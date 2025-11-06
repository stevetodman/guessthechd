/**
 * ScoreCard: Displays current score and progress
 */

import { formatPoints } from '../utils/scoring';

interface ScoreCardProps {
  score: number;
  casesCompleted: number;
  totalCases: number;
  reviewQueueLength: number;
}

export function ScoreCard({
  score,
  casesCompleted,
  totalCases,
  reviewQueueLength,
}: ScoreCardProps) {
  return (
    <div className="score-card">
      <div className="score-item">
        <span className="label">Score:</span>
        <span className="value">{formatPoints(score)}</span>
      </div>

      <div className="score-item">
        <span className="label">Progress:</span>
        <span className="value">
          {casesCompleted} / {totalCases}
        </span>
      </div>

      {reviewQueueLength > 0 && (
        <div className="score-item review-queue">
          <span className="label">To Review:</span>
          <span className="value">{reviewQueueLength}</span>
        </div>
      )}
    </div>
  );
}
