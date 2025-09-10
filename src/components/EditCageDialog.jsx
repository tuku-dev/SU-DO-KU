import React from 'react';

const EditCageDialog = ({ 
  showEditDialog, 
  editingCage, 
  editSumValue, 
  setEditSumValue, 
  onConfirmEdit, 
  onDeleteCage, 
  onCancelEdit 
}) => {
  if (!showEditDialog || !editingCage) return null;

  const handleConfirm = () => {
    if (editSumValue && parseInt(editSumValue) > 0) {
      onConfirmEdit(editingCage.id, parseInt(editSumValue));
    }
  };

  const handleDelete = () => {
    onDeleteCage(editingCage.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editSumValue && parseInt(editSumValue) > 0) {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm p-6 mx-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Edit Cage</h2>
        <p className="mb-4 text-gray-700">
          Cage with {editingCage.cells.length} cells. Current sum: {editingCage.sum}
        </p>
        <input
          type="number"
          value={editSumValue}
          onChange={(e) => setEditSumValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 mb-4 text-gray-900 border rounded"
          placeholder="Enter new sum"
          autoFocus
          min="1"
          max="45"
        />
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={!editSumValue || parseInt(editSumValue) <= 0}
          >
            Update Sum
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            title="Delete this cage"
          >
            🗑️
          </button>
          <button
            onClick={onCancelEdit}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Press Enter to update, Escape to cancel
        </p>
      </div>
    </div>
  );
};

export default EditCageDialog;
