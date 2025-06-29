/**
 * CSS generation utilities for userscripts
 */

/**
 * Generates a complete CSS string with Tailwind directives and custom utilities
 */
export function generateTailwindCSS(options: {
  includeBase?: boolean;
  includeComponents?: boolean;
  includeUtilities?: boolean;
  customCSS?: string;
  scope?: string;
} = {}): string {
  const {
    includeBase = true,
    includeComponents = true,
    includeUtilities = true,
    customCSS = '',
    scope = 'userscript'
  } = options;

  const css: string[] = [];

  if (includeBase) {
    css.push('@tailwind base;');
  }

  if (includeComponents) {
    css.push('@tailwind components;');
  }

  if (includeUtilities) {
    css.push('@tailwind utilities;');
  }

  // Add custom layer for userscript-specific styles
  css.push(`
@layer components {
  /* Userscript container with scoping */
  .${scope}-container {
    @apply font-sans text-base leading-normal;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  /* Reset styles for userscript elements to avoid inheritance */
  .${scope}-reset {
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  /* Common userscript patterns */
  .${scope}-floating {
    @apply fixed z-userscript shadow-lg;
  }

  .${scope}-modal {
    @apply fixed inset-0 z-userscript-modal;
  }

  .${scope}-overlay {
    @apply fixed inset-0 bg-overlay-backdrop z-userscript-overlay;
  }

  .${scope}-card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700;
  }

  .${scope}-button {
    @apply px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .${scope}-button-primary {
    @apply bg-userscript-500 hover:bg-userscript-600 text-white focus:ring-userscript-500;
  }

  .${scope}-button-secondary {
    @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-gray-500;
  }

  .${scope}-input {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-userscript-500 focus:border-transparent transition-colors;
  }
}
`);

  // Add custom CSS if provided
  if (customCSS) {
    css.push(customCSS);
  }

  return css.join('\n');
}

/**
 * Generates CSS for specific userscript scenarios
 */
export const cssTemplates = {
  /**
   * CSS for a floating widget userscript
   */
  floatingWidget: (scope = 'userscript') => generateTailwindCSS({
    customCSS: `
.${scope}-widget {
  @apply ${scope}-floating bottom-4 right-4 ${scope}-card p-4 max-w-sm animate-bounce-in;
}

.${scope}-widget-toggle {
  @apply ${scope}-floating bottom-4 right-4 ${scope}-button ${scope}-button-primary rounded-full p-3 animate-bounce-in;
}

.${scope}-widget-content {
  @apply space-y-3;
}
    `
  }),

  /**
   * CSS for a modal dialog userscript
   */
  modalDialog: (scope = 'userscript') => generateTailwindCSS({
    customCSS: `
.${scope}-modal-container {
  @apply ${scope}-modal flex items-center justify-center p-4;
}

.${scope}-modal-content {
  @apply ${scope}-card max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in;
}

.${scope}-modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700;
}

.${scope}-modal-body {
  @apply p-6;
}

.${scope}-modal-footer {
  @apply flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700;
}
    `
  }),

  /**
   * CSS for a notification toast userscript
   */
  notificationToast: (scope = 'userscript') => generateTailwindCSS({
    customCSS: `
.${scope}-toast-container {
  @apply fixed top-4 right-4 max-w-sm w-full z-userscript-tooltip space-y-3;
}

.${scope}-toast {
  @apply ${scope}-card p-4 animate-slide-in;
}

.${scope}-toast-success {
  @apply bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200;
}

.${scope}-toast-error {
  @apply bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200;
}

.${scope}-toast-warning {
  @apply bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200;
}

.${scope}-toast-info {
  @apply bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200;
}
    `
  }),

  /**
   * CSS for a sidebar userscript
   */
  sidebar: (scope = 'userscript') => generateTailwindCSS({
    customCSS: `
.${scope}-sidebar {
  @apply ${scope}-floating top-0 left-0 h-full w-80 ${scope}-card rounded-none rounded-r-xl transform transition-transform duration-300 overflow-y-auto;
}

.${scope}-sidebar-hidden {
  @apply -translate-x-full;
}

.${scope}-sidebar-toggle {
  @apply ${scope}-floating top-4 left-4 ${scope}-button ${scope}-button-primary p-2 rounded-lg;
}

.${scope}-sidebar-content {
  @apply p-6 space-y-4;
}

.${scope}-sidebar-header {
  @apply border-b border-gray-200 dark:border-gray-700 pb-4 mb-4;
}
    `
  }),
};

/**
 * Utility to inline CSS for userscripts that can't use external stylesheets
 */
export function inlineCSS(css: string): string {
  // Remove comments and minify CSS
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
    .replace(/\s*{\s*/g, '{') // Clean up braces
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*,\s*/g, ',') // Clean up commas
    .replace(/\s*:\s*/g, ':') // Clean up colons
    .trim();
}