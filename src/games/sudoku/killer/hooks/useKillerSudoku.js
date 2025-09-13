import { useState, useCallback } from 'react';

const defaultTable = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

export const useKillerSudoku = () => {
  const [table, setTable] = useState(defaultTable);
  const [selectedCell, setSelectedCell] = useState([0, 0]);
  const [question, setQuestion] = useState(defaultTable);
  const [isQuestionMode, setIsQuestionMode] = useState(true);
  const [invalidCells, setInvalidCells] = useState(new Set());
  const [isHintMode, setIsHintMode] = useState(false);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [cages, setCages] = useState([]);
  const [showSumDialog, setShowSumDialog] = useState(false);
  const [sumValue, setSumValue] = useState("");
  
  // Drag selection state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState(null);
  
  // Cage selection cursor (separate from regular cell selection)
  const [cageSelectionCursor, setCageSelectionCursor] = useState([0, 0]);
  
  // Edit cage state
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCage, setEditingCage] = useState(null);
  const [editSumValue, setEditSumValue] = useState("");

  // Function to validate Killer Sudoku rules and find invalid cells
  const validateKillerSudoku = useCallback((currentTable) => {
    const invalid = new Set();

    // Check rows and columns for duplicates
    for (let i = 0; i < 9; i++) {
      const rowValues = new Map();
      const colValues = new Map();

      for (let j = 0; j < 9; j++) {
        // Check row duplicates
        const rowValue = currentTable[i][j];
        if (rowValue !== "") {
          if (rowValues.has(rowValue)) {
            invalid.add(`${i}-${j}`);
            invalid.add(`${i}-${rowValues.get(rowValue)}`);
          } else {
            rowValues.set(rowValue, j);
          }
        }

        // Check column duplicates
        const colValue = currentTable[j][i];
        if (colValue !== "") {
          if (colValues.has(colValue)) {
            invalid.add(`${j}-${i}`);
            invalid.add(`${colValues.get(colValue)}-${i}`);
          } else {
            colValues.set(colValue, j);
          }
        }
      }
    }

    // Check 3x3 boxes for duplicates
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxValues = new Map();

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = boxRow * 3 + i;
            const col = boxCol * 3 + j;
            const value = currentTable[row][col];

            if (value !== "") {
              if (boxValues.has(value)) {
                invalid.add(`${row}-${col}`);
                const [prevRow, prevCol] = boxValues.get(value);
                invalid.add(`${prevRow}-${prevCol}`);
              } else {
                boxValues.set(value, [row, col]);
              }
            }
          }
        }
      }
    }

    // Check cage sum constraints
    cages.forEach(cage => {
      let sum = 0;
      let filledCells = 0;
      
      cage.cells.forEach(cellKey => {
        const [row, col] = cellKey.split('-').map(Number);
        const value = currentTable[row][col];
        if (value !== "") {
          sum += parseInt(value);
          filledCells++;
        }
      });
      
      // If all cells in cage are filled and sum doesn't match target
      if (filledCells === cage.cells.length && sum !== cage.sum) {
        cage.cells.forEach(cellKey => {
          invalid.add(cellKey);
        });
      }
      // If partially filled but sum already exceeds target
      else if (sum > cage.sum) {
        cage.cells.forEach(cellKey => {
          const [row, col] = cellKey.split('-').map(Number);
          if (currentTable[row][col] !== "") {
            invalid.add(cellKey);
          }
        });
      }
    });

    setInvalidCells(invalid);
  }, [cages]);

  // Helper function to get cage info for a cell
  const getCageInfo = useCallback((rowIndex, cellIndex) => {
    const cellKey = `${rowIndex}-${cellIndex}`;
    return cages.find(cage => cage.cells.includes(cellKey));
  }, [cages]);

  // Helper function to check if cell is the top-left of a cage (for sum display)
  const isTopLeftOfCage = useCallback((rowIndex, cellIndex) => {
    const cage = getCageInfo(rowIndex, cellIndex);
    if (!cage) return null;
    
    // Find the top-left cell in the cage
    let minRow = 9, minCol = 9;
    cage.cells.forEach(cellKey => {
      const [r, c] = cellKey.split('-').map(Number);
      if (r < minRow || (r === minRow && c < minCol)) {
        minRow = r;
        minCol = c;
      }
    });
    
    return minRow === rowIndex && minCol === cellIndex ? cage : null;
  }, [getCageInfo]);

  // Helper function to get cage borders for a cell
  const getCageBorders = useCallback((rowIndex, cellIndex) => {
    const cage = getCageInfo(rowIndex, cellIndex);
    if (!cage) return {};
    
    const borders = {};
    
    // Check each direction to see if adjacent cell is in same cage
    const directions = [
      { name: 'top', dr: -1, dc: 0 },
      { name: 'right', dr: 0, dc: 1 },
      { name: 'bottom', dr: 1, dc: 0 },
      { name: 'left', dr: 0, dc: -1 }
    ];
    
    directions.forEach(({ name, dr, dc }) => {
      const adjRow = rowIndex + dr;
      const adjCol = cellIndex + dc;
      
      // If adjacent cell is outside grid or not in same cage, add dashed border
      if (adjRow < 0 || adjRow >= 9 || adjCol < 0 || adjCol >= 9) {
        borders[name] = true;
      } else {
        const adjCellKey = `${adjRow}-${adjCol}`;
        if (!cage.cells.includes(adjCellKey)) {
          borders[name] = true;
        }
      }
    });
    
    return borders;
  }, [getCageInfo]);

  // Helper function to get cells between two points (for consecutive selection)
  const getCellsBetween = useCallback((startCell, endCell) => {
    if (!startCell || !endCell) return [];
    
    const [startRow, startCol] = startCell.split('-').map(Number);
    const [endRow, endCol] = endCell.split('-').map(Number);
    
    const cells = [];
    
    // Handle horizontal lines
    if (startRow === endRow) {
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);
      for (let col = minCol; col <= maxCol; col++) {
        cells.push(`${startRow}-${col}`);
      }
    }
    // Handle vertical lines
    else if (startCol === endCol) {
      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      for (let row = minRow; row <= maxRow; row++) {
        cells.push(`${row}-${startCol}`);
      }
    }
    // Handle L-shaped selections (corner-to-corner)
    else {
      // Create L-shape by going horizontal first, then vertical
      // Or vertical first, then horizontal (choose shorter path)
      
      const horizontalFirst = [];
      const verticalFirst = [];
      
      // Horizontal first, then vertical
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);
      // Add horizontal line at startRow
      for (let col = minCol; col <= maxCol; col++) {
        horizontalFirst.push(`${startRow}-${col}`);
      }
      // Add vertical line at endCol (excluding the corner we already added)
      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      for (let row = minRow; row <= maxRow; row++) {
        if (row !== startRow) { // Skip the corner cell we already added
          horizontalFirst.push(`${row}-${endCol}`);
        }
      }
      
      // Vertical first, then horizontal  
      // Add vertical line at startCol
      for (let row = minRow; row <= maxRow; row++) {
        verticalFirst.push(`${row}-${startCol}`);
      }
      // Add horizontal line at endRow (excluding the corner we already added)
      for (let col = minCol; col <= maxCol; col++) {
        if (col !== startCol) { // Skip the corner cell we already added
          verticalFirst.push(`${endRow}-${col}`);
        }
      }
      
      // Choose the shorter L-shape (fewer cells)
      const chosenShape = horizontalFirst.length <= verticalFirst.length ? horizontalFirst : verticalFirst;
      cells.push(...chosenShape);
    }
    
    return cells;
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
    isHintMode,
    setIsHintMode,
    selectedCells,
    setSelectedCells,
    cages,
    setCages,
    showSumDialog,
    setShowSumDialog,
    sumValue,
    setSumValue,
    defaultTable,
    
    // Drag selection state
    isDragging,
    setIsDragging,
    dragStartCell,
    setDragStartCell,
    
    // Cage selection cursor
    cageSelectionCursor,
    setCageSelectionCursor,
    
    // Edit cage state
    showEditDialog,
    setShowEditDialog,
    editingCage,
    setEditingCage,
    editSumValue,
    setEditSumValue,
    
    // Functions
    validateKillerSudoku,
    getCageInfo,
    isTopLeftOfCage,
    getCageBorders,
    getCellsBetween
  };
};
