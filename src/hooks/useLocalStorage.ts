import { useCallback, useState } from 'react';

import type { StorageKey } from '@/constants/storage';
import { storage } from '@/services/storage';

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {
  const [value, setValue] = useState<T>(() => storage.get<T>(key) ?? initialValue);

  const setStoredValue = useCallback(
    (next: T) => {
      storage.set(key, next);
      setValue(next);
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
