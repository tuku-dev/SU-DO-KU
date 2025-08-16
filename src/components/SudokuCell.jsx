import React from "react";

const SudokuCell = ({
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
  handleCellClick,
  onEditCage,
}) => {
  const cellKey = `${rowIndex}-${cellIndex}`;

  return (
    <div
      data-cell={`${rowIndex}-${cellIndex}`}
      className={`cell size-15 border border-gray-900/10 flex items-center justify-center hover:bg-gray-900/10 cursor-default relative
        ${cell !== "" ? " bg-gray-900/10" : ""}
        ${
          !isHintMode &&
          selectedCell[0] === rowIndex &&
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
      }}
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
          className="absolute top-0 left-0 text-xs font-bold text-gray-700 bg-white/80 px-1 rounded-br z-10 cursor-pointer hover:bg-blue-100 transition-colors"
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

export default SudokuCell;
