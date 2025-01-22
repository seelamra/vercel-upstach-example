export const setSessionItem = (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const getSessionItem = (key: string): unknown | null => {
    if (typeof window !== 'undefined') {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  };
  
  export const removeSessionItem = (key: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  };