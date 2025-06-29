import './types';

/**
 * Storage utilities for userscripts
 */

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getStorageItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? safeJsonParse(item, fallback) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function clearStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
}

/**
 * GM_setValue/GM_getValue compatible storage wrapper
 */
export interface GreaseStorage {
  getValue<T>(key: string, fallback: T): T;
  setValue<T>(key: string, value: T): void;
  deleteValue(key: string): void;
  listValues(): string[];
}

export function createStorageWrapper(): GreaseStorage {
  // Use GM_* functions if available, otherwise fallback to localStorage
  const hasGM = typeof GM_getValue !== 'undefined';
  
  return {
    getValue<T>(key: string, fallback: T): T {
      if (hasGM) {
        return GM_getValue(key, fallback);
      }
      return getStorageItem(key, fallback);
    },
    
    setValue<T>(key: string, value: T): void {
      if (hasGM) {
        GM_setValue(key, value);
      } else {
        setStorageItem(key, value);
      }
    },
    
    deleteValue(key: string): void {
      if (hasGM) {
        GM_deleteValue(key);
      } else {
        removeStorageItem(key);
      }
    },
    
    listValues(): string[] {
      if (hasGM) {
        return GM_listValues();
      }
      return Object.keys(localStorage);
    }
  };
}