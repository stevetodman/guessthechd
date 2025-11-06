/**
 * App: Root component
 */

import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { GameBoard } from './components/GameBoard';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {!gameStarted ? (
        <LandingPage onStart={() => setGameStarted(true)} />
      ) : (
        <GameBoard />
      )}
    </div>
  );
}

export default App;
