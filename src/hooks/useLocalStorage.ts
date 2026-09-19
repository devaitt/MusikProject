import { useState, useEffect } from "react";

interface Props<T> {
  key: string;
  initialValue: T;
  parse?: (raw: T) => T;
}

export function useLocalStorage<T>({
  key,
  initialValue,
  parse,
}: Props<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const existingValue = localStorage.getItem(key);
    if (!existingValue) {
      return initialValue;
    }
    try {
      const parsedValue = JSON.parse(existingValue) as T;
      return parse ? parse(parsedValue) : parsedValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
