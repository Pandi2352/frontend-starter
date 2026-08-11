import type { StorageKey } from '@/constants/storage';
import { safeJsonParse, safeJsonStringify } from '@/utils/storage';

/**
 * Single typed wrapper around localStorage.
 * Never call localStorage directly anywhere else.
 */
export const storage = {
  get<T>(key: StorageKey): T | null {
    try {
      return safeJsonParse<T>(localStorage.getItem(key));
    } catch {
      return null;
    }
  },

  set<T>(key: StorageKey, value: T): void {
    const raw = safeJsonStringify(value);
    if (raw == null) return;
    try {
      localStorage.setItem(key, raw);
    } catch {
      // Storage full or unavailable — fail silently, app must keep working
    }
  },

  remove(key: StorageKey): void {
    localStorage.removeItem(key);
  },
};
