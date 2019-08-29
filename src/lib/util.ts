export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export const isPromise = (val: void | Promise<any>): val is Promise<any> =>
  val && (<Promise<any>>val).then !== undefined;

export const times = <T>(n: number, fn: (num: number) => T): T[] =>
  Array(n)
    .fill(undefined)
    .map((_, i) => fn(i));
