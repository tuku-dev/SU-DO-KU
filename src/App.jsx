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

    setInvalidCells(invalid);
  }, []);

  const replaceValue = useCallback(
    (num) => {
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
    [selectedCell, isQuestionMode, question, validateSudoku]
  );

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
      {!isQuestionMode && (
        <p className="text-center py-2">
          <span className="text-green-500 text-xl">&nbsp;</span>
        </p>
      )}
      <div className="flex flex-col mx-auto text-center text-2xl items-center justify-center max-w-fit bg-white text-gray-900">
        {table.map((row, rowIndex) => (
          <div className="row flex" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                className={`cell size-15 border border-gray-900/10 flex items-center justify-center hover:bg-gray-900/10 cursor-default 
                  ${cell !== "" ? " bg-gray-900/10" : ""}
                  ${
                    selectedCell[0] === rowIndex &&
                    selectedCell[1] === cellIndex
                      ? " bg-gray-900/10"
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
                    !isQuestionMode && question[rowIndex][cellIndex] !== ""
                      ? " bg-blue-500/30 font-bold"
                      : ""
                  }
                  ${
                    invalidCells.has(`${rowIndex}-${cellIndex}`)
                      ? " bg-red-500/10 text-red-900"
                      : ""
                  }
                  `}
                key={cellIndex}
                onClick={() => setSelectedCell([rowIndex, cellIndex])}
              >
                {cell}
              </div>
            ))}
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
        <button className="border p-2 m-1" onClick={() => replaceValue("")}>
          Clear
        </button>
        <button className="border p-2 m-1" onClick={() => resetGame()}>
          {isQuestionMode ? "Reset All" : "Reset Answers"}
        </button>
        {!isQuestionMode && (
          <button
            className="border p-2 m-1 bg-yellow-600"
            onClick={() => {
              setIsQuestionMode(true);
              setTable(defaultTable);
              setQuestion(defaultTable);
              setInvalidCells(new Set());
            }}
          >
            New Question
          </button>
        )}
      </div>
    </>
  );
}

export default App;
