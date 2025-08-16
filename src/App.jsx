import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
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

  // Function to validate Sudoku rules and find invalid cells
  const validateSudoku = useCallback((currentTable) => {
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
            // Mark both cells as invalid
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
            // Mark both cells as invalid
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
                // Mark both cells as invalid
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
    [selectedCell, isQuestionMode, question, validateSudoku, isHintMode]
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
  }, [isHintMode]);

  const createCage = useCallback(() => {
    if (selectedCells.size === 0) return;
    setShowSumDialog(true);
  }, [selectedCells]);

  const confirmCage = useCallback(() => {
    if (!sumValue || selectedCells.size === 0) return;
    
    const newCage = {
      id: Date.now(),
      cells: Array.from(selectedCells),
      sum: parseInt(sumValue),
      color: `hsl(${(cages.length * 60) % 360}, 70%, 90%)`
    };
    
    setCages(prev => [...prev, newCage]);
    setSelectedCells(new Set());
    setSumValue("");
    setShowSumDialog(false);
  }, [sumValue, selectedCells, cages.length]);

  const cancelCage = useCallback(() => {
    setShowSumDialog(false);
    setSumValue("");
  }, []);

  const finishHints = useCallback(() => {
    setIsHintMode(false);
    setSelectedCells(new Set());
  }, []);

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
  }, [table, cages]);

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

  const moveSelectedCell = useCallback((deltaRow, deltaCol) => {
    setSelectedCell((prev) => {
      const newRow = Math.min(Math.max(prev[0] + deltaRow, 0), 8);
      const newCol = Math.min(Math.max(prev[1] + deltaCol, 0), 8);
      return [newRow, newCol];
    });
  }, []);

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

  const resetGame = () => {
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
  };

  const questionsEntered = () => {
    // Create a proper deep copy of the table
    const questionCopy = table.map((row) => [...row]);
    setQuestion(questionCopy);
    setIsQuestionMode(false);
    setIsHintMode(true); // Enter hint mode after question submission
  };

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
      <div className="flex flex-col mx-auto text-center text-2xl items-center justify-center max-w-fit bg-white text-gray-900">
        {table.map((row, rowIndex) => (
          <div className="row flex" key={rowIndex}>
            {row.map((cell, cellIndex) => {
              const cellKey = `${rowIndex}-${cellIndex}`;
              const cage = getCageInfo(rowIndex, cellIndex);
              const topLeftCage = isTopLeftOfCage(rowIndex, cellIndex);
              const cageBorders = getCageBorders(rowIndex, cellIndex);
              
              // Create inset box-shadow for dashed cage borders
              const boxShadowParts = [];
              if (cageBorders.top) {
                boxShadowParts.push('inset 0 0 0 0 #37000050');
              }
              if (cageBorders.right) {
                boxShadowParts.push('inset 0 0 0 0 #37000050');
              }
              if (cageBorders.bottom) {
                boxShadowParts.push('inset 0 0 0 0 #37000050');
              }
              if (cageBorders.left) {
                boxShadowParts.push('inset 0 0 0 0 #37000050');
              }
              
              return (
                <div
                  className={`cell size-15 border border-gray-900/10 flex items-center justify-center hover:bg-gray-900/10 cursor-default relative
                    ${cell !== "" ? " bg-gray-900/10" : ""}
                    ${
                      !isHintMode && selectedCell[0] === rowIndex &&
                      selectedCell[1] === cellIndex
                        ? " bg-gray-900/10"
                        : ""
                    }
                    ${
                      isHintMode && selectedCells.has(cellKey)
                        ? " bg-yellow-300/50 border-yellow-500"
                        : ""
                    }
                    ${
                      cellIndex < 8 && (cellIndex + 1) % 3 === 0
                        ? "border-r-3 border-r-gray-900/30"
                        : ""
                    }
                    ${
                      rowIndex < 8 && (rowIndex + 1) % 3 === 0
                        ? "border-b-3 border-b-gray-900/30"
                        : ""
                    }
                    ${
                      !isQuestionMode && !isHintMode && question[rowIndex][cellIndex] !== ""
                        ? " bg-blue-500/30 font-bold"
                        : ""
                    }
                    ${
                      invalidCells.has(`${rowIndex}-${cellIndex}`)
                        ? " bg-red-500/10 text-red-900"
                        : ""
                    }
                    ${isHintMode ? " select-none" : ""}
                    `}
                  style={{
                    backgroundColor: cage && !isHintMode ? cage.color : undefined,
                    boxShadow: boxShadowParts.length > 0 ? boxShadowParts.join(', ') : undefined,
                    userSelect: isHintMode ? 'none' : 'auto',
                    WebkitUserSelect: isHintMode ? 'none' : 'auto',
                    MozUserSelect: isHintMode ? 'none' : 'auto',
                    msUserSelect: isHintMode ? 'none' : 'auto'
                  }}
                  key={cellIndex}
                  onClick={(e) => handleCellClick(rowIndex, cellIndex, e)}
                  onMouseDown={(e) => {
                    if (isHintMode) {
                      e.preventDefault(); // Prevent text selection on mouse down
                    }
                  }}
                >
                  {/* Dashed border overlay */}
                  {(cageBorders.top || cageBorders.right || cageBorders.bottom || cageBorders.left) && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderTopStyle: cageBorders.top ? 'dashed' : 'none',
                        borderRightStyle: cageBorders.right ? 'dashed' : 'none',
                        borderBottomStyle: cageBorders.bottom ? 'dashed' : 'none',
                        borderLeftStyle: cageBorders.left ? 'dashed' : 'none',
                        borderWidth: '2px',
                        borderColor: '#37000050',
                        margin: '2px',
                      }}
                    />
                  )}
                  
                  {topLeftCage && (
                    <div className="absolute top-0 left-0 text-xs font-bold text-gray-700 bg-white/80 px-1 rounded-br z-10">
                      {topLeftCage.sum}
                    </div>
                  )}
                  <span className={topLeftCage ? "mt-2" : ""}>{cell}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
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

      {/* Sum Dialog */}
      {showSumDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Enter Cage Sum</h2>
            <p className="mb-4 text-gray-700">
              Selected {selectedCells.size} cells. Enter the target sum:
            </p>
            <input
              type="number"
              value={sumValue}
              onChange={(e) => setSumValue(e.target.value)}
              className="border p-2 rounded w-full mb-4 text-gray-900"
              placeholder="Enter sum (e.g., 15)"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={confirmCage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!sumValue}
              >
                Create Cage
              </button>
              <button
                onClick={cancelCage}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
