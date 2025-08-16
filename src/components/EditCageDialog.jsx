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
    if (window.confirm('Are you sure you want to delete this cage?')) {
      onDeleteCage(editingCage.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && editSumValue && parseInt(editSumValue) > 0) {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Cage</h2>
        <p className="mb-4 text-gray-700">
          Cage with {editingCage.cells.length} cells. Current sum: {editingCage.sum}
        </p>
        <input
          type="number"
          value={editSumValue}
          onChange={(e) => setEditSumValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded w-full mb-4 text-gray-900"
          placeholder="Enter new sum"
          autoFocus
          min="1"
          max="45"
        />
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
            disabled={!editSumValue || parseInt(editSumValue) <= 0}
          >
            Update Sum
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            title="Delete this cage"
          >
            🗑️
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to update, Escape to cancel
        </p>
      </div>
    </div>
  );
};

export default EditCageDialog;
