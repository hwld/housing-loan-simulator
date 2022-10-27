import { useEffect, useState } from "react";

const serializeJSON = <T>(value: T) => {
  try {
    return JSON.stringify(value);
  } catch {
    throw new Error("Failed to serialize the value");
  }
};

const deserializeJSON = (value: string | null) => {
  try {
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const useLocalStorage = <T>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const writeValue = (value: T) => {
    try {
      window.localStorage.setItem(key, serializeJSON(value));
      setValue(value);
    } catch {
      throw new Error("Failed to set value in localStorage");
    }
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
  };

  useEffect(() => {
    const changeValue = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === key) {
        setValue(deserializeJSON(event.newValue) ?? undefined);
      }
    };

    window.addEventListener("storage", changeValue);
    return () => window.removeEventListener("storage", changeValue);
  }, [key]);

  return { value, writeValue, removeValue };
};
