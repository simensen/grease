/**
 * Type declarations for Greasemonkey/Tampermonkey functions
 */

declare global {
  function GM_getValue<T>(key: string, defaultValue?: T): T;
  function GM_setValue<T>(key: string, value: T): void;
  function GM_deleteValue(key: string): void;
  function GM_listValues(): string[];
  function GM_addStyle(css: string): HTMLStyleElement;
  function GM_xmlhttpRequest(details: {
    method?: string;
    url: string;
    headers?: Record<string, string>;
    data?: string;
    onload?: (response: any) => void;
    onerror?: (error: any) => void;
  }): void;
}

export {};