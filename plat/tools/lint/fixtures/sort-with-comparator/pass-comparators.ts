// Every sort passes a comparator; a function named sort and other methods are not sorts.
declare function sort(xs: number[]): number[];
const byValue = (a: number, b: number): number => a - b;
export function f(xs: number[], ys: Float64Array): number[] {
  xs.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  ys.sort(byValue);
  xs?.sort(byValue);
  (xs as number[]).sort(byValue);
  return [...xs.toSorted(byValue), ...sort(xs)];
}
