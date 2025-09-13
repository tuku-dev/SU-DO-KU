import React, { useEffect, useState } from 'react';
import { baseClasses, buttonVariants } from '../../../../shared/utils/cssClasses';

const ControlButtons = ({
  variant = 'normal', // 'normal' or 'killer'
  isQuestionMode,
  isHintMode = false,
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
  const [selectedCell, setSelectedCell] = useState('4-4');

  // Listen for cell selection changes (for sudoku)
  useEffect(() => {
    if (variant === 'normal') {
      const handleCellSelection = (event) => {
        if (event.detail && event.detail.cellKey) {
          setSelectedCell(event.detail.cellKey);
        }
      };

      window.addEventListener('cellSelected', handleCellSelection);
      return () => {
        window.removeEventListener('cellSelected', handleCellSelection);
      };
    }
  }, [variant]);

  // Listen for the finish question mode event (for sudoku)
  useEffect(() => {
    if (variant === 'normal') {
      const handleFinishQuestionMode = () => {
        setIsQuestionMode(false);
      };

      window.addEventListener('finishQuestionMode', handleFinishQuestionMode);
      return () => {
        window.removeEventListener('finishQuestionMode', handleFinishQuestionMode);
      };
    }
  }, [setIsQuestionMode, variant]);

  // Specialized button classes with dark mode support (for killer sudoku)
  const numberButtonClasses = `h-12 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 font-semibold text-lg text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800 hover:border-blue-400 dark:hover:border-blue-500 active:bg-blue-100 dark:active:bg-blue-700 ${baseClasses.buttonBase} ${baseClasses.shadow}`;
  
  // Control button variations with dark mode (for killer sudoku)
  const controlButtonBase = `px-4 py-2 border-2 ${baseClasses.buttonBase} ${baseClasses.shadow}`;
  const grayButton = `${controlButtonBase} bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500`;
  const orangeButton = `${controlButtonBase} bg-orange-100 dark:bg-orange-800 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-700 hover:border-orange-400 dark:hover:border-orange-500`;
  const greenButton = `${controlButtonBase} bg-green-100 dark:bg-green-800 border-green-300 dark:border-green-600 text-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700 hover:border-green-400 dark:hover:border-green-500`;
  const yellowButton = `${controlButtonBase} bg-yellow-100 dark:bg-yellow-800 border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-500`;
  
  // Layout classes
  const containerWidth = "w-[540px] max-w-full";

  // Render number buttons based on variant
  const renderNumberButtons = () => {
    if (variant === 'killer') {
      return (
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
      );
    } else {
      // Sudoku
      return (
        <div className="grid grid-cols-9 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className={`${buttonVariants.primary} w-12 h-12 text-lg font-bold`}
              onClick={() => {
                replaceValue(selectedCell, num);
              }}
            >
              {num}
            </button>
          ))}
        </div>
      );
    }
  };

  // Render control buttons based on variant
  const renderControlButtons = () => {
    if (variant === 'killer') {
      return (
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
      );
    } else {
      // Sudoku
      return (
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className={buttonVariants.secondary}
            onClick={() => {
              replaceValue(selectedCell, null);
            }}
          >
            Clear Cell
          </button>

          <button
            className={buttonVariants.danger}
            onClick={resetGame}
          >
            Reset Game
          </button>

          {!isQuestionMode && (
            <button
              className={buttonVariants.success}
              onClick={solvePuzzle}
            >
              Auto Solve
            </button>
          )}

          {!isQuestionMode && (
            <button
              className={buttonVariants.secondary}
              onClick={() => {
                // Reset answers but keep questions
                const newTable = { ...defaultTable };
                Object.keys(defaultTable).forEach(key => {
                  // Keep question values, clear solve values
                  newTable[key] = defaultTable[key];
                });
                setTable(newTable);
                setInvalidCells(new Set());
              }}
            >
              Reset Answers
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Number buttons */}
      {renderNumberButtons()}
      
      {/* Control buttons */}
      {renderControlButtons()}
    </div>
  );
};

export default ControlButtons;