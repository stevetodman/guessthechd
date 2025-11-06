/**
 * AnswerPanel: Handles answer submission
 *
 * Includes diagnosis input and optional rationale
 */

import { getCaseNames } from '../data/cases';

interface AnswerPanelProps {
  selectedAnswer: string;
  rationale: string;
  onAnswerChange: (value: string) => void;
  onRationaleChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function AnswerPanel({
  selectedAnswer,
  rationale,
  onAnswerChange,
  onRationaleChange,
  onSubmit,
  disabled = false,
}: AnswerPanelProps) {
  const caseNames = getCaseNames();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="answer-panel">
      <div className="form-group">
        <label htmlFor="diagnosis">Your Diagnosis:</label>
        <input
          id="diagnosis"
          type="text"
          list="case-options"
          value={selectedAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., ASD, Tetralogy of Fallot, ..."
          disabled={disabled}
          className="diagnosis-input"
          autoComplete="off"
        />
        <datalist id="case-options">
          {caseNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>

      <div className="form-group">
        <label htmlFor="rationale">
          Why? (optional, +10 pts)
        </label>
        <textarea
          id="rationale"
          value={rationale}
          onChange={(e) => onRationaleChange(e.target.value)}
          placeholder="One sentence explaining your reasoning..."
          disabled={disabled}
          className="rationale-input"
          rows={2}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={disabled || !selectedAnswer.trim()}
        className="btn-primary submit-btn"
      >
        Submit Answer
      </button>
    </div>
  );
}
