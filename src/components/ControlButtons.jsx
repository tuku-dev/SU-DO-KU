import React from 'react';

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
  return (
    <div className="buttons mx-auto max-w-fit mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          className="border p-2 m-1"
          key={num}
          onClick={() => replaceValue(num)}
        >
          {num}
        </button>
      ))}
      <br />
      <button className="border p-2 m-1" onClick={() => replaceValue("")}>
        Clear
      </button>
      <button className="border p-2 m-1" onClick={() => resetGame()}>
        {isQuestionMode ? "Reset All" : "Reset Answers"}
      </button>
      {!isQuestionMode && !isHintMode && (
        <button
          className="border p-2 m-1 bg-green-500 text-white hover:bg-green-600"
          onClick={solvePuzzle}
        >
          Auto Solve
        </button>
      )}
      {!isQuestionMode && !isHintMode && (
        <button
          className="border p-2 m-1 bg-yellow-600"
          onClick={() => {
            setIsQuestionMode(true);
            setTable(defaultTable);
            setQuestion(defaultTable);
            setInvalidCells(new Set());
            setCages([]);
          }}
        >
          New Question
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
