import React from 'react';

const NormalSudokuCell = ({
  cellKey,
  value,
  isSelected,
  isQuestionCell,
  isInvalid,
  isSameNumber,
  isSameRowOrColumn,
  onCellClick
}) => {
  const getBorderStyles = () => {
    const [row, col] = cellKey.split('-').map(Number);
    return {
      border: '1px solid #555',
      borderRightWidth: col < 8 && (col + 1) % 3 === 0 ? '4px' : '1px',
      borderBottomWidth: row < 8 && (row + 1) % 3 === 0 ? '4px' : '1px',
      borderRightColor: col < 8 && (col + 1) % 3 === 0 ? '#555' : '#555',
      borderBottomColor: row < 8 && (row + 1) % 3 === 0 ? '#555' : '#555',
    };
  };

  const getBackgroundColor = () => {
    // Selection colors (highest priority)
    if (isSelected) return '#aaa';
    
    // Invalid cells
    if (isInvalid) return '#ffcccc';
    
    // Question cells
    if (isQuestionCell) return '#cce7ff';
    
    // Number highlighting (same number as selected cell)
    if (isSameNumber) return 'rgb(255, 248, 200)';
    
    // Row and column highlighting (same row or column as selected cell)
    if (isSameRowOrColumn) return 'rgb(229, 235, 243)';
    
    // Default light background
    return '#f9f9f9';
  };

  return (
    <div
      className="cell size-15 flex items-center justify-center cursor-pointer relative font-semibold text-black transition-colors duration-200 select-none"
      style={{
        ...getBorderStyles(),
        backgroundColor: getBackgroundColor(),
      }}
      onClick={() => onCellClick(cellKey)}
    >
      {value || ''}
    </div>
  );
};

export default NormalSudokuCell;