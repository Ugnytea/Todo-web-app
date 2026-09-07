import { useRef, useEffect } from "react";

export default function useFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
}
