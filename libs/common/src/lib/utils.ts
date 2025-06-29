/**
 * General utility functions for userscripts
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCurrentDomain(): string {
  return window.location.hostname;
}

export function isUrlMatch(pattern: string, url: string = window.location.href): boolean {
  if (pattern.includes('*')) {
    const regexPattern = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\\\*/g, '.*');
    return new RegExp(`^${regexPattern}$`).test(url);
  }
  return url.includes(pattern);
}

export function getQueryParam(name: string, url: string = window.location.href): string | null {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(name);
}

export function setQueryParam(name: string, value: string, url: string = window.location.href): string {
  const urlObj = new URL(url);
  urlObj.searchParams.set(name, value);
  return urlObj.toString();
}

export function removeQueryParam(name: string, url: string = window.location.href): string {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(name);
  return urlObj.toString();
}

/**
 * Simple event emitter for userscript communication
 */
export class EventEmitter<T extends Record<string, any>> {
  private listeners: Map<keyof T, Array<(data: any) => void>> = new Map();

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}