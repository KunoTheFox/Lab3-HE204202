import { useEffect, useState } from "react";

export default function useLocalStorage(key, initalValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    //     [
    //   {
    //     id: 1,
    //     text: "Học React",
    //   },
    // ];
    return initalValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
