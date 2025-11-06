# Guess the CHD

**Congenital Heart Disease Pattern Recognition for Medical Students**

A cognitive learning tool that trains second-year medical students to recognize the 12 most important congenital heart diseases using progressive disclosure, spaced repetition, and immediate contrastive feedback—the way they'll encounter them on Step 1.

---

## The Vision

Medical education drowns students in detail before they develop schemas. **Guess the CHD** inverts that: pattern first, detail later. The five-rung ladder mirrors clinical reality—you never get all the data at once. You build a hypothesis with fragments, then refine it.

### Pedagogical Principles

1. **Desirable difficulty** — R1 forces schema activation before confirmation
2. **Contrastive learning** — Nearest distractor = the distinction experts make effortlessly
3. **Retrieval practice** — Active recall > passive review
4. **Spacing** — Weak items resurface = durable learning

This isn't a quiz. It's **deliberate practice for pattern recognition**.

---

## Features

### The 5-Rung Ladder

Each case presents clues progressively:

- **R1: Whisper** (≤12 words) — The tiniest hint
- **R2: Pathophys** — One vital physiologic cue
- **R3: Image** — CXR crop with a classic sign
- **R4: Audio** — ≤2s heart sound snippet
- **R5: Confirm** — Full CXR or association pearl

Students can submit their diagnosis at any rung. Earlier recognition = more points.

### Smart Scoring

- R1 answer: **100 pts**
- R2 answer: **80 pts**
- R3 answer: **60 pts**
- R4 answer: **40 pts**
- R5 answer: **20 pts**
- Rationale bonus: **+10 pts**

Partial credit for correct category, wrong diagnosis. No penalties—exploration is encouraged.

### Spaced Repetition

Missed cases resurface after 1, 3, then 7 new cases (simplified Leitner algorithm). Research shows spacing > massing for long-term retention.

### Immediate Feedback

Every answer includes:
- Whether it's correct
- Full explanation with physiology
- **Nearest distractor** contrast ("Why NOT X?")
- Clinical pearl (association/embryology hook)

---

## Cases Covered (12 Total)

### Acyanotic Shunts
- Atrial Septal Defect (ASD)
- Ventricular Septal Defect (VSD)
- Patent Ductus Arteriosus (PDA)

### Acyanotic Obstructive
- Coarctation of the Aorta (CoA)
- Pulmonic Stenosis (PS)

### Cyanotic Conotruncal
- Tetralogy of Fallot (TOF)
- d-Transposition of Great Arteries (TGA)
- Truncus Arteriosus

### Cyanotic Other
- Total Anomalous Pulmonary Venous Return (TAPVR)
- AV Septal Defect (AVSD)
- Ebstein Anomaly
- Hypoplastic Left Heart Syndrome (HLHS)

---

## Tech Stack

**Why These Choices?**

- **React + Vite + TypeScript** — Component model maps 1:1 to rung ladder; fast refresh for rapid iteration; type safety prevents clinical content errors
- **No backend (initially)** — Local storage = zero latency, works offline, no auth complexity
- **Static deployment** — Vercel/GitHub Pages = free, instant, global CDN

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/stevetodman/guessthechd.git
cd guessthechd

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build for Production

```bash
npm run build
```

The optimized static site will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
guessthechd/
├── public/
│   ├── cases/              # Media assets (CXR images, audio)
│   │   ├── asd/
│   │   ├── vsd/
│   │   └── ...
│   └── heart.svg           # Favicon
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx   # Main game orchestrator
│   │   ├── RungDisplay.tsx # Renders R1-R5
│   │   ├── AnswerPanel.tsx # Answer submission
│   │   ├── ScoreCard.tsx   # Progress tracking
│   │   └── LandingPage.tsx # Intro + start
│   ├── data/
│   │   └── cases.ts        # All 12 CHD cases (single source of truth)
│   ├── hooks/
│   │   └── useGameState.ts # Game state management
│   ├── utils/
│   │   ├── scoring.ts      # Points calculation
│   │   └── spacedRepetition.ts # Leitner algorithm
│   ├── types.ts            # TypeScript definitions
│   ├── App.tsx             # Root component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repo
4. Vercel auto-detects Vite → Click "Deploy"
5. Done! Your app is live at `https://your-project.vercel.app`

### Option 2: GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `vite.config.ts` to set the base path:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/guessthechd/', // Match your repo name
   })
   ```

3. Add deploy scripts to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repo settings (Settings → Pages → Source: `gh-pages` branch)

Your app will be live at `https://yourusername.github.io/guessthechd/`

### Option 3: Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git" → Choose your repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

---

## Adding Media Assets

Clinical images and audio files are stored in `public/cases/[case-id]/`.

### Required Files per Case

- `r3-crop.jpg` — CXR crop showing classic sign
- `r4-audio.mp3` — Heart sound (≤2 seconds)
- `r5-full.jpg` — Full CXR or confirmatory image

See `public/cases/README.md` for detailed specifications.

**Note:** The app works without media (shows placeholders). Focus on content first, add media later.

---

## Development

### Adding a New Case

1. **Update `src/data/cases.ts`:**
   ```typescript
   {
     id: 'new-case',
     name: 'New Case Name',
     category: 'acyanotic-shunt', // or other category
     recognition: '...',
     hook: '...',
     nearestDistractor: { name: '...', whyNot: '...' },
     rungs: [
       { type: 'whisper', content: '...' },
       { type: 'pathophys', content: '...' },
       { type: 'image', content: '...', media: { url: '/cases/new-case/r3-crop.jpg' } },
       { type: 'audio', content: '...', media: { url: '/cases/new-case/r4-audio.mp3' } },
       { type: 'confirmatory', content: '...' },
     ],
     reveal: '...',
   }
   ```

2. **Add media files** to `public/cases/new-case/`

3. **Update type map** in `src/types.ts` if needed (for answer matching)

### Modifying Scoring

Edit constants in `src/types.ts`:
```typescript
export const RUNG_POINTS = [100, 80, 60, 40, 20]; // Adjust as needed
export const RATIONALE_BONUS = 10;
```

### Customizing Spaced Repetition

Edit intervals in `src/utils/spacedRepetition.ts`:
```typescript
const REVIEW_INTERVALS = [1, 3, 7]; // Cases until review
```

---

## Design Philosophy

### Why Progressive Disclosure?

Real clinical reasoning starts with minimal data. The rung system forces students to:
1. Activate their schema (R1)
2. Refine with physiology (R2)
3. Confirm with imaging/audio (R3-R4)
4. Lock in with associations (R5)

This mirrors Step 1 vignettes and real patient encounters.

### Why Contrastive Learning?

Experts distinguish TOF from isolated PS instantly. Novices confuse them. The "nearest distractor" feedback builds those expert contrasts explicitly.

### Why Spaced Repetition?

Cramming works for tests, not retention. Spacing + retrieval practice = durable knowledge.

---

## Future Enhancements

- [ ] Analytics dashboard (track weak categories)
- [ ] Custom case sets (user-created content)
- [ ] Timed mode (Step 1 pressure simulation)
- [ ] Mobile app (React Native)
- [ ] Multiplayer/competitive mode
- [ ] Integration with Anki (export missed cases)

---

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see LICENSE file for details.

---

## Acknowledgments

Clinical content adapted from standard Step 1 resources. This tool is for **educational purposes only** and is not a substitute for comprehensive medical training.

---

## Contact

Questions? Open an issue on GitHub or reach out to the maintainers.

**Remember:** This isn't about memorizing lists. It's about building clinical intuition—one case, one pattern, one "aha!" moment at a time.
