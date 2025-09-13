import { useState, useCallback } from 'react';

export const useNormalSudoku = () => {
  // Generate default table (empty 9x9 grid)
  const generateDefaultTable = () => {
    const table = {};
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        table[`${row}-${col}`] = null;
      }
    }
    return table;
  };

  // State management
  const [table, setTable] = useState(generateDefaultTable());
  const [selectedCell, setSelectedCell] = useState('4-4'); // Start in center
  const [question, setQuestion] = useState({});
  const [isQuestionMode, setIsQuestionMode] = useState(true);
  const [invalidCells, setInvalidCells] = useState(new Set());
  const [defaultTable] = useState(generateDefaultTable());

  // Function to validate Sudoku rules and find invalid cells
  const validateNormalSudoku = useCallback((currentTable) => {
    const invalidCellsSet = new Set();

    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowValues = {};
      for (let col = 0; col < 9; col++) {
        const key = `${row}-${col}`;
        const value = currentTable[key];
        if (value) {
          if (rowValues[value]) {
            invalidCellsSet.add(key);
            invalidCellsSet.add(rowValues[value]);
          } else {
            rowValues[value] = key;
          }
        }
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colValues = {};
      for (let row = 0; row < 9; row++) {
        const key = `${row}-${col}`;
        const value = currentTable[key];
        if (value) {
          if (colValues[value]) {
            invalidCellsSet.add(key);
            invalidCellsSet.add(colValues[value]);
          } else {
            colValues[value] = key;
          }
        }
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxValues = {};
        for (let row = boxRow * 3; row < (boxRow + 1) * 3; row++) {
          for (let col = boxCol * 3; col < (boxCol + 1) * 3; col++) {
            const key = `${row}-${col}`;
            const value = currentTable[key];
            if (value) {
              if (boxValues[value]) {
                invalidCellsSet.add(key);
                invalidCellsSet.add(boxValues[value]);
              } else {
                boxValues[value] = key;
              }
            }
          }
        }
      }
    }

    setInvalidCells(invalidCellsSet);
    return invalidCellsSet;
  }, []);

  return {
    // State
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
    
    // Functions
    validateNormalSudoku
  };
};