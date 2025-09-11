import React from "react";

const KillerSudokuCell = ({
  cell,
  rowIndex,
  cellIndex,
  selectedCell,
  isHintMode,
  selectedCells,
  question,
  isQuestionMode,
  invalidCells,
  cage,
  topLeftCage,
  cageBorders,
  cageSelectionCursor,
  handleCellClick,
  handleCellMouseDown,
  handleCellMouseEnter,
  handleCellMouseUp,
  onEditCage,
  table, // Add table prop to access all cell values
}) => {
  const cellKey = `${rowIndex}-${cellIndex}`;
  
  // Get the value of the currently selected cell for number highlighting
  const selectedCellValue = selectedCell && selectedCell.length === 2 && table ? 
    table[selectedCell[0]][selectedCell[1]] : null;

  return (
    <div
      data-cell={`${rowIndex}-${cellIndex}`}
      className={`cell size-15 flex items-center justify-center cursor-default relative font-semibold text-black
        ${
          cellIndex < 8 && (cellIndex + 1) % 3 === 0
            ? "border-r-4"
            : ""
        }
        ${
          rowIndex < 8 && (rowIndex + 1) % 3 === 0
            ? "border-b-4"
            : ""
        }
        ${isHintMode ? " select-none" : ""}
        `}
      style={{
        border: '1px solid #555',
        borderRightWidth: cellIndex < 8 && (cellIndex + 1) % 3 === 0 ? '4px' : '1px',
        borderBottomWidth: rowIndex < 8 && (rowIndex + 1) % 3 === 0 ? '4px' : '1px',
        borderRightColor: cellIndex < 8 && (cellIndex + 1) % 3 === 0 ? '#555' : '#555',
        borderBottomColor: rowIndex < 8 && (rowIndex + 1) % 3 === 0 ? '#555' : '#555',
        backgroundColor: 
          // Selection colors (highest priority)
          (!isHintMode && selectedCell[0] === rowIndex && selectedCell[1] === cellIndex) ? '#aaa' :
          (isHintMode && cageSelectionCursor && cageSelectionCursor[0] === rowIndex && cageSelectionCursor[1] === cellIndex) ? '#aaa' :
          (isHintMode && selectedCells.has(cellKey)) ? '#aaa' :
          // Invalid cells
          (invalidCells.has(`${rowIndex}-${cellIndex}`)) ? '#ffcccc' :
          // Question cells
          (!isQuestionMode && !isHintMode && question[rowIndex][cellIndex] !== "") ? '#cce7ff' :
          // Number highlighting (same number as selected cell)
          (!isHintMode && selectedCellValue && cell === selectedCellValue && cell !== "" &&
           !(selectedCell[0] === rowIndex && selectedCell[1] === cellIndex)) ? 'rgb(255, 248, 200)' :
          // Row and column highlighting (same row or column as selected cell)
          (!isHintMode && selectedCell && selectedCell.length === 2 && 
           (selectedCell[0] === rowIndex || selectedCell[1] === cellIndex) &&
           !(selectedCell[0] === rowIndex && selectedCell[1] === cellIndex)) ? 'rgb(229 235 243)' :
          // Cage colors (only if not selected and not in hint mode)
          (cage && !isHintMode && 
           !(selectedCell[0] === rowIndex && selectedCell[1] === cellIndex) &&
           !(isHintMode && cageSelectionCursor && cageSelectionCursor[0] === rowIndex && cageSelectionCursor[1] === cellIndex) &&
           !(isHintMode && selectedCells.has(cellKey))) ? cage.color :
          // Default light background
          '#f9f9f9',
        userSelect: isHintMode ? "none" : "auto",
        WebkitUserSelect: isHintMode ? "none" : "auto",
        MozUserSelect: isHintMode ? "none" : "auto",
        msUserSelect: isHintMode ? "none" : "auto",
      }}
      onClick={(e) => handleCellClick(rowIndex, cellIndex, e)}
      onMouseDown={(e) => {
        if (isHintMode) {
          e.preventDefault();
        }
        handleCellMouseDown(rowIndex, cellIndex, e);
      }}
      onMouseEnter={() => handleCellMouseEnter(rowIndex, cellIndex)}
      onMouseUp={handleCellMouseUp}
    >
      {/* Dashed border overlay */}
      {(cageBorders.top ||
        cageBorders.right ||
        cageBorders.bottom ||
        cageBorders.left) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderTopStyle: cageBorders.top ? "dashed" : "none",
            borderRightStyle: cageBorders.right ? "dashed" : "none",
            borderBottomStyle: cageBorders.bottom ? "dashed" : "none",
            borderLeftStyle: cageBorders.left ? "dashed" : "none",
            borderWidth: "2px",
            borderColor: "#37000050",
            margin: "2px",
          }}
        />
      )}

      {topLeftCage && (
        <div 
          className="absolute top-0 left-0 z-10 px-1 text-xs font-bold text-gray-700 transition-colors rounded-br cursor-pointer bg-white/80 hover:bg-blue-100"
          onClick={(e) => {
            e.stopPropagation();
            onEditCage(topLeftCage);
          }}
          title="Click to edit this cage"
        >
          {topLeftCage.sum}
        </div>
      )}
      <span className={topLeftCage ? "mt-2" : ""}>{cell}</span>
    </div>
  );
};

export default KillerSudokuCell;
