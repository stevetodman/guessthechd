/**
 * RungDisplay: Renders a single rung (R1-R5)
 *
 * Handles text, images, and audio
 */

import { Rung } from '../types';

interface RungDisplayProps {
  rung: Rung;
  rungNumber: number;
}

export function RungDisplay({ rung, rungNumber }: RungDisplayProps) {
  const rungLabels = ['R1: Whisper', 'R2: Pathophys', 'R3: Image', 'R4: Audio', 'R5: Confirm'];

  return (
    <div className={`rung rung-${rung.type}`}>
      <div className="rung-header">
        <span className="rung-label">{rungLabels[rungNumber - 1]}</span>
      </div>

      <div className="rung-content">
        <p>{rung.content}</p>

        {rung.media && rung.type === 'image' && (
          <div className="media-container">
            <img
              src={rung.media.url}
              alt={rung.media.alt || 'Clinical image'}
              className="clinical-image"
            />
            {rung.media.caption && (
              <p className="caption">{rung.media.caption}</p>
            )}
          </div>
        )}

        {rung.media && rung.type === 'audio' && (
          <div className="media-container">
            <audio controls src={rung.media.url} className="clinical-audio">
              Your browser does not support the audio element.
            </audio>
            {rung.media.caption && (
              <p className="caption">{rung.media.caption}</p>
            )}
          </div>
        )}

        {rung.media && rung.type === 'confirmatory' && rung.media.url.endsWith('.jpg') && (
          <div className="media-container">
            <img
              src={rung.media.url}
              alt={rung.media.alt || 'Confirmatory image'}
              className="clinical-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}
