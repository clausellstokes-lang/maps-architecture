// The unit vocabulary (§2.1; M0-s-02): every table column, metric and field that names its unit by a word takes it
// from this one list — `perKm2` and `per100m` included (the design correction of 2026-10-03, M0-spec-notes N-18).
// Volume 11's ColumnSpec.unit and volume 12's metric Unit are named subsets of it (§2.1).

/** §2.1's `Unit`, word for word. */
export type Unit =
  | 'm'
  | 'm2'
  | 'ha'
  | 'cm'
  | 'cdeg'
  | 'deg'
  | 'share'
  | 'weight'
  | 'people'
  | 'count'
  | 'yr'
  | 'wk'
  | 'm3'
  | 'lvl'
  | 'perHa'
  | 'perKm'
  | 'perKm2'
  | 'per100m'
  | 'ratio'
  | 'bits'
  | 'ms'
  | 's'
  | 'luma'
  | 'rb'
  | 'chroma'
  | 'z'
  | 'none';

/** The list in §2.1's order; the cell check refuses every other word. */
export const UNITS: readonly Unit[] = Object.freeze([
  'm',
  'm2',
  'ha',
  'cm',
  'cdeg',
  'deg',
  'share',
  'weight',
  'people',
  'count',
  'yr',
  'wk',
  'm3',
  'lvl',
  'perHa',
  'perKm',
  'perKm2',
  'per100m',
  'ratio',
  'bits',
  'ms',
  's',
  'luma',
  'rb',
  'chroma',
  'z',
  'none',
] as const);

const UNIT_SET: ReadonlySet<string> = new Set<string>(UNITS);

/** Is `u` a word of §2.1's unit list? */
export function isUnit(u: unknown): u is Unit {
  return typeof u === 'string' && UNIT_SET.has(u);
}
