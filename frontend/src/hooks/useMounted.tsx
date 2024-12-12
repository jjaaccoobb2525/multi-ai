"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/* eslint-disable */

export default function useMounted({ isAsync }: { isAsync: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isAsync) {
      setIsMounted(true);
    }
  }, [isAsync]);

  useLayoutEffect(() => {
    if (!isAsync) {
      setIsMounted(true);
    }
  }, [isAsync]);

  return isMounted;
}
