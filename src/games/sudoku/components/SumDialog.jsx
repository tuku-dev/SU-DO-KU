import React from 'react';
import { dialogClasses, buttonVariants } from '../../../shared/utils/cssClasses';

const SumDialog = ({
  showSumDialog,
  selectedCells,
  sumValue,
  setSumValue,
  confirmCage,
  cancelCage
}) => {
  if (!showSumDialog) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && sumValue) {
      confirmCage();
    } else if (e.key === 'Escape') {
      cancelCage();
    }
  };

  return (
    <div className={dialogClasses.overlay}>
      <div className={dialogClasses.container}>
        <h2 className={dialogClasses.heading}>Enter Cage Sum</h2>
        <p className={dialogClasses.description}>
          Selected {selectedCells.size} cells. Enter the target sum:
        </p>
        <input
          type="number"
          value={sumValue}
          onChange={(e) => setSumValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={dialogClasses.input}
          placeholder="Enter sum (e.g., 15)"
          autoFocus
        />
        <div className={dialogClasses.buttonRow}>
          <button
            onClick={confirmCage}
            className={buttonVariants.primary}
            disabled={!sumValue}
          >
            Create Cage
          </button>
          <button
            onClick={cancelCage}
            className={buttonVariants.secondary}
          >
            Cancel
          </button>
        </div>
        <p className={dialogClasses.helpText}>
          Press Enter to create cage, Escape to cancel
        </p>
      </div>
    </div>
  );
};

export default SumDialog;
