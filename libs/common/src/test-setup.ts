import { vi } from 'vitest';

// Setup DOM environment
import 'jsdom';

// Global mocks
global.MutationObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Setup window.location
Object.defineProperty(window, 'location', {
  value: {
    hostname: 'example.com',
    href: 'https://example.com/path?param1=value1&param2=value2',
  },
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock Greasemonkey functions (they may or may not be available)
(global as any).GM_getValue = vi.fn();
(global as any).GM_setValue = vi.fn();
(global as any).GM_deleteValue = vi.fn();
(global as any).GM_listValues = vi.fn();