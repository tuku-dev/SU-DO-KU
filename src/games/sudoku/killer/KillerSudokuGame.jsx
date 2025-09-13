import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKillerSudoku } from "./hooks/useKillerSudoku";
import { useKillerSudokuActions } from "./hooks/useKillerSudokuActions";
import { ModeIndicator, ControlButtons } from "../shared";
import KillerSudokuGrid from "./components/KillerSudokuGrid";
import SumDialog from "./components/SumDialog";
import FloatingCageButton from "./components/FloatingCageButton";
import EditCageDialog from "./components/EditCageDialog";

function KillerSudokuGame() {
  const navigate = useNavigate();
  
  // Theme is handled by CSS classes, no need to destructure isDarkMode
  const killerSudokuState = useKillerSudoku();
  
  const {
    table,
    setTable,
    selectedCell,
    setSelectedCell,
    question,
    setQuestion,
    isQuestionMode,
    setIsQuestionMode,
    invalidCells,
    setInvalidCells,
    isHintMode,
    setIsHintMode,
    selectedCells,
    setSelectedCells,
    cages,
    setCages,
    showSumDialog,
    setShowSumDialog,
    sumValue,
    setSumValue,
    defaultTable,
    showEditDialog,
    setShowEditDialog,
    editingCage,
    setEditingCage,
    editSumValue,
    setEditSumValue,
    isDragging,
    setIsDragging,
    dragStartCell,
    setDragStartCell,
    cageSelectionCursor,
    setCageSelectionCursor,
    getCageInfo,
    isTopLeftOfCage,
    getCageBorders,
    getCellsBetween,
    validateKillerSudoku
  } = killerSudokuState;

  const killerSudokuActions = useKillerSudokuActions({
    table,
    setTable,
    selectedCell,
    setSelectedCell,
    question,
    setQuestion,
    isQuestionMode,
    setIsQuestionMode,
    isHintMode,
    setIsHintMode,
    selectedCells,
    setSelectedCells,
    cages,
    setShowSumDialog,
    setSumValue,
    setInvalidCells,
    validateKillerSudoku,
    defaultTable,
    isDragging,
    setIsDragging,
    dragStartCell,
    setDragStartCell,
    cageSelectionCursor,
    setCageSelectionCursor,
    getCellsBetween
  });
  
  const {
    replaceValue,
    handleCellClick,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleCellMouseUp,
    createCage,
    cancelCage,
    finishHints,
    questionsEntered,
    resetGame,
    solvePuzzle
  } = killerSudokuActions;

  // Implement confirmCage here since it needs access to local state
  const confirmCage = useCallback(() => {
    if (!sumValue || selectedCells.size === 0) return;
    
    const selectedCellsArray = Array.from(selectedCells);
    
    // Find existing cages that have any overlapping cells with the new selection
    const overlappingCageIds = cages
      .filter(cage => cage.cells.some(cell => selectedCells.has(cell)))
      .map(cage => cage.id);
    
    // Remove overlapping cages first
    const cagesAfterRemoval = cages.filter(cage => !overlappingCageIds.includes(cage.id));
    
    // Create new cage
    const newCage = {
      id: Date.now(),
      cells: selectedCellsArray,
      sum: parseInt(sumValue),
      color: `hsl(${(cagesAfterRemoval.length * 60) % 360}, 70%, 90%)`
    };
    
    // Update cages with the new cage added
    setCages([...cagesAfterRemoval, newCage]);
    killerSudokuState.setSelectedCells(new Set());
    setSumValue("");
    setShowSumDialog(false);
  }, [sumValue, selectedCells, cages, setCages, killerSudokuState, setSumValue, setShowSumDialog]);

  // Handle editing a cage
  const handleEditCage = useCallback((cage) => {
    setEditingCage(cage);
    setEditSumValue(cage.sum.toString());
    setShowEditDialog(true);
  }, [setEditingCage, setEditSumValue, setShowEditDialog]);

  // Confirm cage edit
  const confirmEditCage = useCallback((cageId, newSum) => {
    setCages(prev => prev.map(cage => 
      cage.id === cageId ? { ...cage, sum: newSum } : cage
    ));
    setShowEditDialog(false);
    setEditingCage(null);
    setEditSumValue("");
  }, [setCages, setShowEditDialog, setEditingCage, setEditSumValue]);

  // Delete cage
  const deleteCage = useCallback((cageId) => {
    setCages(prev => prev.filter(cage => cage.id !== cageId));
    setShowEditDialog(false);
    setEditingCage(null);
    setEditSumValue("");
  }, [setCages, setShowEditDialog, setEditingCage, setEditSumValue]);

  // Cancel cage edit
  const cancelEditCage = useCallback(() => {
    setShowEditDialog(false);
    setEditingCage(null);
    setEditSumValue("");
  }, [setShowEditDialog, setEditingCage, setEditSumValue]);

  // Global mouse up handler to stop dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, setIsDragging]);

  return (
    <div className="min-h-screen py-8 transition-colors duration-300">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed z-50 px-4 py-2 font-medium text-gray-800 transition-colors bg-white border border-gray-300 rounded-lg shadow-lg top-4 left-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        ← Home
      </button>
      
      <div className="container px-4 mx-auto">
        <ModeIndicator
          variant="killer"
          isQuestionMode={isQuestionMode}
          isHintMode={isHintMode}
          selectedCells={selectedCells}
          questionsEntered={questionsEntered}
          createCage={createCage}
          finishHints={finishHints}
        />
        
        <div className="flex justify-center mb-6">
          <KillerSudokuGrid
            table={table}
            selectedCell={selectedCell}
            isHintMode={isHintMode}
            selectedCells={selectedCells}
            question={question}
            isQuestionMode={isQuestionMode}
            invalidCells={invalidCells}
            getCageInfo={getCageInfo}
            isTopLeftOfCage={isTopLeftOfCage}
            getCageBorders={getCageBorders}
            cageSelectionCursor={cageSelectionCursor}
            handleCellClick={handleCellClick}
            handleCellMouseDown={handleCellMouseDown}
            handleCellMouseEnter={handleCellMouseEnter}
            handleCellMouseUp={handleCellMouseUp}
            onEditCage={handleEditCage}
          />
        </div>
        
        <ControlButtons
          variant="killer"
          isQuestionMode={isQuestionMode}
          isHintMode={isHintMode}
          replaceValue={replaceValue}
          resetGame={resetGame}
          solvePuzzle={solvePuzzle}
          defaultTable={defaultTable}
          setIsQuestionMode={setIsQuestionMode}
          setTable={setTable}
          setQuestion={setQuestion}
          setInvalidCells={setInvalidCells}
          setCages={setCages}
        />

        <SumDialog
          showSumDialog={showSumDialog}
          selectedCells={selectedCells}
          sumValue={sumValue}
          setSumValue={setSumValue}
          confirmCage={confirmCage}
          cancelCage={cancelCage}
        />

        <FloatingCageButton
          isVisible={isHintMode && selectedCells.size > 0}
          selectedCells={selectedCells}
          onCreateCage={createCage}
        />

        <EditCageDialog
          showEditDialog={showEditDialog}
          editingCage={editingCage}
          editSumValue={editSumValue}
          setEditSumValue={setEditSumValue}
          onConfirmEdit={confirmEditCage}
          onDeleteCage={deleteCage}
          onCancelEdit={cancelEditCage}
        />
      </div>
    </div>
  );
}

export default KillerSudokuGame;