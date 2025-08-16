import { useCallback, useEffect } from 'react';

export const useSudokuActions = ({
  table,
  setTable,
  selectedCell,
  setSelectedCell,
  question,
  setQuestion,
  isQuestionMode,
  setIsQuestionMode,
  isHintMode,
  setIsHintMode,
  selectedCells,
  setSelectedCells,
  cages,
  setShowSumDialog,
  setSumValue,
  setInvalidCells,
  validateSudoku,
  defaultTable
}) => {
  
  const replaceValue = useCallback(
    (num) => {
      // Don't allow value changes in hint mode
      if (isHintMode) return;
      
      const row = selectedCell[0];
      const col = selectedCell[1];

      // If not in question mode and trying to edit a question cell, prevent it
      if (!isQuestionMode && question[row][col] !== "") {
        console.log(
          `Cannot edit question cell at [${row}, ${col}] with value "${question[row][col]}"`
        );
        return;
      }

      setTable((prevTable) => {
        const newTable = prevTable.map((row) => [...row]);
        newTable[row][col] = num;

        // Validate the new table state
        setTimeout(() => validateSudoku(newTable), 0);

        return newTable;
      });
    },
    [selectedCell, isQuestionMode, question, validateSudoku, isHintMode, setTable]
  );

  const handleCellClick = useCallback((rowIndex, cellIndex, event) => {
    if (isHintMode) {
      // In hint mode, handle multi-selection
      const cellKey = `${rowIndex}-${cellIndex}`;
      
      if (event?.shiftKey) {
        setSelectedCells(prev => {
          const newSet = new Set(prev);
          if (newSet.has(cellKey)) {
            newSet.delete(cellKey);
          } else {
            newSet.add(cellKey);
          }
          return newSet;
        });
      } else {
        // Single click without shift - clear selection and select this cell
        setSelectedCells(new Set([cellKey]));
      }
    } else {
      // Normal mode - single cell selection
      setSelectedCell([rowIndex, cellIndex]);
    }
  }, [isHintMode, setSelectedCells, setSelectedCell]);

  const createCage = useCallback(() => {
    if (selectedCells.size === 0) return;
    setShowSumDialog(true);
  }, [selectedCells, setShowSumDialog]);

  const confirmCage = useCallback(() => {
    // This will be implemented in the main component
  }, []);

  const cancelCage = useCallback(() => {
    setShowSumDialog(false);
    setSumValue("");
  }, [setShowSumDialog, setSumValue]);

  const finishHints = useCallback(() => {
    setIsHintMode(false);
    setSelectedCells(new Set());
  }, [setIsHintMode, setSelectedCells]);

  const questionsEntered = useCallback(() => {
    // Create a proper deep copy of the table
    const questionCopy = table.map((row) => [...row]);
    setQuestion(questionCopy);
    setIsQuestionMode(false);
    setIsHintMode(true); // Enter hint mode after question submission
  }, [table, setQuestion, setIsQuestionMode, setIsHintMode]);

  const resetGame = useCallback(() => {
    if (isQuestionMode) {
      // If in question mode, reset everything
      setTable(defaultTable.map((row) => [...row]));
      setInvalidCells(new Set());
    } else {
      // If in answer mode, only reset answer cells (keep question cells)
      setTable((prevTable) => {
        const newTable = prevTable.map((row) => [...row]);
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (question[i][j] === "") {
              newTable[i][j] = "";
            } else {
              // Ensure question cells retain their values
              newTable[i][j] = question[i][j];
            }
          }
        }
        return newTable;
      });
      // Clear invalid cells after reset
      setTimeout(() => setInvalidCells(new Set()), 0);
    }
  }, [isQuestionMode, setTable, setInvalidCells, defaultTable, question]);

  // Auto-solver function using backtracking
  const solvePuzzle = useCallback(() => {
    // Create a copy of current table to work with
    const puzzleToSolve = table.map(row => [...row]);
    
    // Helper function to check if a number is valid in a position
    const isValidMove = (grid, row, col, num) => {
      // Check row constraint
      for (let j = 0; j < 9; j++) {
        if (j !== col && grid[row][j] === num) return false;
      }
      
      // Check column constraint
      for (let i = 0; i < 9; i++) {
        if (i !== row && grid[i][col] === num) return false;
      }
      
      // Check 3x3 box constraint
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if ((i !== row || j !== col) && grid[i][j] === num) return false;
        }
      }
      
      // Check cage constraint
      const cellKey = `${row}-${col}`;
      const cage = cages.find(cage => cage.cells.includes(cellKey));
      if (cage) {
        let currentSum = parseInt(num);
        let emptyCells = 0;
        
        cage.cells.forEach(cell => {
          const [r, c] = cell.split('-').map(Number);
          if (r !== row || c !== col) {
            if (grid[r][c] !== "") {
              currentSum += parseInt(grid[r][c]);
            } else {
              emptyCells++;
            }
          }
        });
        
        // If this would make the sum exceed the target, invalid
        if (currentSum > cage.sum) return false;
        
        // If this is the last empty cell in the cage, sum must match exactly
        if (emptyCells === 0 && currentSum !== cage.sum) return false;
      }
      
      return true;
    };
    
    // Backtracking solver
    const solve = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === "") {
            for (let num = 1; num <= 9; num++) {
              if (isValidMove(grid, row, col, num.toString())) {
                grid[row][col] = num.toString();
                
                if (solve(grid)) {
                  return true;
                }
                
                grid[row][col] = "";
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    // Attempt to solve
    if (solve(puzzleToSolve)) {
      setTable(puzzleToSolve);
      console.log("Puzzle solved!");
    } else {
      alert("This puzzle cannot be solved with the current constraints.");
    }
  }, [table, cages, setTable]);

  const moveSelectedCell = useCallback((deltaRow, deltaCol) => {
    setSelectedCell((prev) => {
      const newRow = Math.min(Math.max(prev[0] + deltaRow, 0), 8);
      const newCol = Math.min(Math.max(prev[1] + deltaCol, 0), 8);
      return [newRow, newCol];
    });
  }, [setSelectedCell]);

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "ArrowUp":
          moveSelectedCell(-1, 0);
          break;
        case "ArrowDown":
          moveSelectedCell(1, 0);
          break;
        case "ArrowLeft":
          moveSelectedCell(0, -1);
          break;
        case "ArrowRight":
          moveSelectedCell(0, 1);
          break;
        case "Backspace":
        case "Delete":
          replaceValue("");
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          replaceValue(event.key);
          break;
        default:
          break;
      }
    },
    [moveSelectedCell, replaceValue]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Validate the table whenever it changes
  useEffect(() => {
    validateSudoku(table);
  }, [table, validateSudoku]);

  // Function to edit a cage's sum
  const editCage = useCallback((cageId, newSum) => {
    const updatedCages = cages.map(cage => 
      cage.id === cageId 
        ? { ...cage, sum: parseInt(newSum) }
        : cage
    );
    // Need to update cages in the parent component
    // This will be handled in App.jsx
    return updatedCages;
  }, [cages]);

  // Function to delete a cage
  const deleteCage = useCallback((cageId) => {
    const updatedCages = cages.filter(cage => cage.id !== cageId);
    // Need to update cages in the parent component
    // This will be handled in App.jsx
    return updatedCages;
  }, [cages]);

  return {
    replaceValue,
    handleCellClick,
    createCage,
    confirmCage,
    cancelCage,
    finishHints,
    questionsEntered,
    resetGame,
    solvePuzzle,
    editCage,
    deleteCage
  };
};
