import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  safeJsonParse,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  createStorageWrapper,
} from './storage';

describe('Storage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {});
      expect(result).toEqual({ key: 'value' });
    });

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true };
      const result = safeJsonParse('invalid json', fallback);
      expect(result).toBe(fallback);
    });

    it('should return fallback for empty string', () => {
      const fallback = { default: true };
      const result = safeJsonParse('', fallback);
      expect(result).toBe(fallback);
    });
  });

  describe('getStorageItem', () => {
    it('should return parsed value when item exists', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('{"test": true}');
      
      const result = getStorageItem('testKey', { default: false });
      
      expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual({ test: true });
    });

    it('should return fallback when item does not exist', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      
      const fallback = { default: true };
      const result = getStorageItem('nonexistentKey', fallback);
      
      expect(result).toBe(fallback);
    });

    it('should return fallback when localStorage throws error', () => {
      vi.mocked(localStorage.getItem).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const fallback = { default: true };
      const result = getStorageItem('errorKey', fallback);
      
      expect(result).toBe(fallback);
    });
  });

  describe('setStorageItem', () => {
    it('should set item and return true on success', () => {
      const result = setStorageItem('testKey', { test: true });
      
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', '{"test":true}');
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = setStorageItem('errorKey', { test: true });
      
      expect(result).toBe(false);
    });
  });

  describe('removeStorageItem', () => {
    it('should remove item and return true on success', () => {
      const result = removeStorageItem('testKey');
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      vi.mocked(localStorage.removeItem).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = removeStorageItem('errorKey');
      
      expect(result).toBe(false);
    });
  });

  describe('clearStorage', () => {
    it('should clear storage and return true on success', () => {
      const result = clearStorage();
      
      expect(localStorage.clear).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      vi.mocked(localStorage.clear).mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = clearStorage();
      
      expect(result).toBe(false);
    });
  });

  describe('createStorageWrapper', () => {
    describe('when GM functions are available', () => {
      beforeEach(() => {
        // Mock GM functions as available
        (global as any).GM_getValue = vi.fn();
        (global as any).GM_setValue = vi.fn();
        (global as any).GM_deleteValue = vi.fn();
        (global as any).GM_listValues = vi.fn();
      });

      it('should use GM_getValue', () => {
        vi.mocked((global as any).GM_getValue).mockReturnValue('test value');
        
        const wrapper = createStorageWrapper();
        const result = wrapper.getValue('testKey', 'fallback');
        
        expect((global as any).GM_getValue).toHaveBeenCalledWith('testKey', 'fallback');
        expect(result).toBe('test value');
      });

      it('should use GM_setValue', () => {
        const wrapper = createStorageWrapper();
        wrapper.setValue('testKey', 'test value');
        
        expect((global as any).GM_setValue).toHaveBeenCalledWith('testKey', 'test value');
      });

      it('should use GM_deleteValue', () => {
        const wrapper = createStorageWrapper();
        wrapper.deleteValue('testKey');
        
        expect((global as any).GM_deleteValue).toHaveBeenCalledWith('testKey');
      });

      it('should use GM_listValues', () => {
        vi.mocked((global as any).GM_listValues).mockReturnValue(['key1', 'key2']);
        
        const wrapper = createStorageWrapper();
        const result = wrapper.listValues();
        
        expect((global as any).GM_listValues).toHaveBeenCalled();
        expect(result).toEqual(['key1', 'key2']);
      });
    });

    describe('when GM functions are not available', () => {
      beforeEach(() => {
        // Remove GM functions
        delete (global as any).GM_getValue;
        delete (global as any).GM_setValue;
        delete (global as any).GM_deleteValue;
        delete (global as any).GM_listValues;
      });

      it('should fallback to localStorage for getValue', () => {
        vi.mocked(localStorage.getItem).mockReturnValue('"test value"');
        
        const wrapper = createStorageWrapper();
        const result = wrapper.getValue('testKey', 'fallback');
        
        expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
        expect(result).toBe('test value');
      });

      it('should fallback to localStorage for setValue', () => {
        const wrapper = createStorageWrapper();
        wrapper.setValue('testKey', 'test value');
        
        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', '"test value"');
      });

      it('should fallback to localStorage for deleteValue', () => {
        const wrapper = createStorageWrapper();
        wrapper.deleteValue('testKey');
        
        expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
      });

      it('should fallback to localStorage for listValues', () => {
        Object.keys = vi.fn().mockReturnValue(['key1', 'key2']);
        
        const wrapper = createStorageWrapper();
        const result = wrapper.listValues();
        
        expect(result).toEqual(['key1', 'key2']);
      });
    });
  });
});