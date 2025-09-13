// Available games
export { KillerSudokuGame } from './sudoku/killer';
export { NormalSudokuGame } from './sudoku/normal';

// Game registry for future use
export const AVAILABLE_GAMES = [
  {
    id: 'normal-sudoku',
    name: 'Sudoku',
    description: 'Classic 9x9 Sudoku puzzle with standard rules',
    component: 'NormalSudokuGame',
    category: 'Logic Puzzles'
  },
  {
    id: 'sudoku',
    name: 'Killer Sudoku',
    description: 'Classic Killer Sudoku with cage constraints',
    component: 'KillerSudokuGame',
    category: 'Logic Puzzles'
  }
  // Future games will be added here:
  // {
  //   id: 'chess',
  //   name: 'Chess',
  //   description: 'Classic strategy board game',
  //   component: 'ChessGame',
  //   category: 'Strategy'
  // }
];
