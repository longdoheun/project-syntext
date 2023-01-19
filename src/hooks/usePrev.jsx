import React, { useEffect, useRef } from "react";

export default function usePrev(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
