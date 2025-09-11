import React from 'react';
import { textClasses, buttonVariants } from '../utils/cssClasses';

const ModeIndicator = ({
  isQuestionMode,
  isHintMode,
  selectedCells,
  questionsEntered,
  createCage,
  finishHints
}) => {
  return (
    <>
      <h1 className={`${textClasses["3xl"]} text-center`}>Sudoku Board</h1>
      {isQuestionMode && (
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
      {isHintMode && (
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
      {!isQuestionMode && !isHintMode && (
        <p className={textClasses.center}>
          <span className={`${textClasses.green} ${textClasses.xl}`}>
            Solve the puzzle! Respect the cage sums.
          </span>
        </p>
      )}
    </>
  );
};

export default ModeIndicator;
