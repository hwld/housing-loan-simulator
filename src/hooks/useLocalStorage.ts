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

export const useLocalStorage = <T>(key: string) => {
  const [value, setValue] = useState<T>();

  const writeValue = (
    value: T | undefined | ((prevState: T | undefined) => T | undefined)
  ) => {
    try {
      if (value instanceof Function) {
        setValue((currentState) => {
          const result = value(currentState);
          window.localStorage.setItem(key, serializeJSON(result));
          return result;
        });
      } else {
        window.localStorage.setItem(key, serializeJSON(value));
        setValue(value);
      }
    } catch {
      throw new Error("Failed to set value in localStorage");
    }
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(undefined);
  };

  // 同一keyのデータが変更されたときに、stateを更新する
  useEffect(() => {
    const changeValue = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === key) {
        setValue(deserializeJSON(event.newValue) ?? undefined);
      }
    };

    window.addEventListener("storage", changeValue);
    return () => window.removeEventListener("storage", changeValue);
  }, [key]);

  // keyが変更されたときに、localStorageからデータを読み込む
  useEffect(() => {
    const data = window.localStorage.getItem(key);
    setValue(deserializeJSON(data) ?? undefined);
  }, [key]);

  return { value, writeValue, removeValue };
};
