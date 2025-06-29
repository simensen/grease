import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  debounce,
  throttle,
  sleep,
  getCurrentDomain,
  isUrlMatch,
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  EventEmitter,
} from './utils';

describe('Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('debounce', () => {
    it('should delay function execution', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on subsequent calls', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      vi.advanceTimersByTime(50);
      debouncedFn('second');
      vi.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledWith('second');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('should limit function execution rate', () => {
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      expect(mockFn).toHaveBeenCalledWith('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn('second');
      expect(mockFn).toHaveBeenCalledTimes(1); // Still only called once

      vi.advanceTimersByTime(100);
      throttledFn('third');
      expect(mockFn).toHaveBeenCalledWith('third');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      vi.useRealTimers();
      const start = Date.now();
      await sleep(10);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(9); // Allow some variance
    });
  });

  describe('getCurrentDomain', () => {
    it('should return current hostname', () => {
      expect(getCurrentDomain()).toBe('example.com');
    });
  });

  describe('isUrlMatch', () => {
    it('should match exact URL patterns', () => {
      expect(isUrlMatch('example.com', 'https://example.com/path')).toBe(true);
      expect(isUrlMatch('other.com', 'https://example.com/path')).toBe(false);
    });

    it('should match wildcard patterns', () => {
      expect(isUrlMatch('https://example.com/*', 'https://example.com/path')).toBe(true);
      expect(isUrlMatch('https://example.com/*', 'https://other.com/path')).toBe(false);
      expect(isUrlMatch('*example.com*', 'https://sub.example.com/path')).toBe(true);
    });

    it('should use current URL by default', () => {
      expect(isUrlMatch('example.com')).toBe(true);
      expect(isUrlMatch('other.com')).toBe(false);
    });
  });

  describe('getQueryParam', () => {
    it('should get query parameter from URL', () => {
      expect(getQueryParam('param1', 'https://example.com?param1=value1&param2=value2')).toBe('value1');
      expect(getQueryParam('param2', 'https://example.com?param1=value1&param2=value2')).toBe('value2');
      expect(getQueryParam('nonexistent', 'https://example.com?param1=value1')).toBe(null);
    });

    it('should use current URL by default', () => {
      expect(getQueryParam('param1')).toBe('value1');
      expect(getQueryParam('param2')).toBe('value2');
    });
  });

  describe('setQueryParam', () => {
    it('should set query parameter in URL', () => {
      const result = setQueryParam('newParam', 'newValue', 'https://example.com?existing=value');
      expect(result).toBe('https://example.com/?existing=value&newParam=newValue');
    });

    it('should update existing query parameter', () => {
      const result = setQueryParam('param1', 'newValue', 'https://example.com?param1=oldValue');
      expect(result).toBe('https://example.com/?param1=newValue');
    });

    it('should use current URL by default', () => {
      const result = setQueryParam('newParam', 'newValue');
      expect(result).toContain('newParam=newValue');
    });
  });

  describe('removeQueryParam', () => {
    it('should remove query parameter from URL', () => {
      const result = removeQueryParam('param1', 'https://example.com?param1=value1&param2=value2');
      expect(result).toBe('https://example.com/?param2=value2');
    });

    it('should handle non-existent parameters gracefully', () => {
      const result = removeQueryParam('nonexistent', 'https://example.com?param1=value1');
      expect(result).toBe('https://example.com/?param1=value1');
    });

    it('should use current URL by default', () => {
      const result = removeQueryParam('param1');
      expect(result).not.toContain('param1=');
      expect(result).toContain('param2=value2');
    });
  });

  describe('EventEmitter', () => {
    let emitter: EventEmitter<{ test: string; number: number }>;

    beforeEach(() => {
      emitter = new EventEmitter();
    });

    it('should register and call event listeners', () => {
      const mockListener = vi.fn();
      emitter.on('test', mockListener);
      
      emitter.emit('test', 'test data');
      
      expect(mockListener).toHaveBeenCalledWith('test data');
    });

    it('should handle multiple listeners for same event', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      emitter.on('test', listener1);
      emitter.on('test', listener2);
      
      emitter.emit('test', 'test data');
      
      expect(listener1).toHaveBeenCalledWith('test data');
      expect(listener2).toHaveBeenCalledWith('test data');
    });

    it('should remove specific listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      emitter.on('test', listener1);
      emitter.on('test', listener2);
      emitter.off('test', listener1);
      
      emitter.emit('test', 'test data');
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalledWith('test data');
    });

    it('should handle different event types', () => {
      const stringListener = vi.fn();
      const numberListener = vi.fn();
      
      emitter.on('test', stringListener);
      emitter.on('number', numberListener);
      
      emitter.emit('test', 'string data');
      emitter.emit('number', 42);
      
      expect(stringListener).toHaveBeenCalledWith('string data');
      expect(numberListener).toHaveBeenCalledWith(42);
    });

    it('should remove all listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      emitter.on('test', listener1);
      emitter.on('number', listener2);
      emitter.removeAllListeners();
      
      emitter.emit('test', 'test data');
      emitter.emit('number', 42);
      
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
    });

    it('should handle events with no listeners gracefully', () => {
      expect(() => {
        emitter.emit('test', 'test data');
      }).not.toThrow();
    });
  });
});