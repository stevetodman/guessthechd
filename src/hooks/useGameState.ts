/**
 * Game state management hook
 *
 * Orchestrates: case selection, rung progression, scoring, review queue
 */

import { useState, useEffect, useCallback } from 'react';
import { GameState, Answer, AnswerFeedback, Case } from '../types';
import { cases, getCaseById } from '../data/cases';
import { calculateScore } from '../utils/scoring';
import {
  addToReviewQueue,
  getNextReview,
  removeFromReviewQueue,
} from '../utils/spacedRepetition';

const STORAGE_KEY = 'guessthechd_gamestate';

function loadGameState(): GameState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }

  // Default initial state
  return {
    currentCaseIndex: 0,
    currentRung: 0,
    score: 0,
    casesCompleted: [],
    reviewQueue: [],
    sessionStartTime: Date.now(),
  };
}

function saveGameState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(loadGameState);
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Load current case
  useEffect(() => {
    // Check if a review is due
    const casesSinceLastReview = gameState.casesCompleted.length % 10; // Check every ~10 cases
    const reviewCaseId = getNextReview(gameState.reviewQueue, casesSinceLastReview);

    if (reviewCaseId) {
      const reviewCase = getCaseById(reviewCaseId);
      if (reviewCase) {
        setCurrentCase(reviewCase);
        return;
      }
    }

    // Otherwise, get next case from main sequence
    if (gameState.currentCaseIndex < cases.length) {
      setCurrentCase(cases[gameState.currentCaseIndex]);
    } else {
      // All cases completed; loop back or show completion
      setCurrentCase(cases[0]);
    }
  }, [gameState.currentCaseIndex, gameState.casesCompleted, gameState.reviewQueue]);

  const advanceRung = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentRung: Math.min(prev.currentRung + 1, 4), // Max R5 (index 4)
    }));
  }, []);

  const submitAnswer = useCallback(
    (answer: Answer) => {
      if (!currentCase) return;

      const result = calculateScore(answer, currentCase);
      setFeedback(result);
      setShowingFeedback(true);

      // Update score
      setGameState((prev) => ({
        ...prev,
        score: prev.score + result.pointsEarned,
      }));

      // If incorrect, add to review queue
      if (!result.correct) {
        setGameState((prev) => ({
          ...prev,
          reviewQueue: addToReviewQueue(
            prev.reviewQueue,
            currentCase.id
          ),
        }));
      } else {
        // If correct and was in review queue, remove it
        setGameState((prev) => ({
          ...prev,
          reviewQueue: removeFromReviewQueue(prev.reviewQueue, currentCase.id),
        }));
      }
    },
    [currentCase]
  );

  const nextCase = useCallback(() => {
    if (!currentCase) return;

    setGameState((prev) => ({
      ...prev,
      currentCaseIndex: prev.currentCaseIndex + 1,
      currentRung: 0, // Reset to R1
      casesCompleted: [...prev.casesCompleted, currentCase.id],
    }));

    setFeedback(null);
    setShowingFeedback(false);
  }, [currentCase]);

  const resetGame = useCallback(() => {
    const newState: GameState = {
      currentCaseIndex: 0,
      currentRung: 0,
      score: 0,
      casesCompleted: [],
      reviewQueue: [],
      sessionStartTime: Date.now(),
    };
    setGameState(newState);
    setFeedback(null);
    setShowingFeedback(false);
  }, []);

  return {
    gameState,
    currentCase,
    currentRung: gameState.currentRung,
    feedback,
    showingFeedback,
    advanceRung,
    submitAnswer,
    nextCase,
    resetGame,
  };
}
