import React from 'react';
import NormalSudokuCell from './NormalSudokuCell';

const NormalSudokuGrid = ({
  table,
  selectedCell,
  question,
  invalidCells,
  handleCellClick
}) => {
  // Get the value of the currently selected cell for number highlighting
  const selectedCellValue = selectedCell && table ? table[selectedCell] : null;

  return (
    <div className="inline-block bg-gray-800 dark:bg-gray-200 p-2 rounded-lg shadow-2xl">
      <div className="grid grid-cols-9 gap-0 bg-gray-600 dark:bg-gray-400">
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: 9 }, (_, col) => {
            const key = `${row}-${col}`;
            const value = table[key];
            const isSelected = selectedCell === key;
            const isQuestionCell = !!question[key];
            const isInvalid = invalidCells.has(key);
            
            // Calculate number highlighting (same number as selected cell)
            const isSameNumber = !isSelected && selectedCellValue && 
              value === selectedCellValue && value !== "";
            
            // Calculate row/column highlighting
            const [selectedRow, selectedCol] = selectedCell ? 
              selectedCell.split('-').map(Number) : [null, null];
            const isSameRowOrColumn = !isSelected && selectedCell && 
              (selectedRow === row || selectedCol === col);

            return (
              <NormalSudokuCell
                key={key}
                cellKey={key}
                value={value}
                isSelected={isSelected}
                isQuestionCell={isQuestionCell}
                isInvalid={isInvalid}
                isSameNumber={isSameNumber}
                isSameRowOrColumn={isSameRowOrColumn}
                onCellClick={handleCellClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NormalSudokuGrid;