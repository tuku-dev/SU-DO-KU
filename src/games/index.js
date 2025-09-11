// Available games
export { KillerSudokuGame as SudokuGame } from './sudoku';

// Game registry for future use
export const AVAILABLE_GAMES = [
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
