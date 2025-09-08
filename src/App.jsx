import React, { useCallback, useEffect } from "react";
import "./App.css";
import { useSudoku } from "./hooks/useSudoku";
import { useSudokuActions } from "./hooks/useSudokuActions";
import ModeIndicator from "./components/ModeIndicator";
import SudokuGrid from "./components/SudokuGrid";
import ControlButtons from "./components/ControlButtons";
import SumDialog from "./components/SumDialog";
import FloatingCageButton from "./components/FloatingCageButton";
import EditCageDialog from "./components/EditCageDialog";

function App() {
  // Theme is handled by CSS classes, no need to destructure isDarkMode
  const sudokuState = useSudoku();
  
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
    validateSudoku
  } = sudokuState;

  const sudokuActions = useSudokuActions({
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
    validateSudoku,
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
  } = sudokuActions;

  // Implement confirmCage here since it needs access to local state
  const confirmCage = useCallback(() => {
    if (!sumValue || selectedCells.size === 0) return;
    
    const newCage = {
      id: Date.now(),
      cells: Array.from(selectedCells),
      sum: parseInt(sumValue),
      color: `hsl(${(cages.length * 60) % 360}, 70%, 90%)`
    };
    
    setCages(prev => [...prev, newCage]);
    sudokuState.setSelectedCells(new Set());
    setSumValue("");
    setShowSumDialog(false);
  }, [sumValue, selectedCells, cages.length, setCages, sudokuState, setSumValue, setShowSumDialog]);

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
      <div className="container px-4 mx-auto">
        <ModeIndicator
          isQuestionMode={isQuestionMode}
          isHintMode={isHintMode}
          selectedCells={selectedCells}
          questionsEntered={questionsEntered}
          createCage={createCage}
          finishHints={finishHints}
        />
        
        <div className="flex justify-center mb-6">
          <SudokuGrid
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

export default App;
