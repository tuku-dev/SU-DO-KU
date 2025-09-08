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
    <div className="flex flex-col items-center space-y-4">
      {/* Number buttons */}
      <div className="grid grid-cols-9 gap-2 w-[540px] max-w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            className="h-12 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-lg text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800 hover:border-blue-400 dark:hover:border-blue-500 active:bg-blue-100 dark:active:bg-blue-700 transition-all duration-200 shadow-sm"
            key={num}
            onClick={() => replaceValue(num)}
          >
            {num}
          </button>
        ))}
      </div>
      
      {/* Control buttons */}
      <div className="flex flex-wrap justify-center gap-2 w-[540px] max-w-full">
        <button 
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm" 
          onClick={() => replaceValue("")}
        >
          🗑️ Clear
        </button>
        <button 
          className="px-4 py-2 bg-orange-100 dark:bg-orange-800 border-2 border-orange-300 dark:border-orange-600 rounded-lg font-medium text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-200 shadow-sm" 
          onClick={() => resetGame()}
        >
          🔄 {isQuestionMode ? "Reset All" : "Reset Answers"}
        </button>
        {!isQuestionMode && !isHintMode && (
          <button
            className="px-4 py-2 bg-green-100 dark:bg-green-800 border-2 border-green-300 dark:border-green-600 text-green-800 dark:text-green-100 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-200 shadow-sm"
            onClick={solvePuzzle}
          >
            🧠 Auto Solve
          </button>
        )}
        {!isQuestionMode && !isHintMode && (
          <button
            className="px-4 py-2 bg-yellow-100 dark:bg-yellow-800 border-2 border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-100 rounded-lg font-medium hover:bg-yellow-200 dark:hover:bg-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-200 shadow-sm"
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
