import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNormalSudoku } from "./hooks/useNormalSudoku";
import { useNormalSudokuActions } from "./hooks/useNormalSudokuActions";
import { ModeIndicator, ControlButtons } from "../shared";
import NormalSudokuGrid from "./components/NormalSudokuGrid";

function NormalSudokuGame() {
  const navigate = useNavigate();
  
  const normalSudokuState = useNormalSudoku();
  
  const {
    table,
    setTable,
    selectedCell,
    setSelectedCell,
    question,
    setQuestion,
    isQuestionMode,
    setIsQuestionMode,
    invalidCells,
    setInvalidCells,
    defaultTable,
    validateNormalSudoku
  } = normalSudokuState;

  const normalSudokuActions = useNormalSudokuActions({
    table,
    setTable,
    setSelectedCell,
    question,
    setQuestion,
    isQuestionMode,
    setIsQuestionMode,
    setInvalidCells,
    validateNormalSudoku,
    defaultTable
  });
  
  const {
    replaceValue,
    handleCellClick,
    questionsEntered,
    resetGame,
    solvePuzzle
  } = normalSudokuActions;

  // Global event handlers for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return; // Don't interfere with input fields
      
      const { key } = e;
      
      // Number keys for input
      if (key >= '1' && key <= '9') {
        e.preventDefault();
        replaceValue(selectedCell, parseInt(key));
      }
      
      // Backspace/Delete to clear cell
      if (key === 'Backspace' || key === 'Delete') {
        e.preventDefault();
        replaceValue(selectedCell, null);
      }
      
      // Arrow keys for navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
        const [row, col] = selectedCell.split('-').map(Number);
        let newRow = row;
        let newCol = col;
        
        switch (key) {
          case 'ArrowUp':
            newRow = Math.max(0, row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(8, row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(8, col + 1);
            break;
        }
        
        setSelectedCell(`${newRow}-${newCol}`);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, setSelectedCell, replaceValue]);

  return (
    <div className="min-h-screen py-8 transition-colors duration-300">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
      >
        ← Home
      </button>
      
      <div className="container px-4 mx-auto">
        <ModeIndicator
          variant="normal"
          isQuestionMode={isQuestionMode}
          questionsEntered={questionsEntered}
        />
        
        <div className="flex justify-center mb-6">
          <NormalSudokuGrid
            table={table}
            selectedCell={selectedCell}
            question={question}
            isQuestionMode={isQuestionMode}
            invalidCells={invalidCells}
            handleCellClick={handleCellClick}
          />
        </div>
        
        <ControlButtons
          variant="normal"
          isQuestionMode={isQuestionMode}
          replaceValue={replaceValue}
          resetGame={resetGame}
          solvePuzzle={solvePuzzle}
          defaultTable={defaultTable}
          setIsQuestionMode={setIsQuestionMode}
          setTable={setTable}
          setInvalidCells={setInvalidCells}
        />
      </div>
    </div>
  );
}

export default NormalSudokuGame;