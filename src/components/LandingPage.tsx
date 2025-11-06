/**
 * LandingPage: Introduction and game start
 */

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="landing-page">
      <header className="hero">
        <h1>Guess the CHD</h1>
        <p className="subtitle">
          Congenital Heart Disease Pattern Recognition for Step 1
        </p>
      </header>

      <section className="intro">
        <h2>Master Pattern Recognition in Minutes, Not Hours</h2>
        <p>
          Learn to recognize 12 essential congenital heart defects the way
          you'll see them on Step 1: with minimal clinical cues, a CXR when
          helpful, and (optionally) a brief heart sound.
        </p>

        <div className="how-it-works">
          <h3>How It Works: The 5-Rung Ladder</h3>
          <div className="rungs-preview">
            <div className="rung-preview">
              <strong>R1: Whisper</strong>
              <p>≤12 words. The tiniest hint.</p>
            </div>
            <div className="rung-preview">
              <strong>R2: Pathophys</strong>
              <p>One vital physiologic cue.</p>
            </div>
            <div className="rung-preview">
              <strong>R3: Image</strong>
              <p>CXR crop with a classic sign.</p>
            </div>
            <div className="rung-preview">
              <strong>R4: Audio</strong>
              <p>≤2s heart sound snippet.</p>
            </div>
            <div className="rung-preview">
              <strong>R5: Confirm</strong>
              <p>Full CXR or association pearl.</p>
            </div>
          </div>
        </div>

        <div className="objectives">
          <h3>Learning Objectives</h3>
          <ul>
            <li>
              <strong>Rapid classification:</strong> Identify the defect category
              (acyanotic shunt, obstructive, cyanotic conotruncal, etc.)
            </li>
            <li>
              <strong>Decisive clues:</strong> Recognize timing of heart sounds,
              classic CXR silhouettes, and duct-dependent physiology cues
            </li>
            <li>
              <strong>Distractor discrimination:</strong> Articulate why NOT the
              nearest distractor, focusing on timing, site, and physiology
            </li>
          </ul>
        </div>

        <div className="scoring">
          <h3>Scoring</h3>
          <p>
            Earlier recognition earns more points. Near-misses (correct category,
            wrong diagnosis) earn partial credit. Adding a "because..."
            rationale earns a bonus. Missed cases resurface later for spaced
            repetition.
          </p>
          <ul>
            <li>R1 answer: 100 pts</li>
            <li>R2 answer: 80 pts</li>
            <li>R3 answer: 60 pts</li>
            <li>R4 answer: 40 pts</li>
            <li>R5 answer: 20 pts</li>
            <li>Rationale bonus: +10 pts</li>
          </ul>
        </div>

        <div className="cases-covered">
          <h3>Cases (12 total)</h3>
          <div className="categories">
            <div className="category">
              <h4>Acyanotic Shunts</h4>
              <ul>
                <li>Atrial Septal Defect (ASD)</li>
                <li>Ventricular Septal Defect (VSD)</li>
                <li>Patent Ductus Arteriosus (PDA)</li>
              </ul>
            </div>
            <div className="category">
              <h4>Acyanotic Obstructive</h4>
              <ul>
                <li>Coarctation of the Aorta (CoA)</li>
                <li>Pulmonic Stenosis (PS)</li>
              </ul>
            </div>
            <div className="category">
              <h4>Cyanotic Conotruncal</h4>
              <ul>
                <li>Tetralogy of Fallot (TOF)</li>
                <li>d-Transposition (TGA)</li>
                <li>Truncus Arteriosus</li>
              </ul>
            </div>
            <div className="category">
              <h4>Cyanotic Other</h4>
              <ul>
                <li>Total Anomalous Pulmonary Venous Return (TAPVR)</li>
                <li>AV Septal Defect (AVSD)</li>
                <li>Ebstein Anomaly</li>
                <li>Hypoplastic Left Heart (HLHS)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <button onClick={onStart} className="btn-primary start-btn">
        Start Learning →
      </button>

      <footer className="disclaimer">
        <p>
          <em>
            Educational tool for Step 1 preparation. Recognition and first-step
            stabilization only. Subspecialty management is out of scope.
          </em>
        </p>
      </footer>
    </div>
  );
}
