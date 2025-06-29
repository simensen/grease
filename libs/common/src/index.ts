// Main export - re-exports everything for convenience
export * from './lib/common';

// Individual module exports for tree-shaking and selective imports
export * as DOM from './lib/dom';
export * as Storage from './lib/storage';
export * as Utils from './lib/utils';
