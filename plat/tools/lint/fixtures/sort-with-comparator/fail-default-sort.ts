// A sort without a comparator compares string conversions; refused on every receiver (C-0125).
export function f(xs: number[], ys: Float64Array, zs?: string[]): unknown[] {
  xs.sort(); // planted: noComparator
  const a = xs.toSorted(); // planted: noComparator
  xs.sort(undefined); // planted: noComparator
  zs?.sort(); // planted: noComparator
  ys.sort(); // planted: noComparator
  Array.prototype.sort.call(xs); // planted: sortAsValue
  const alias = xs.toSorted; // planted: sortAsValue
  return [a, [3, 1].sort(), alias]; // planted: noComparator
}
