import React from 'react';
import { baseClasses } from '../../../shared/utils/cssClasses';

const ControlButtons = ({
  isQuestionMode,
  isHintMode,
  replaceValue,
  resetGame,
  solvePuzzle,
  defaultTable,
  setIsQuestionMode,
  setTable,
  setQuestion,
  setInvalidCells,
  setCages
}) => {
  // Specialized button classes with dark mode support
  const numberButtonClasses = `h-12 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 font-semibold text-lg text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800 hover:border-blue-400 dark:hover:border-blue-500 active:bg-blue-100 dark:active:bg-blue-700 ${baseClasses.buttonBase} ${baseClasses.shadow}`;
  
  // Control button variations with dark mode
  const controlButtonBase = `px-4 py-2 border-2 ${baseClasses.buttonBase} ${baseClasses.shadow}`;
  const grayButton = `${controlButtonBase} bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500`;
  const orangeButton = `${controlButtonBase} bg-orange-100 dark:bg-orange-800 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-700 hover:border-orange-400 dark:hover:border-orange-500`;
  const greenButton = `${controlButtonBase} bg-green-100 dark:bg-green-800 border-green-300 dark:border-green-600 text-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700 hover:border-green-400 dark:hover:border-green-500`;
  const yellowButton = `${controlButtonBase} bg-yellow-100 dark:bg-yellow-800 border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-500`;
  
  // Layout classes
  const containerWidth = "w-[540px] max-w-full";
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Number buttons */}
      <div className={`grid grid-cols-9 gap-2 ${containerWidth}`}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            className={numberButtonClasses}
            key={num}
            onClick={() => replaceValue(num)}
          >
            {num}
          </button>
        ))}
      </div>
      
      {/* Control buttons */}
      <div className={`flex flex-wrap justify-center gap-2 ${containerWidth}`}>
        <button 
          className={grayButton}
          onClick={() => replaceValue("")}
        >
          🗑️ Clear
        </button>
        <button 
          className={orangeButton}
          onClick={() => resetGame()}
        >
          🔄 {isQuestionMode ? "Reset All" : "Reset Answers"}
        </button>
        {!isQuestionMode && !isHintMode && (
          <button
            className={greenButton}
            onClick={solvePuzzle}
          >
            🧠 Auto Solve
          </button>
        )}
        {!isQuestionMode && !isHintMode && (
          <button
            className={yellowButton}
            onClick={() => {
              setIsQuestionMode(true);
              setTable(defaultTable);
              setQuestion(defaultTable);
              setInvalidCells(new Set());
              setCages([]);
            }}
          >
            ✨ New Puzzle
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlButtons;
