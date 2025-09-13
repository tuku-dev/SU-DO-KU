import React from 'react';
import { textClasses, buttonVariants } from '../../../../shared/utils/cssClasses';

const ModeIndicator = ({
  variant = 'normal', // 'normal' or 'killer'
  isQuestionMode,
  isHintMode = false,
  selectedCells,
  questionsEntered,
  createCage,
  finishHints
}) => {
  const gameTitle = variant === 'killer' ? 'Killer Sudoku Board' : 'Sudoku';

  return (
    <div className="text-center mb-8">
      <h1 className={`${textClasses["3xl"]} text-center`}>{gameTitle}</h1>
      
      <div className="mt-4">
        {isQuestionMode && variant === 'killer' && (
          <p className={textClasses.center}>
            <span className={`${textClasses.red} ${textClasses["2xl"]}`}>
              Press this button after entering your question
            </span>
            <button
              className={`${buttonVariants.modeButton} text-white text-sm ml-5`}
              onClick={questionsEntered}
            >
              Done
            </button>
          </p>
        )}

        {isQuestionMode && variant === 'normal' && (
          <div className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">📝</span>
              <span className="font-semibold text-blue-800 dark:text-blue-200">Question Mode Active</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Enter the initial puzzle numbers (given clues)
            </p>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Numbers entered: <span className="font-bold">{questionsEntered}</span>
            </div>
            <div className="mt-3">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                onClick={() => {
                  // This will be handled by the parent component
                  window.dispatchEvent(new CustomEvent('finishQuestionMode'));
                }}
              >
                Done - Start Solving
              </button>
            </div>
          </div>
        )}

        {isHintMode && variant === 'killer' && (
          <p className={textClasses.center}>
            <span className={`${textClasses.blue} ${textClasses.xl}`}>
              Hint Mode: Shift+Click to select cells, then create cages with sums
            </span>
            <br />
            <button
              className={`${buttonVariants.modeButton} ${buttonVariants.primary}`}
              onClick={createCage}
              disabled={selectedCells.size === 0}
            >
              Create Cage ({selectedCells.size} cells)
            </button>
            <button
              className={`${buttonVariants.modeButton} ${buttonVariants.success}`}
              onClick={finishHints}
            >
              Finish Adding Hints
            </button>
          </p>
        )}

        {!isQuestionMode && !isHintMode && variant === 'killer' && (
          <p className={textClasses.center}>
            <span className={`${textClasses.green} ${textClasses.xl}`}>
              Solve the puzzle! Respect the cage sums.
            </span>
          </p>
        )}

        {!isQuestionMode && variant === 'normal' && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">✅</span>
              <span className="font-semibold text-green-800 dark:text-green-200">Solve Mode Active</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Complete the puzzle following standard Sudoku rules
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeIndicator;