// utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
