import React from 'react';
import { dialogClasses, buttonVariants } from '../utils/cssClasses';

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
    <div className={dialogClasses.overlay}>
      <div className={dialogClasses.container}>
        <h2 className={dialogClasses.heading}>Edit Cage</h2>
        <p className={dialogClasses.description}>
          Cage with {editingCage.cells.length} cells. Current sum: {editingCage.sum}
        </p>
        <input
          type="number"
          value={editSumValue}
          onChange={(e) => setEditSumValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={dialogClasses.input}
          placeholder="Enter new sum"
          autoFocus
          min="1"
          max="45"
        />
        <div className={dialogClasses.buttonRow}>
          <button
            onClick={handleConfirm}
            className={`flex-1 ${buttonVariants.primary}`}
            disabled={!editSumValue || parseInt(editSumValue) <= 0}
          >
            Update Sum
          </button>
          <button
            onClick={handleDelete}
            className={buttonVariants.danger}
            title="Delete this cage"
          >
            🗑️
          </button>
          <button
            onClick={onCancelEdit}
            className={buttonVariants.secondary}
          >
            Cancel
          </button>
        </div>
        <p className={dialogClasses.helpText}>
          Press Enter to update, Escape to cancel
        </p>
      </div>
    </div>
  );
};

export default EditCageDialog;
