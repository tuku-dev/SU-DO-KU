# 🔥 Killer Sudoku - Advanced Interactive Puzzle Solver

A modern, feature-rich Killer Sudoku application built with React and Vite. Create custom puzzles, design killer cages with sum constraints, and solve puzzles with intelligent validation.

![Killer Sudoku Demo](https://img.shields.io/badge/Status-Interactive%20Demo-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-yellow)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-cyan)

## ✨ Features Overview

### 🧩 **Core Sudoku Functionality**
- Complete 9x9 Sudoku grid with number input (1-9)
- Real-time validation for Sudoku rules (rows, columns, 3x3 boxes)
- Visual error highlighting for invalid entries
- Keyboard navigation with arrow keys
- Auto-solve algorithm with backtracking

### 🎯 **Killer Sudoku Enhancements**
- **Cage Creation**: Create custom killer cages with sum constraints
- **Multiple Selection Methods**: Click, drag, shift-click, and keyboard selection
- **Visual Cage Indicators**: Colored backgrounds and dashed borders
- **Sum Validation**: Real-time validation of cage sum constraints
- **Cage Management**: Edit sums, delete cages, and visual cage identification

### 🎨 **Advanced UI/UX**
- **Multi-Mode Interface**: Question mode, Hint mode, and Solve mode
- **Visual Feedback**: Color-coded cells, selection highlighting, and cursors
- **Responsive Design**: Clean, modern interface with TailwindCSS
- **Floating Controls**: Context-sensitive cage creation buttons

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/tuku-dev/SU-DO-KU.git
cd SU-DO-KU

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5174
```

### Basic Usage
1. **Create a Puzzle**: Enter numbers in Question Mode
2. **Design Cages**: Switch to Hint Mode and create killer cages
3. **Solve**: Enter Solve Mode and complete the puzzle

---

## 📋 Complete Feature Guide

## 🎮 **Mode System**

### 📝 **Question Mode** (Initial Setup)
**Purpose**: Create the initial puzzle by placing given numbers

```
┌─────────────────────────────────┐
│  📝 QUESTION MODE ACTIVE        │
│  Enter initial puzzle numbers   │
│  [Done] button to continue      │
└─────────────────────────────────┘
```

**Controls**:
- **Number Keys (1-9)**: Place numbers in selected cell
- **Arrow Keys**: Navigate between cells
- **Backspace/Delete**: Clear cell
- **Done Button**: Complete setup and enter Hint Mode

**Visual Indicators**:
- Selected cell: Light gray background
- Given numbers: Blue background with bold text

### 🎯 **Hint Mode** (Cage Creation)
**Purpose**: Design killer cages with sum constraints

```
┌─────────────────────────────────┐
│  🎯 HINT MODE ACTIVE            │
│  Create cages for killer sudoku │
│  Multiple selection methods     │
└─────────────────────────────────┘
```

**Cage Selection Methods**:

#### 1. **Click & Drag Selection**
- Click on start cell and drag to end cell
- Creates rectangular areas or L-shaped selections
- Perfect for regular cage shapes

```
Example: Drag from A1 to C2
┌───┬───┬───┐
│ ■ │ ■ │ ■ │ A
├───┼───┼───┤
│ ■ │ ■ │ ■ │ B  
├───┼───┼───┤
│   │   │   │ C
└───┴───┴───┘
  1   2   3
```

#### 2. **Consecutive Cell Clicking**
- Click cells one by one to build selections
- Each click adds to current selection
- Great for custom shapes

#### 3. **Shift+Click (Non-Consecutive)**
- Hold Shift and click to jump between cells
- Adds/removes individual cells from selection
- Perfect for irregular cage shapes

#### 4. **Keyboard Selection (Shift+Arrows)**
- **Shift + ↑/↓/←/→**: Extend selection in any direction
- **Enter**: Create cage from current selection
- **Arrow Keys**: Move cursor (clears selection)

**Visual Indicators**:
- **Purple background**: Current cage cursor position
- **Yellow background**: Selected cells for cage
- **Yellow border**: Additional cage cell highlighting
- **Dashed borders**: Existing cage boundaries

**Controls**:
- **Create Cage Button**: Opens sum input dialog
- **Enter Key**: Quick cage creation shortcut
- **Floating Cage Button**: Appears when cells are selected

### ✅ **Solve Mode** (Puzzle Completion)
**Purpose**: Complete the puzzle while respecting all constraints

```
┌─────────────────────────────────┐
│  ✅ SOLVE MODE ACTIVE           │
│  Complete puzzle with cages     │
│  Real-time validation active    │
└─────────────────────────────────┘
```

**Controls**:
- **Number Keys (1-9)**: Fill in solution numbers
- **Arrow Keys**: Navigate between empty cells
- **Auto Solve Button**: Automatically solve the puzzle
- **Reset Answers**: Clear solution while keeping question numbers

**Visual Indicators**:
- Selected cell: Light gray background
- Question cells: Blue background (protected from editing)
- Invalid cells: Red background with red text
- Cage cells: Colored backgrounds with sum indicators

---

## 🎨 **Cage Management System**

### Creating Cages

#### **Step 1: Select Cells**
Choose one of the selection methods:

```
Method 1 - Drag Selection:
┌───┬───┬───┐     ┌───┬───┬───┐
│   │   │   │ --> │ ■ │ ■ │ ■ │ (Drag creates rectangle)
├───┼───┼───┤     ├───┼───┼───┤
│   │   │   │     │ ■ │ ■ │ ■ │
└───┴───┴───┘     └───┴───┴───┘

Method 2 - L-Shape Selection:
┌───┬───┬───┐     ┌───┬───┬───┐
│   │   │   │ --> │ ■ │ ■ │ ■ │ (Corner-to-corner creates L)
├───┼───┼───┤     ├───┼───┼───┤
│   │   │   │     │   │   │ ■ │
└───┴───┴───┘     └───┴───┴───┘

Method 3 - Keyboard Extension:
■ = Start position
■ + Shift+→ = ■ ■
■ ■ + Shift+↓ = ■ ■
                ■ ■
```

#### **Step 2: Set Sum Constraint**
- Click "Create Cage" button or press Enter
- Enter the target sum for the cage
- Confirm to create the cage

```
┌─────────────────────┐
│ Enter cage sum:     │
│ [  15  ] [Cancel]   │
│          [Confirm]  │
└─────────────────────┘
```

#### **Step 3: Visual Result**
```
Created cage with sum 15:
┌─────┬─────┬─────┐
│ 15⌐ │ ··· │ ··· │ <- Sum indicator in top-left
│ ┊   │ ┊   │ ┊   │ <- Dashed borders
├┄┄┄┄┄┼┄┄┄┄┄┼─────┤
│ ┊   │ ┊   │     │
│ ┊   │ ┊   │     │
└─────┴─────┴─────┘
```

### Editing Existing Cages

**Click on Sum Indicator**: Click the number in the top-left corner of any cage

```
┌─────────────────────┐
│ Edit Cage Sum       │
│ Current: 15         │
│ New: [  12  ]       │
│ [Delete] [Cancel]   │
│          [Save]     │
└─────────────────────┘
```

**Options**:
- **Save**: Update the cage sum
- **Delete**: Remove the entire cage
- **Cancel**: Keep existing cage unchanged

---

## ⌨️ **Complete Keyboard Shortcuts**

### **All Modes**
| Key | Action |
|-----|--------|
| `1-9` | Enter number (if allowed in current mode) |
| `Backspace/Delete` | Clear cell |
| `Arrow Keys` | Navigate grid |

### **Question Mode**
| Key | Action |
|-----|--------|
| `1-9` | Place question numbers |
| `Enter` | Complete question setup (same as "Done" button) |

### **Hint Mode**
| Key | Action |
|-----|--------|
| `Click` | Start new cage selection |
| `Shift + Click` | Add/remove cell from selection |
| `Shift + Arrows` | Extend cage selection |
| `Arrow Keys` | Move cursor (clears selection) |
| `Enter` | Create cage from selection |

### **Solve Mode**
| Key | Action |
|-----|--------|
| `1-9` | Fill solution numbers |
| `Backspace/Delete` | Clear answer cell |
| `Arrow Keys` | Navigate to next empty cell |

---

## 🎯 **Validation System**

### **Sudoku Rule Validation**
The app continuously validates:

1. **Row Constraints**: No duplicate numbers in any row
2. **Column Constraints**: No duplicate numbers in any column
3. **Box Constraints**: No duplicate numbers in 3x3 boxes
4. **Cage Constraints**: Cage sums must match target when complete

### **Visual Error Feedback**

```
Invalid cells are highlighted:
┌─────┬─────┬─────┐
│  5  │  3  │  5  │ <- Row has duplicate 5s
│ ▓▓▓ │     │ ▓▓▓ │ <- Red background indicates error
├─────┼─────┼─────┤
│     │     │     │
└─────┴─────┴─────┘
```

### **Cage Sum Validation**

```
Cage sum validation states:
┌─────────────────────┐
│ Target: 15          │
│ ┌─────┬─────┬─────┐ │
│ │ 15⌐ │  7  │  3  │ │ <- Partial sum: 10/15 ✓
│ │     │  ┊  │  ┊  │ │
│ └─────┴─────┴─────┘ │
│ Status: In Progress │
└─────────────────────┘

┌─────────────────────┐
│ Target: 15          │
│ ┌─────┬─────┬─────┐ │
│ │ 15⌐ │  7  │  8  │ │ <- Complete sum: 15 ✓
│ │ ▓▓▓ │ ▓▓▓ │ ▓▓▓ │ │
│ └─────┴─────┴─────┘ │
│ Status: Valid ✓     │
└─────────────────────┘

┌─────────────────────┐
│ Target: 15          │
│ ┌─────┬─────┬─────┐ │
│ │ 15⌐ │  8  │  9  │ │ <- Complete sum: 17 ✗
│ │ ▓▓▓ │ ▓▓▓ │ ▓▓▓ │ │ <- Red indicates error
│ └─────┴─────┴─────┘ │
│ Status: Invalid ✗   │
└─────────────────────┘
```

---

## 🎮 **Usage Examples**

### Example 1: Creating a Simple L-Cage

```
Step-by-step cage creation:

1. Enter Hint Mode
2. Click on cell [1,1]
   ┌─────┬─────┬─────┐
   │  ■  │     │     │ <- Purple cursor
   ├─────┼─────┼─────┤
   │     │     │     │
   └─────┴─────┴─────┘

3. Drag to cell [2,3] 
   ┌─────┬─────┬─────┐
   │  ■  │  ■  │  ■  │ <- L-shaped selection
   ├─────┼─────┼─────┤
   │     │     │  ■  │
   └─────┴─────┴─────┘

4. Press Enter, set sum to 22
   ┌─────┬─────┬─────┐
   │ 22⌐ │ ┈┈┈ │ ┈┈┈ │ <- Cage created
   │ ┊   │ ┊   │ ┊   │
   ├┄┄┄┄┄┼┄┄┄┄┄┼┄┄┄┄┄┤
   │     │     │ ┊   │
   │     │     │ ┊   │
   └─────┴─────┴─────┘
```

### Example 2: Using Keyboard Selection

```
Extending selection with Shift+Arrows:

Start: Click [2,2]
┌─────┬─────┬─────┐
│     │     │     │
├─────┼─────┼─────┤
│     │  ■  │     │ <- Start position
├─────┼─────┼─────┤
│     │     │     │
└─────┴─────┴─────┘

Shift+→: Extend right
┌─────┬─────┬─────┐
│     │     │     │
├─────┼─────┼─────┤
│     │  ■  │  ■  │ <- Extended selection
├─────┼─────┼─────┤
│     │     │     │
└─────┴─────┴─────┘

Shift+↓: Extend down
┌─────┬─────┬─────┐
│     │     │     │
├─────┼─────┼─────┤
│     │  ■  │  ■  │ <- Full selection
├─────┼─────┼─────┤
│     │     │  ■  │
└─────┴─────┴─────┘
```

---

## 🛠️ **Technical Details**

### **Built With**
- **React 18.2** - UI framework with hooks
- **Vite 5.0** - Fast development and build tool
- **TailwindCSS 3.0** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

### **Architecture**
```
src/
├── components/           # React components
│   ├── SudokuGrid.jsx   # Main grid component
│   ├── SudokuCell.jsx   # Individual cell component
│   ├── ModeIndicator.jsx # Mode display and controls
│   ├── ControlButtons.jsx # Number input and actions
│   ├── SumDialog.jsx    # Cage sum input dialog
│   ├── EditCageDialog.jsx # Cage editing interface
│   └── FloatingCageButton.jsx # Context cage button
├── hooks/               # Custom React hooks
│   ├── useSudoku.js     # Main state management
│   └── useSudokuActions.js # Action handlers
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

### **Key Algorithms**
- **Backtracking Solver**: Efficient puzzle solving with constraint checking
- **Real-time Validation**: Continuous rule checking with optimized performance
- **L-Shape Detection**: Smart cage creation with multiple path options
- **Constraint Propagation**: Advanced validation for cage sum constraints

---

## 🎯 **Development**

### **Setup Development Environment**
```bash
# Clone and setup
git clone https://github.com/tuku-dev/SU-DO-KU.git
cd SU-DO-KU
npm install

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### **Project Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🤝 **Contributing**

We welcome contributions! Here are some ways you can help:

### **Feature Ideas**
- [ ] Puzzle difficulty analysis
- [ ] Save/load puzzle functionality
- [ ] Multiple puzzle templates
- [ ] Undo/redo functionality
- [ ] Timer and scoring system
- [ ] Puzzle generation algorithm
- [ ] Mobile touch optimization

### **Bug Reports**
Please open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

### **Pull Requests**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

---

## 🎉 **Acknowledgments**

- Sudoku puzzle concept and rules
- React and Vite communities
- TailwindCSS for excellent styling utilities
- All contributors and testers

---

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/tuku-dev/SU-DO-KU/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tuku-dev/SU-DO-KU/discussions)
- **Email**: [Contact](mailto:contact@example.com)

---

## 🚀 **Live Demo**

Try the live application: [Killer Sudoku Demo](https://your-demo-link.com)

---

**Happy Puzzling! 🧩✨**
