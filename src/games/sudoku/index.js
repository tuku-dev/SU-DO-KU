// Killer Sudoku game exports
export { default as KillerSudokuGame } from './KillerSudokuGame';

// Killer Sudoku components (for advanced usage)
export { default as KillerSudokuCell } from './components/KillerSudokuCell';
export { default as KillerSudokuGrid } from './components/KillerSudokuGrid';
export { default as ControlButtons } from './components/ControlButtons';
export { default as ModeIndicator } from './components/ModeIndicator';
export { default as EditCageDialog } from './components/EditCageDialog';
export { default as SumDialog } from './components/SumDialog';
export { default as FloatingCageButton } from './components/FloatingCageButton';

// Backward compatibility exports
export { default as SudokuGame } from './KillerSudokuGame';
export { default as SudokuCell } from './components/KillerSudokuCell';
export { default as SudokuGrid } from './components/KillerSudokuGrid';

// Killer Sudoku hooks
export { useKillerSudoku } from './hooks/useKillerSudoku';
export { useKillerSudokuActions } from './hooks/useKillerSudokuActions';

// Backward compatibility hooks
export { useKillerSudoku as useSudoku } from './hooks/useKillerSudoku';
export { useKillerSudokuActions as useSudokuActions } from './hooks/useKillerSudokuActions';
