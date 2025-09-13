import { useCallback, useEffect } from 'react';

export const useNormalSudokuActions = ({
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
}) => {
  
  // Replace value in a cell
  const replaceValue = useCallback((cellKey, value) => {
    if (!cellKey) return;
    
    const newTable = { ...table };
    
    if (isQuestionMode) {
      // In question mode, set question values
      const newQuestion = { ...question };
      if (value === null) {
        delete newQuestion[cellKey];
        delete newTable[cellKey];
      } else {
        newQuestion[cellKey] = value;
        newTable[cellKey] = value;
      }
      setQuestion(newQuestion);
      setTable(newTable);
    } else {
      // In solve mode, don't modify question cells
      if (question[cellKey]) return; // Can't modify question cells
      
      if (value === null) {
        newTable[cellKey] = null;
      } else {
        newTable[cellKey] = value;
      }
      setTable(newTable);
      
      // Validate the new table state
      setTimeout(() => validateNormalSudoku(newTable), 0);
    }
    
    return newTable;
  }, [isQuestionMode, question, validateNormalSudoku, table, setTable, setQuestion]);

  // Handle cell click
  const handleCellClick = useCallback((cellKey) => {
    setSelectedCell(cellKey);
  }, [setSelectedCell]);

  // Check how many questions have been entered
  const questionsEntered = Object.keys(question).length;

  // Reset game to empty state
  const resetGame = useCallback(() => {
    setTable({ ...defaultTable });
    setQuestion({});
    setIsQuestionMode(true);
    setInvalidCells(new Set());
  }, [defaultTable, setTable, setQuestion, setIsQuestionMode, setInvalidCells]);

  // Simple backtracking solver for Sudoku
  const solvePuzzle = useCallback(() => {
    const solveBacktrack = (currentTable) => {
      // Find next empty cell
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const key = `${row}-${col}`;
          if (!currentTable[key]) {
            // Try numbers 1-9
            for (let num = 1; num <= 9; num++) {
              currentTable[key] = num;
              
              // Check if this placement is valid
              const isValid = isValidPlacement(currentTable, row, col, num);
              
              if (isValid) {
                // Recursively solve the rest
                if (solveBacktrack(currentTable)) {
                  return true;
                }
              }
              
              // Backtrack
              currentTable[key] = null;
            }
            return false; // No valid number found
          }
        }
      }
      return true; // All cells filled
    };

    const isValidPlacement = (currentTable, row, col, num) => {
      // Check row
      for (let c = 0; c < 9; c++) {
        if (c !== col && currentTable[`${row}-${c}`] === num) {
          return false;
        }
      }
      
      // Check column
      for (let r = 0; r < 9; r++) {
        if (r !== row && currentTable[`${r}-${col}`] === num) {
          return false;
        }
      }
      
      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          if ((r !== row || c !== col) && currentTable[`${r}-${c}`] === num) {
            return false;
          }
        }
      }
      
      return true;
    };

    const tableToSolve = { ...table };
    if (solveBacktrack(tableToSolve)) {
      setTable(tableToSolve);
      validateNormalSudoku(tableToSolve);
    }
  }, [table, setTable, validateNormalSudoku]);

  // Validate the table whenever it changes
  useEffect(() => {
    if (!isQuestionMode) {
      validateNormalSudoku(table);
    }
  }, [table, validateNormalSudoku, isQuestionMode]);

  return {
    replaceValue,
    handleCellClick,
    questionsEntered,
    resetGame,
    solvePuzzle
  };
};