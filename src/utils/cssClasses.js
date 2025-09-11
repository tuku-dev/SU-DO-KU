// Global CSS classes for consistent styling across components

// ============= BASE CLASSES =============
export const baseClasses = {
  // Button foundations
  buttonBase: "font-medium transition-colors rounded",
  buttonSmall: "px-3 py-2 text-sm",
  buttonMedium: "px-4 py-2",
  buttonLarge: "px-6 py-3 text-lg",
  
  // Text styles
  textHeading: "text-xl font-bold text-gray-900",
  textDescription: "text-gray-700",
  textHelp: "text-xs text-gray-500",
  textCenter: "text-center py-2",
  
  // Input styles
  input: "w-full p-2 mb-4 text-gray-900 border rounded",
  
  // Layout
  overlay: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
  dialog: "bg-white p-6 rounded-lg shadow-lg",
  dialogSmall: "w-full max-w-sm mx-4",
  
  // Transitions and effects
  transition: "transition-all duration-200",
  hoverScale: "hover:scale-105",
  shadow: "shadow-lg",
};

// ============= BUTTON VARIANTS =============
export const buttonVariants = {
  // Primary buttons (blue)
  primary: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-blue-500 text-white hover:bg-blue-600`,
  primarySmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-blue-500 text-white hover:bg-blue-600`,
  
  // Secondary buttons (gray)
  secondary: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-gray-500 text-white hover:bg-gray-600`,
  secondarySmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-gray-500 text-white hover:bg-gray-600`,
  
  // Success buttons (green)
  success: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-green-500 text-white hover:bg-green-600`,
  successSmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-green-500 text-white hover:bg-green-600`,
  
  // Danger buttons (red)
  danger: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-red-500 text-white hover:bg-red-600`,
  dangerSmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-red-500 text-white hover:bg-red-600`,
  
  // Warning buttons (yellow)
  warning: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-yellow-500 text-white hover:bg-yellow-600`,
  warningSmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-yellow-500 text-white hover:bg-yellow-600`,
  
  // Orange buttons
  orange: `${baseClasses.buttonBase} ${baseClasses.buttonMedium} bg-orange-500 text-white hover:bg-orange-600`,
  orangeSmall: `${baseClasses.buttonBase} ${baseClasses.buttonSmall} bg-orange-500 text-white hover:bg-orange-600`,
  
  // Special variants for different contexts
  modeButton: `border p-2 m-1 ${baseClasses.buttonBase}`,
  floatingButton: `${baseClasses.buttonSmall} ${baseClasses.transition} ${baseClasses.hoverScale} ${baseClasses.shadow} pointer-events-auto`,
  themeToggle: `fixed top-4 right-4 z-50 p-3 rounded-full ${baseClasses.shadow} ${baseClasses.transition} hover:scale-110`,
};

// ============= DIALOG CLASSES =============
export const dialogClasses = {
  overlay: baseClasses.overlay,
  container: `${baseClasses.dialog} ${baseClasses.dialogSmall}`,
  containerLarge: `${baseClasses.dialog} w-full max-w-md mx-4`,
  heading: `mb-4 ${baseClasses.textHeading}`,
  description: `mb-4 ${baseClasses.textDescription}`,
  input: baseClasses.input,
  buttonRow: "flex gap-2",
  helpText: `mt-2 ${baseClasses.textHelp}`,
};

// ============= TEXT CLASSES =============
export const textClasses = {
  heading: baseClasses.textHeading,
  description: baseClasses.textDescription,
  help: baseClasses.textHelp,
  center: baseClasses.textCenter,
  
  // Color variants
  red: "text-red-500",
  blue: "text-blue-500", 
  green: "text-green-500",
  yellow: "text-yellow-500",
  
  // Size variants
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

// ============= UTILITY FUNCTIONS =============

/**
 * Combines multiple class strings, handling undefined/null values
 * @param {...string} classes - Class strings to combine
 * @returns {string} Combined class string
 */
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ').trim();
};

/**
 * Creates a button class string with optional modifiers
 * @param {string} variant - Button variant from buttonVariants
 * @param {string} additional - Additional classes to append
 * @returns {string} Complete button class string
 */
export const createButtonClass = (variant, additional = '') => {
  return combineClasses(buttonVariants[variant], additional);
};

/**
 * Creates a dialog class string with optional modifiers
 * @param {string} element - Dialog element (overlay, container, etc.)
 * @param {string} additional - Additional classes to append
 * @returns {string} Complete dialog class string
 */
export const createDialogClass = (element, additional = '') => {
  return combineClasses(dialogClasses[element], additional);
};
