import React, { useState, useEffect } from 'react';
import { buttonVariants } from '../utils/cssClasses';

const CageButton = ({ isVisible, selectedCells, onCreateCage }) => {
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible && selectedCells.size > 0) {
      // Find the topmost, leftmost selected cell
      let minRow = 9, minCol = 9;
      selectedCells.forEach(cellKey => {
        const [row, col] = cellKey.split('-').map(Number);
        if (row < minRow || (row === minRow && col < minCol)) {
          minRow = row;
          minCol = col;
        }
      });

      // Find the DOM element for that cell
      const cellElement = document.querySelector(`[data-cell="${minRow}-${minCol}"]`);
      if (cellElement) {
        const rect = cellElement.getBoundingClientRect();
        setButtonPosition({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 45 // Position above the cell
        });
      }

      // Small delay before showing the button
      const timer = setTimeout(() => setShowButton(true), 100);
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowButton(false);
    }
  }, [isVisible, selectedCells]);

  if (!showButton || selectedCells.size === 0) {
    return null;
  }

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: buttonPosition.x,
        top: buttonPosition.y,
        transform: 'translate(0, 0)'
      }}
    >
      <button
        className={`cage-button ${buttonVariants.primary} ${buttonVariants.floatingButton}`}
        onClick={onCreateCage}
        title="Click to create a cage with the selected cells"
      >
        🎯 Create Cage ({selectedCells.size})
      </button>
    </div>
  );
};

export default CageButton;
