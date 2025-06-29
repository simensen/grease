/**
 * CSS utility functions and common patterns for userscripts
 */

/**
 * Generates CSS for a floating action button
 */
export const floatingButton = {
  base: `
    fixed bottom-4 right-4 
    bg-userscript-500 hover:bg-userscript-600 
    text-white rounded-full p-3 
    shadow-lg hover:shadow-xl 
    transition-all duration-200 
    z-userscript
    animate-bounce-in
  `,
  small: `
    fixed bottom-4 right-4 
    bg-userscript-500 hover:bg-userscript-600 
    text-white rounded-full p-2 
    shadow-md hover:shadow-lg 
    transition-all duration-200 
    z-userscript
    text-sm
  `,
  large: `
    fixed bottom-6 right-6 
    bg-userscript-500 hover:bg-userscript-600 
    text-white rounded-full p-4 
    shadow-xl hover:shadow-2xl 
    transition-all duration-200 
    z-userscript
    text-lg
  `,
};

/**
 * Generates CSS for modal overlays
 */
export const modal = {
  overlay: `
    fixed inset-0 
    bg-overlay-backdrop 
    backdrop-blur-sm 
    z-userscript-overlay
    animate-fade-in
  `,
  container: `
    fixed inset-0 
    flex items-center justify-center 
    p-4 z-userscript-modal
  `,
  content: `
    bg-white dark:bg-gray-800 
    rounded-2xl shadow-2xl 
    max-w-md w-full 
    max-h-[90vh] overflow-y-auto
    animate-bounce-in
  `,
  header: `
    flex items-center justify-between 
    p-6 border-b border-gray-200 dark:border-gray-700
  `,
  body: `
    p-6
  `,
  footer: `
    flex justify-end gap-3 
    p-6 border-t border-gray-200 dark:border-gray-700
  `,
};

/**
 * Generates CSS for notification toasts
 */
export const toast = {
  container: `
    fixed top-4 right-4 
    max-w-sm w-full 
    z-userscript-tooltip
  `,
  base: `
    bg-white dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-xl shadow-lg 
    p-4 mb-3 
    animate-slide-in
  `,
  success: `
    bg-green-50 dark:bg-green-900/20 
    border-green-200 dark:border-green-800 
    text-green-800 dark:text-green-200
  `,
  error: `
    bg-red-50 dark:bg-red-900/20 
    border-red-200 dark:border-red-800 
    text-red-800 dark:text-red-200
  `,
  warning: `
    bg-yellow-50 dark:bg-yellow-900/20 
    border-yellow-200 dark:border-yellow-800 
    text-yellow-800 dark:text-yellow-200
  `,
  info: `
    bg-blue-50 dark:bg-blue-900/20 
    border-blue-200 dark:border-blue-800 
    text-blue-800 dark:text-blue-200
  `,
};

/**
 * Generates CSS for tooltips
 */
export const tooltip = {
  base: `
    absolute z-userscript-tooltip 
    px-3 py-2 text-sm 
    bg-gray-900 dark:bg-gray-700 
    text-white rounded-lg 
    shadow-lg animate-fade-in 
    whitespace-nowrap
  `,
  arrow: `
    absolute w-2 h-2 
    bg-gray-900 dark:bg-gray-700 
    transform rotate-45
  `,
};

/**
 * Generates CSS for form elements that blend well with userscripts
 */
export const form = {
  input: `
    w-full px-3 py-2 
    border border-gray-300 dark:border-gray-600 
    rounded-lg bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100 
    focus:ring-2 focus:ring-userscript-500 
    focus:border-transparent 
    transition-colors
  `,
  button: {
    primary: `
      px-4 py-2 
      bg-userscript-500 hover:bg-userscript-600 
      text-white rounded-lg 
      font-medium transition-colors 
      focus:ring-2 focus:ring-userscript-500 focus:ring-offset-2
    `,
    secondary: `
      px-4 py-2 
      bg-gray-200 hover:bg-gray-300 
      dark:bg-gray-700 dark:hover:bg-gray-600 
      text-gray-900 dark:text-gray-100 
      rounded-lg font-medium transition-colors 
      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    `,
    ghost: `
      px-4 py-2 
      text-gray-700 hover:text-gray-900 
      dark:text-gray-300 dark:hover:text-gray-100 
      hover:bg-gray-100 dark:hover:bg-gray-800 
      rounded-lg font-medium transition-colors
    `,
  },
  select: `
    w-full px-3 py-2 
    border border-gray-300 dark:border-gray-600 
    rounded-lg bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100 
    focus:ring-2 focus:ring-userscript-500 
    focus:border-transparent 
    transition-colors
  `,
  textarea: `
    w-full px-3 py-2 
    border border-gray-300 dark:border-gray-600 
    rounded-lg bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100 
    focus:ring-2 focus:ring-userscript-500 
    focus:border-transparent 
    transition-colors resize-vertical
  `,
};

/**
 * Generates CSS for loading states
 */
export const loading = {
  spinner: `
    animate-spin rounded-full 
    border-2 border-gray-200 
    border-t-userscript-500
  `,
  pulse: `
    animate-pulse-slow 
    bg-gray-200 dark:bg-gray-700 
    rounded
  `,
  dots: `
    flex space-x-1
  `,
  dot: `
    w-2 h-2 bg-userscript-500 rounded-full 
    animate-bounce
  `,
};

/**
 * Utility function to combine CSS classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Dark mode utilities
 */
export const darkMode = {
  toggle: `
    p-2 rounded-lg 
    bg-gray-200 dark:bg-gray-700 
    text-gray-800 dark:text-gray-200 
    hover:bg-gray-300 dark:hover:bg-gray-600 
    transition-colors
  `,
  container: `
    bg-white dark:bg-gray-900 
    text-gray-900 dark:text-gray-100
  `,
  surface: `
    bg-gray-50 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700
  `,
};