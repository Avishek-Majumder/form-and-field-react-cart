import { useEffect, useState } from 'react';

// Storage can be unavailable in private browsing or full; the app still works in memory.
export function usePersistentState(key, fallback, validate) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? fallback : validate(JSON.parse(stored));
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the current session usable. */ }
  }, [key, value]);
  return [value, setValue];
}
