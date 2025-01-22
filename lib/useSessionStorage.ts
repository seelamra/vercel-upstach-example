import { useState, useEffect } from 'react';

export const useSessionStorage = (key: string, defaultValue: unknown = null) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value !== null) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const removeValue = () => {
    sessionStorage.removeItem(key);
    setValue(null);
  };

  return [value, setValue, removeValue] as const;
};