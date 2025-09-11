import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import { SudokuGame } from "./games/sudoku";
import { ThemeToggle } from "./shared";

function App() {
  return (
    <Router>
      <div className="relative">
        {/* Theme Toggle - Always visible */}
        <ThemeToggle />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/killer-sudoku" element={<SudokuGame />} />
          {/* Add more game routes here as they are developed */}
          {/* <Route path="/chess" element={<ChessGame />} /> */}
          {/* <Route path="/checkers" element={<CheckersGame />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
