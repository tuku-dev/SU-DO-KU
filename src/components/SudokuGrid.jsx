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
  onEditCage
}) => {
  return (
    <div className="flex flex-col mx-auto text-center text-2xl items-center justify-center max-w-fit bg-white text-gray-900">
      {table.map((row, rowIndex) => (
        <div className="row flex" key={rowIndex}>
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
                handleCellClick={handleCellClick}
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
