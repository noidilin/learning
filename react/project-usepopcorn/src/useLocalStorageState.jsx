import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  // NOTE:: use callback as initial value to retrive data store in local storage
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    return () => {};
  }, [value, key]);

  return [value, setValue];
}
