import { useCallback } from "react";

// utils/throttle.ts
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let throttling = false;

  return useCallback(function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    if (!throttling) {
      fn(...args);
      throttling = true;

      setTimeout(() => {
        throttling = false;
      }, limit);
    }
  },
  []);
}
