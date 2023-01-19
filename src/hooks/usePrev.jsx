import { useEffect, useRef } from "react";

export default function usePrev(tagState) {
  const ref = useRef(tagState);
  useEffect(() => {
    ref.current = tagState;
  }, [tagState]);
  return ref.current;
}
