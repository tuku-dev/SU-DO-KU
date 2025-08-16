import React, { useCallback } from "react";
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
  const sudokuState = useSudoku();
  
  const {
    table,
    setTable,
    selectedCell,
    question,
    setQuestion,
    isQuestionMode,
    setIsQuestionMode,
    invalidCells,
    setInvalidCells,
    isHintMode,
    selectedCells,
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
    getCageInfo,
    isTopLeftOfCage,
    getCageBorders
  } = sudokuState;

  const sudokuActions = useSudokuActions(sudokuState);
  
  const {
    replaceValue,
    handleCellClick,
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

  return (
    <>
      <ModeIndicator
        isQuestionMode={isQuestionMode}
        isHintMode={isHintMode}
        selectedCells={selectedCells}
        questionsEntered={questionsEntered}
        createCage={createCage}
        finishHints={finishHints}
      />
      
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
        handleCellClick={handleCellClick}
        onEditCage={handleEditCage}
      />
      
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
    </>
  );
}

export default App;
