import React, { useState } from 'react';
import HomePage from './HomePage';
import { SudokuGame } from '../games/sudoku';
import { ThemeToggle } from '../shared';

const GameRouter = () => {
  const [currentGame, setCurrentGame] = useState(null);

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
  };

  const handleBackToHome = () => {
    setCurrentGame(null);
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'sudoku':
        return <SudokuGame />;
      default:
        return <HomePage onGameSelect={handleGameSelect} />;
    }
  };

  return (
    <div className="relative">
      {/* Theme Toggle - Always visible */}
      <ThemeToggle />
      
      {/* Back to Home Button - Only visible when in a game */}
      {currentGame && (
        <button
          onClick={handleBackToHome}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          ← Home
        </button>
      )}
      
      {/* Current View */}
      {renderGame()}
    </div>
  );
};

export default GameRouter;
