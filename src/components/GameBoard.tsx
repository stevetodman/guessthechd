/**
 * GameBoard: Orchestrates the game loop
 *
 * Flow: Show current rung → User requests next rung or submits answer
 *       → Show feedback → Next case
 */

import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { RungDisplay } from './RungDisplay';
import { AnswerPanel } from './AnswerPanel';
import { ScoreCard } from './ScoreCard';
import { formatPoints, calculatePercentage, maxPointsPerCase } from '../utils/scoring';
import { Answer } from '../types';

export function GameBoard() {
  const {
    gameState,
    currentCase,
    currentRung,
    feedback,
    showingFeedback,
    advanceRung,
    submitAnswer,
    nextCase,
    resetGame,
  } = useGameState();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [rationale, setRationale] = useState('');

  if (!currentCase) {
    return (
      <div className="game-board">
        <div className="completion">
          <h2>All cases completed!</h2>
          <p>Final score: {formatPoints(gameState.score)}</p>
          <p>
            Percentage:{' '}
            {calculatePercentage(
              gameState.score,
              gameState.casesCompleted.length * maxPointsPerCase()
            )}
            %
          </p>
          <button onClick={resetGame} className="btn-primary">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer.trim()) {
      alert('Please enter your diagnosis.');
      return;
    }

    const answer: Answer = {
      caseId: currentCase.id,
      selectedAnswer: selectedAnswer.trim(),
      rungReached: currentRung,
      rationale: rationale.trim() || undefined,
      timestamp: Date.now(),
    };

    submitAnswer(answer);
  };

  const handleNextCase = () => {
    setSelectedAnswer('');
    setRationale('');
    nextCase();
  };

  return (
    <div className="game-board">
      {/* Header */}
      <div className="game-header">
        <ScoreCard
          score={gameState.score}
          casesCompleted={gameState.casesCompleted.length}
          totalCases={12}
          reviewQueueLength={gameState.reviewQueue.length}
        />
      </div>

      {/* Case presentation */}
      <div className="case-container">
        <h2 className="case-title">
          Case {gameState.casesCompleted.length + 1}
        </h2>

        {/* Progressive disclosure: R1 → R5 */}
        <div className="rungs">
          {currentCase.rungs.slice(0, currentRung + 1).map((rung, index) => (
            <RungDisplay key={index} rung={rung} rungNumber={index + 1} />
          ))}
        </div>

        {/* Actions */}
        {!showingFeedback && (
          <div className="action-panel">
            {currentRung < 4 && (
              <button onClick={advanceRung} className="btn-secondary">
                Show Next Clue (R{currentRung + 2})
                <span className="points-cost">
                  {' '}
                  {/* Cost: -20 pts */}
                </span>
              </button>
            )}

            <AnswerPanel
              selectedAnswer={selectedAnswer}
              rationale={rationale}
              onAnswerChange={setSelectedAnswer}
              onRationaleChange={setRationale}
              onSubmit={handleSubmitAnswer}
              disabled={showingFeedback}
            />
          </div>
        )}

        {/* Feedback */}
        {showingFeedback && feedback && (
          <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
            <h3>
              {feedback.correct ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="points">
              {formatPoints(feedback.pointsEarned)}
            </p>

            <div className="explanation">
              <h4>Explanation:</h4>
              <p>{feedback.explanation}</p>
            </div>

            <div className="distractor">
              <h4>Nearest Distractor:</h4>
              <p>
                <strong>{feedback.nearestDistractor.name}</strong> —{' '}
                {feedback.nearestDistractor.whyNot}
              </p>
            </div>

            <div className="clinical-pearl">
              <h4>Clinical Pearl:</h4>
              <p>{currentCase.hook}</p>
            </div>

            <button onClick={handleNextCase} className="btn-primary">
              Next Case →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
