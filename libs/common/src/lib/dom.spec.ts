import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitForElement, createElement, addStyles, onReady } from './dom';

describe('DOM utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document mock
    document.querySelector = vi.fn();
    document.createElement = vi.fn();
    document.createTextNode = vi.fn();
    document.addEventListener = vi.fn();
    if (!document.head) {
      (document as any).head = { appendChild: vi.fn() };
    } else {
      document.head.appendChild = vi.fn();
    }
  });

  describe('waitForElement', () => {
    it('should resolve immediately if element exists', async () => {
      const mockElement = { id: 'test' };
      vi.mocked(document.querySelector).mockReturnValue(mockElement as any);

      const result = await waitForElement('#test');
      expect(result).toBe(mockElement);
      expect(document.querySelector).toHaveBeenCalledWith('#test');
    });

    it('should reject if element not found within timeout', async () => {
      vi.mocked(document.querySelector).mockReturnValue(null);
      
      const promise = waitForElement('#nonexistent', 100);
      
      await expect(promise).rejects.toThrow('Element #nonexistent not found within 100ms');
    });

    it('should observe DOM changes when element not initially found', async () => {
      vi.mocked(document.querySelector).mockReturnValue(null);
      
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      vi.mocked(global.MutationObserver).mockReturnValue(mockObserver as any);

      const promise = waitForElement('#test', 100);
      
      expect(mockObserver.observe).toHaveBeenCalledWith(document.body, {
        childList: true,
        subtree: true,
      });

      // Clean up
      await expect(promise).rejects.toThrow();
    });
  });

  describe('createElement', () => {
    it('should create element with tag name', () => {
      const mockElement = {
        appendChild: vi.fn(),
        setAttribute: vi.fn(),
      };
      vi.mocked(document.createElement).mockReturnValue(mockElement as any);
      vi.mocked(document.createTextNode).mockImplementation((text) => ({ textContent: text } as any));

      const result = createElement('div');

      expect(document.createElement).toHaveBeenCalledWith('div');
      expect(result).toBe(mockElement);
    });

    it('should set attributes on element', () => {
      const mockElement = {
        appendChild: vi.fn(),
        id: '',
        className: '',
      };
      vi.mocked(document.createElement).mockReturnValue(mockElement as any);

      createElement('div', { id: 'test', className: 'test-class' });

      expect(mockElement.id).toBe('test');
      expect(mockElement.className).toBe('test-class');
    });

    it('should append string children as text nodes', () => {
      const mockElement = { appendChild: vi.fn() };
      const mockTextNode = { textContent: 'test text' };
      vi.mocked(document.createElement).mockReturnValue(mockElement as any);
      vi.mocked(document.createTextNode).mockReturnValue(mockTextNode as any);

      createElement('div', {}, ['test text']);

      expect(document.createTextNode).toHaveBeenCalledWith('test text');
      expect(mockElement.appendChild).toHaveBeenCalledWith(mockTextNode);
    });

    it('should append node children directly', () => {
      const mockElement = { appendChild: vi.fn() };
      const mockChild = { nodeName: 'SPAN' };
      vi.mocked(document.createElement).mockReturnValue(mockElement as any);

      createElement('div', {}, [mockChild as any]);

      expect(mockElement.appendChild).toHaveBeenCalledWith(mockChild);
    });
  });

  describe('addStyles', () => {
    it('should create style element and add to head', () => {
      const mockStyleElement = { textContent: '' };
      vi.mocked(document.createElement).mockReturnValue(mockStyleElement as any);

      const result = addStyles('body { color: red; }');

      expect(document.createElement).toHaveBeenCalledWith('style');
      expect(mockStyleElement.textContent).toBe('body { color: red; }');
      expect(document.head.appendChild).toHaveBeenCalledWith(mockStyleElement);
      expect(result).toBe(mockStyleElement);
    });
  });

  describe('onReady', () => {
    it('should call callback immediately if document is ready', () => {
      const mockCallback = vi.fn();
      Object.defineProperty(document, 'readyState', { value: 'complete', writable: true });

      onReady(mockCallback);

      expect(mockCallback).toHaveBeenCalled();
    });

    it('should add event listener if document is loading', () => {
      const mockCallback = vi.fn();
      Object.defineProperty(document, 'readyState', { value: 'loading', writable: true });

      onReady(mockCallback);

      expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', mockCallback);
    });
  });
});