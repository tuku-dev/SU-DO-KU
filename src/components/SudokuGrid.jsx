import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuGrid = ({
  table,
  selectedCell,
  isHintMode,
  selectedCells,
  question,
  isQuestionMode,
  invalidCells,
  getCageInfo,
  isTopLeftOfCage,
  getCageBorders,
  handleCellClick,
  handleCellMouseDown,
  handleCellMouseEnter,
  handleCellMouseUp,
  onEditCage,
  cageSelectionCursor
}) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-2xl text-center text-gray-900 bg-white max-w-fit">
      {table.map((row, rowIndex) => (
        <div className="flex row" key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const cage = getCageInfo(rowIndex, cellIndex);
            const topLeftCage = isTopLeftOfCage(rowIndex, cellIndex);
            const cageBorders = getCageBorders(rowIndex, cellIndex);
            
            return (
              <SudokuCell
                key={cellIndex}
                cell={cell}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                selectedCell={selectedCell}
                isHintMode={isHintMode}
                selectedCells={selectedCells}
                question={question}
                isQuestionMode={isQuestionMode}
                invalidCells={invalidCells}
                cage={cage}
                topLeftCage={topLeftCage}
                cageBorders={cageBorders}
                cageSelectionCursor={cageSelectionCursor}
                handleCellClick={handleCellClick}
                handleCellMouseDown={handleCellMouseDown}
                handleCellMouseEnter={handleCellMouseEnter}
                handleCellMouseUp={handleCellMouseUp}
                onEditCage={onEditCage}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
