import React from 'react';

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
      <h1 className="text-3xl text-center">Sudoku Board</h1>
      {isQuestionMode && (
        <p className="text-center py-2">
          <span className="text-red-500 text-2xl ">
            Press this button after entering your question
          </span>
          <button
            className="border p-2 m-1 ml-5 text-white text-sm"
            onClick={questionsEntered}
          >
            Done
          </button>
        </p>
      )}
      {isHintMode && (
        <p className="text-center py-2">
          <span className="text-blue-500 text-xl">
            Hint Mode: Shift+Click to select cells, then create cages with sums
          </span>
          <br />
          <button
            className="border p-2 m-1 bg-blue-500 text-white"
            onClick={createCage}
            disabled={selectedCells.size === 0}
          >
            Create Cage ({selectedCells.size} cells)
          </button>
          <button
            className="border p-2 m-1 bg-green-500 text-white"
            onClick={finishHints}
          >
            Finish Adding Hints
          </button>
        </p>
      )}
      {!isQuestionMode && !isHintMode && (
        <p className="text-center py-2">
          <span className="text-green-500 text-xl">
            Solve the puzzle! Respect the cage sums.
          </span>
        </p>
      )}
    </>
  );
};

export default ModeIndicator;
