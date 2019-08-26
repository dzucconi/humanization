export const times = <T>(n: number, fn: (num: number) => T): T[] =>
  Array(n)
    .fill(undefined)
    .map((_, i) => fn(i));
