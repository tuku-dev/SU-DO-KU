import React from 'react';

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
          onKeyDown={handleKeyDown}
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
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to create cage, Escape to cancel
        </p>
      </div>
    </div>
  );
};

export default SumDialog;
